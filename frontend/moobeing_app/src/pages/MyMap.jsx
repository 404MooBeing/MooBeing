/* global kakao */
import React, { useState, useCallback, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { postCapsulesOnMap } from "../apis/CapsuleApi";
import NotGrownYetPopup from "../components/CapsuleMap/popups/NotGrownYet";
import NotOpenedYetPopup from "../components/CapsuleMap/popups/NotOpenedYet";
import OpenedPopup from "../components/CapsuleMap/popups/Opened";
import NotGrownImg from "../assets/capsules/NotGrownYet.png";

// 애니메이션 정의
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;

const LoadingWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  z-index: 1000;
`;

function MyMap() {
  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [popupData, setPopupData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const userMarkerRef = useRef(null);
  const markersRef = useRef([]);

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

    const mapOptions = {
      center: new kakao.maps.LatLng(userLocation.lat, userLocation.lng),
      level: 3,
    };

    mapInstance.current = new kakao.maps.Map(mapRef.current, mapOptions);

    const circle = new kakao.maps.Circle({
      center: new kakao.maps.LatLng(userLocation.lat, userLocation.lng),
      radius: 10,
      strokeWeight: 2,
      strokeColor: "#ff0000",
      strokeOpacity: 0.8,
      fillColor: "#ff0000",
      fillOpacity: 0.4,
    });

    circle.setMap(mapInstance.current);
    userMarkerRef.current = circle;

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

    setPopupData({ type: popupType, data: radish });
  };

  const closePopup = () => {
    setPopupData(null);
  };

  return (
    <MapWrapper ref={mapRef}>
      {isLoading && <LoadingWrapper>사용자 위치를 찾는 중...</LoadingWrapper>}
      {popupData && (
        <PopupComponent
          popupType={popupData.type}
          data={popupData.data}
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
