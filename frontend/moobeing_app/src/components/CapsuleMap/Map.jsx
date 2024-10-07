import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  touch-action: none; // 지도 내에서 브라우저 기본 터치 동작 방지
`;

function MapComponent({
  onMapLoad,
  onBoundsChanged,
  center,
  markers = [],
  userLocation,
  userLocationMarker,
}) {
  const [kakao, setKakao] = useState(null);
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const userMarkerRef = useRef(null);

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

      // 지도 로드 완료 콜백
      if (onMapLoad) {
        onMapLoad(newMap, kakao);
      }

      // 영역 변경 이벤트 (드래그, 줌 완료 시)
      if (onBoundsChanged) {
        kakao.maps.event.addListener(newMap, "idle", () => {
          const bounds = newMap.getBounds();
          const topRight = bounds.getNorthEast();
          const bottomLeft = bounds.getSouthWest();

          onBoundsChanged({
            latTopRight: topRight.getLat(),
            lngTopRight: topRight.getLng(),
            latBottomLeft: bottomLeft.getLat(),
            lngBottomLeft: bottomLeft.getLng(),
          });
        });
      }

      setMap(newMap);
    } else if (map && center) {
      // 지도 중심을 선택한 장소로 이동
      map.setCenter(new kakao.maps.LatLng(center.lat, center.lng));
    }
  }, [kakao, map, center, onMapLoad, onBoundsChanged]);

  // 마커 업데이트
  useEffect(() => {
    if (!map || !kakao) return;

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    markers.forEach((markerData) => {
      const position = new kakao.maps.LatLng(markerData.lat, markerData.lng);

      if (markerData.customContent) {
        // 커스텀 오버레이 생성
        const customOverlay = new kakao.maps.CustomOverlay({
          position: position,
          content: markerData.customContent,
          map: map,
        });

        if (markerData.onClick) {
          kakao.maps.event.addListener(customOverlay, "click", () => {
            markerData.onClick(markerData);
          });
        }

        markersRef.current.push(customOverlay);
      } else {
        // 기본 마커 생성
        const marker = new kakao.maps.Marker({
          position: position,
          map: map,
        });

        markersRef.current.push(marker);
      }
    });
  }, [map, kakao, markers]);

  // 사용자 위치 마커 업데이트
  useEffect(() => {
    if (!map || !kakao || !userLocation) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.setMap(null);
    }

    const position = new kakao.maps.LatLng(userLocation.lat, userLocation.lng);

    if (userLocationMarker) {
      userMarkerRef.current = new kakao.maps.CustomOverlay({
        position: position,
        content: userLocationMarker,
        map: map,
      });
    } else {
      userMarkerRef.current = new kakao.maps.Marker({
        position: position,
        map: map,
      });
    }
  }, [map, kakao, userLocation, userLocationMarker]);

  // center가 없을 때는 맵을 렌더링하지 않음
  if (!center || !center.lat || !center.lng) {
    return <div>현재 위치를 찾고 있습니다!</div>;
  }

  return <MapContainer ref={mapRef} />;
}

export default MapComponent;
