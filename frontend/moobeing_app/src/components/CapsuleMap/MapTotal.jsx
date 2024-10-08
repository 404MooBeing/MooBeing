import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { createRoot } from "react-dom/client";

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  touch-action: none;
`;

// 애니메이션 정의
const bounceAnimation = `
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

const CustomMarkerContainer = styled.div`
  position: relative;
  display: inline-block;
  ${(props) => props.bounce && bounceAnimation}
`;

const MarkerImage = styled.img`
  width: 64px;
  height: 69px;
  filter: ${(props) => (props.isGrayscale ? "grayscale(100%)" : "none")};
  animation: ${(props) => (props.bounce ? "bounce 1s infinite" : "none")};
`;

const YellowGlow = styled.div`
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  background: rgba(255, 255, 0, 0.3);
  filter: blur(10px);
  z-index: -1;
`;

function Map({ markers, userLocation, onBoundsChanged }) {
  const mapRef = useRef(null);
  const [kakao, setKakao] = useState(null);
  const [map, setMap] = useState(null);
  const markersRef = useRef([]);
  const userMarkerRef = useRef(null);

  // 지도 로드
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_APP_KEY}&libraries=services,clusterer&autoload=false`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        setKakao(window.kakao);
      });
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // 맵 초기화
  useEffect(() => {
    if (kakao && mapRef.current && !map) {
      const options = {
        center: new kakao.maps.LatLng(37.5665, 126.978),
        level: 4,
      };
      const newMap = new kakao.maps.Map(mapRef.current, options);
      setMap(newMap);

      kakao.maps.event.addListener(newMap, "bounds_changed", () => {
        const bounds = newMap.getBounds();
        onBoundsChanged({
          latTopRight: bounds.getNorthEast().getLat(),
          lngTopRight: bounds.getNorthEast().getLng(),
          latBottomLeft: bounds.getSouthWest().getLat(),
          lngBottomLeft: bounds.getSouthWest().getLng(),
        });
      });
    }
  }, [kakao, map, onBoundsChanged]);

  // 마커 업데이트
  useEffect(() => {
    if (!map || !kakao) return;

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    markers.forEach((markerData) => {
      const markerElement = document.createElement("div");
      const root = createRoot(markerElement);
      root.render(
        <CustomMarker
          imageUrl={markerData.imageUrl}
          isGrayscale={markerData.isGrayscale}
          bounce={markerData.bounce}
          hasYellowGlow={markerData.hasYellowGlow}
        />
      );

      const position = new kakao.maps.LatLng(markerData.lat, markerData.lng);

      const customOverlay = new kakao.maps.CustomOverlay({
        position: position,
        content: markerElement,
        map: map,
        xAnchor: 0.5,
        yAnchor: 1,
      });

      if (markerData.onClick) {
        kakao.maps.event.addListener(customOverlay, "click", () => {
          markerData.onClick(markerData);
        });
      }

      markersRef.current.push(customOverlay);
    });
  }, [map, kakao, markers]);

  // 사용자 위치 마커 업데이트
  useEffect(() => {
    if (!map || !kakao || !userLocation) return;

    const position = new kakao.maps.LatLng(userLocation.lat, userLocation.lng);

    if (userMarkerRef.current) {
      userMarkerRef.current.setMap(null);
    }

    const userMarker = new kakao.maps.Marker({
      position: position,
      map: map,
    });

    userMarkerRef.current = userMarker;
  }, [map, kakao, userLocation]);

  return <MapContainer ref={mapRef} />;
}

// CustomMarker 컴포넌트 정의
const CustomMarker = ({ imageUrl, isGrayscale, bounce, hasYellowGlow }) => (
  <CustomMarkerContainer bounce={bounce}>
    {hasYellowGlow && <YellowGlow />}
    <MarkerImage src={imageUrl} isGrayscale={isGrayscale} bounce={bounce} />
  </CustomMarkerContainer>
);

export default Map;
