import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

function MapComponent({ onMapLoad, center, markers = [] }) {
  const [kakao, setKakao] = useState(null);
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  // 카카오맵 스크립트 로드
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_APP_KEY}&libraries=services&autoload=false`;
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
    if (kakao && mapRef.current && !map && center) {
      const options = {
        center: new kakao.maps.LatLng(center.lat, center.lng),
        level: 3,
      };
      const newMap = new kakao.maps.Map(mapRef.current, options);
      setMap(newMap);

      if (onMapLoad) {
        onMapLoad(newMap, kakao);
      }
    }
  }, [kakao, map, center, onMapLoad]);

  // 마커 업데이트
  useEffect(() => {
    if (!map || !kakao) return;

    // 기존 마커 삭제
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    markers.forEach((markerData) => {
      const position = new kakao.maps.LatLng(markerData.lat, markerData.lng);

      const markerImage = new kakao.maps.MarkerImage(
        markerData.imageUrl,
        new kakao.maps.Size(64, 69), // 이미지 크기 조정
        { offset: new kakao.maps.Point(27, 69) } // 이미지의 중심점 설정
      );

      const newMarker = new kakao.maps.Marker({
        position: position,
        image: markerImage,
      });

      newMarker.setMap(map);
      markersRef.current.push(newMarker);
    });
  }, [map, kakao, markers]);

  // 지도 중심 이동 로직
  useEffect(() => {
    if (map && center) {
      map.setCenter(new kakao.maps.LatLng(center.lat, center.lng));
    }
  }, [map, center]);

  return <MapContainer ref={mapRef} />;
}

export default MapComponent;
