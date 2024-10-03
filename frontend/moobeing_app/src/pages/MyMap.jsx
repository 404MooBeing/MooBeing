import React, { useState, useCallback, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Map from "../components/CapsuleMap/Map";
import { postCapsulesOnMap } from "../apis/CapsuleApi";
import NotGrownImg from "../assets/capsules/NotGrownImg.svg";

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;

// 커스텀 마커 스타일
const CustomMarker = styled.div`
  position: relative;
  width: 64px;
  height: 69px;
`;

const BaseImage = styled.img`
  width: 100%;
  height: 100%;
`;

const OverlayImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: ${(props) => (props.isGrayscale ? "grayscale(100%)" : "none")};
  animation: ${(props) => (props.bounce ? bounce : "none")} 1s infinite;

  ${(props) =>
    props.hasYellowGlow &&
    `
    &::after {
      content: '';
      position: absolute;
      top: -5px;
      left: -5px;
      right: -5px;
      bottom: -5px;
      background: rgba(255, 255, 0, 0.3);
      filter: blur(10px);
      z-index: -1;
    }
  `}
`;

const UserLocationMarker = styled.div`
  width: 16px;
  height: 16px;
  background-color: red;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
`;

function MyMap() {
  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  // 사용자 위치 가져오기
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

  // 두 지점 간의 거리 계산 함수
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // 지구 반경 (미터)
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const handleBoundsChanged = useCallback(
    async (bounds) => {
      try {
        const radishes = await postCapsulesOnMap(bounds);
        setMarkers(
          radishes.map((radish) => {
            const isNearUser =
              userLocation &&
              calculateDistance(
                userLocation.lat,
                userLocation.lng,
                radish.lat,
                radish.lng
              ) <= 100;

            return {
              lat: radish.lat,
              lng: radish.lng,
              onClick: (markerData) => {
                console.log("Radish selected:", markerData);
              },
              customContent: (
                <CustomMarker>
                  <BaseImage src={NotGrownImg} alt="Not grown capsule" />
                  {radish.remainingDays === 0 && (
                    <OverlayImage
                      src={radish.radishImage}
                      alt="Grown radish"
                      isGrayscale={!isNearUser}
                      bounce={isNearUser}
                      hasYellowGlow={isNearUser}
                    />
                  )}
                </CustomMarker>
              ),
            };
          })
        );
      } catch (error) {
        console.error("Failed to fetch radishes:", error);
      }
    },
    [userLocation]
  );

  return (
    <MapWrapper>
      <Map
        onBoundsChanged={handleBoundsChanged}
        markers={markers}
        userLocation={userLocation}
        userLocationMarker={<UserLocationMarker />}
      />
    </MapWrapper>
  );
}

export default MyMap;
