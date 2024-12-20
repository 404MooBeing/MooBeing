/* global kakao */
import React, { useState, useCallback, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useLocation } from "react-router-dom";
import { postCapsulesOnMap } from "../apis/CapsuleApi";
import NotGrownYetPopup from "../components/CapsuleMap/popups/NotGrownYet";
import NotOpenedYetPopup from "../components/CapsuleMap/popups/NotOpenedYet";
import OpenedPopup from "../components/CapsuleMap/popups/Opened";
import NotGrownImg from "../assets/capsules/NotGrownYet.png";
import FindingLocation from "../components/CapsuleChooseLocation/FindingLocation";

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  50% { transform: translateX(10px); }
  75% { transform: translateX(-10px); }
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  animation: ${({ isShaking }) => (isShaking ? shake : "none")} 0.5s;
`;

const LocationWarning = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LocationButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;

  &:hover {
    background-color: #388e3c;
  }
`;

function MyMap() {
  const location = useLocation();
  const justPlantedLocation = location.state?.justPlantedLocation || null;
  const [userLocation, setUserLocation] = useState(null);
  const [popupData, setPopupData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLocationAllowed, setIsLocationAllowed] = useState(true);
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const userMarkerRef = useRef(null);
  const markersRef = useRef([]);

  const [isShaking, setIsShaking] = useState(false);

  const shakeScreen = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500); // 0.5초 후 흔들림 효과 제거
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userCoords);
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoading(false);
        },
        { enableHighAccuracy: true }
      );
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && userLocation) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_APP_KEY}&libraries=services,clusterer&autoload=false`;
      script.async = true;

      script.onload = () => {
        window.kakao.maps.load(() => {
          initializeMap();
        });
      };

      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [isLoading, userLocation]);

  const initializeMap = () => {
    if (!mapRef.current) return;

    // 지도 중심을 justPlantedLocation으로 설정하고, circle은 userLocation을 사용
    const centerCoords = justPlantedLocation
      ? new kakao.maps.LatLng(justPlantedLocation.lat, justPlantedLocation.lng)
      : new kakao.maps.LatLng(userLocation.lat, userLocation.lng);

    const mapOptions = {
      center: centerCoords,
      level: 3,
    };

    mapInstance.current = new kakao.maps.Map(mapRef.current, mapOptions);

    // 현재 위치를 나타내는 circle만 표시
    if (userLocation) {
      const userCoords = new kakao.maps.LatLng(
        userLocation.lat,
        userLocation.lng
      );
      const circle = new kakao.maps.Circle({
        center: userCoords,
        radius: 10,
        strokeWeight: 2,
        strokeColor: "#ff0000",
        strokeOpacity: 0.8,
        fillColor: "#ff0000",
        fillOpacity: 0.4,
      });

      circle.setMap(mapInstance.current);
      userMarkerRef.current = circle;
    }

    kakao.maps.event.addListener(mapInstance.current, "bounds_changed", () => {
      const bounds = mapInstance.current.getBounds();
      handleBoundsChanged(bounds, mapInstance.current);
    });

    handleBoundsChanged(mapInstance.current.getBounds(), mapInstance.current);
  };

  const handleBoundsChanged = useCallback(
    async (bounds, map) => {
      try {
        const radishes = await postCapsulesOnMap({
          latTopRight: bounds.getNorthEast().getLat(),
          lngTopRight: bounds.getNorthEast().getLng(),
          latBottomLeft: bounds.getSouthWest().getLat(),
          lngBottomLeft: bounds.getSouthWest().getLng(),
        });
        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];
        radishes.forEach((radish) => {
          const distance = userLocation
            ? calculateDistance(
                userLocation.lat,
                userLocation.lng,
                radish.lat,
                radish.lng
              )
            : Infinity;

          const isWithinRange = distance <= 100;

          // 커스텀 오버레이의 내용을 정의
          const content = document.createElement("div");
          content.className = "custom-overlay";
          content.style.position = "relative";
          content.style.display = "inline-block";
          content.style.animation =
            isWithinRange && radish.remainingDays <= 0
              ? "bounce 1s infinite"
              : "none"; // 마커 애니메이션 적용
          content.innerHTML = `
            <img 
              src="${
                radish.remainingDays <= 0 ? radish.radishImageUrl : NotGrownImg
              }" 
              style="
                width: 64px; 
                height: 69px; 
                ${
                  !isWithinRange && radish.remainingDays <= 0
                    ? "filter: grayscale(100%);"
                    : ""
                }
              "
            />
            ${
              isWithinRange && radish.remainingDays <= 0
                ? `<div style="
                    position: absolute;
                    top: -5px;
                    left: -5px;
                    right: -5px;
                    bottom: -5px;
                    background: rgba(255, 255, 0, 0.3);
                    filter: blur(10px);
                    z-index: -1;
                  "></div>`
                : ""
            }
          `;

          // 애니메이션 키프레임 정의
          const style = document.createElement("style");
          style.innerHTML = `
            @keyframes bounce {
              0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
              }
              40% {
                transform: translateY(-10px);
              }
              60% {
                transform: translateY(-5px);
              }
            }
          `;
          document.head.appendChild(style);

          // 클릭 이벤트 추가
          content.addEventListener("click", () => {
            openPopup(radish, isWithinRange);
          });

          const position = new kakao.maps.LatLng(radish.lat, radish.lng);

          const customOverlay = new kakao.maps.CustomOverlay({
            position: position,
            content: content,
            map: map,
            xAnchor: 0.5,
            yAnchor: 1,
          });

          markersRef.current.push(customOverlay);
        });
      } catch (error) {
        console.error("Failed to fetch radishes:", error);
      }
    },
    [userLocation]
  );

  function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  const openPopup = (radish, isWithinRange) => {
    let popupType = null;
    if (radish.remainingDays > 0) {
      popupType = "NotGrownYet";
    } else if (!isWithinRange && radish.remainingDays <= 0) {
      popupType = "NotOpenedYet";
    } else if (isWithinRange && radish.remainingDays <= 0) {
      popupType = "Opened";
    }

    // 진동 및 화면 흔들림 효과 추가
    if (popupType === "NotGrownYet" || popupType === "NotOpenedYet") {
      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]); // 200ms 진동, 100ms 대기, 다시 200ms 진동
      }
      shakeScreen();
    }

    setPopupData({
      type: popupType,
      data: {
        id: radish.id,
        addressName: radish.addressName,
        createdAt: radish.createdAt,
        radishImageUrl: radish.radishImageUrl,
        ...radish,
      },
    });
  };

  const closePopup = () => {
    setPopupData(null);
  };

  return (
    <MapWrapper ref={mapRef} isShaking={isShaking}>
      {isLoading && <FindingLocation />}
      {popupData && (
        <PopupComponent
          popupType={popupData.type}
          data={popupData.data}
          id={popupData.data.id}
          addressName={popupData.data.addressName}
          radishImageUrl={popupData.data.radishImageUrl}
          createdAt={popupData.data.createdAt}
          onClose={closePopup}
        />
      )}
    </MapWrapper>
  );
}

const PopupComponent = ({ popupType, data, onClose }) => {
  switch (popupType) {
    case "NotGrownYet":
      return <NotGrownYetPopup data={data} onClose={onClose} />;
    case "NotOpenedYet":
      return <NotOpenedYetPopup data={data} onClose={onClose} />;
    case "Opened":
      return <OpenedPopup data={data} onClose={onClose} />;
    default:
      return null;
  }
};

export default MyMap;
