/* global kakao */
import React, { useState, useCallback, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { postCapsulesOnMap } from "../apis/CapsuleApi";
import NotGrownYetPopup from "../components/CapsuleMap/popups/NotGrownYet";
import NotOpenedYetPopup from "../components/CapsuleMap/popups/NotOpenedYet";
import OpenedPopup from "../components/CapsuleMap/popups/Opened";
import NotGrownImg from "../assets/capsules/NotGrownYet.png";

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

function MyMap() {
  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [popupData, setPopupData] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  useEffect(() => {
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
  }, []);

  const initializeMap = () => {
    if (!mapRef.current) return;

    const mapOptions = {
      center: new kakao.maps.LatLng(37.5665, 126.978), // 초기 중심 좌표 (서울)
      level: 3,
    };

    const map = new kakao.maps.Map(mapRef.current, mapOptions);

    kakao.maps.event.addListener(map, "bounds_changed", () => {
      const bounds = map.getBounds();
      handleBoundsChanged(bounds, map);
    });

    handleBoundsChanged(map.getBounds(), map); // 초기 마커 설정
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

          const markerPosition = new kakao.maps.LatLng(radish.lat, radish.lng);

          const marker = new kakao.maps.Marker({
            position: markerPosition,
            image: new kakao.maps.MarkerImage(
              radish.remainingDays <= 0 ? radish.radishImageUrl : NotGrownImg,
              new kakao.maps.Size(64, 69), // 이미지 크기
              { offset: new kakao.maps.Point(32, 69) } // 중심점
            ),
            clickable: true,
          });

          marker.setMap(map);

          // 마커 클릭 시 이벤트 설정
          kakao.maps.event.addListener(marker, "click", () => {
            openPopup(radish, isWithinRange);
          });
        });
      } catch (error) {
        console.error("Failed to fetch radishes:", error);
      }
    },
    [userLocation]
  );

  function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371e3; // 지구 반지름 (미터 단위)
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // 두 좌표 간의 거리 (미터 단위)
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
