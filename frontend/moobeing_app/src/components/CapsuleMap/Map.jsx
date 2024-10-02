import React, { useEffect, useState, useCallback, useRef } from "react";
import styled from "styled-components";
import radish from "../../assets/radishes/basicRad.svg";

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

function MapComponent({ places, onSelectPlace, userLocation }) {
  const [kakao, setKakao] = useState(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const mapRef = useRef(null);

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

  useEffect(() => {
    if (kakao && mapRef.current && !map) {
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      const newMap = new kakao.maps.Map(mapRef.current, options);
      setMap(newMap);
    }
  }, [kakao, map]);

  useEffect(() => {
    if (map && places && places.length > 0) {
      const bounds = new kakao.maps.LatLngBounds();
      places.forEach((place) => {
        bounds.extend(new kakao.maps.LatLng(place.y, place.x));
      });
      map.setBounds(bounds);
    }
  }, [map, places]);

  const moveToLocation = useCallback(
    (lat, lng, place) => {
      if (kakao && map) {
        const moveLatLon = new kakao.maps.LatLng(lat, lng);
        map.setCenter(moveLatLon);
        map.setLevel(2);

        if (marker) {
          marker.setMap(null);
        }

        const imageSrc = radish;
        const imageSize = new kakao.maps.Size(64, 69);
        const imageOption = { offset: new kakao.maps.Point(27, 69) };

        const markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );
        const newMarker = new kakao.maps.Marker({
          position: moveLatLon,
          image: markerImage,
        });

        newMarker.setMap(map);
        setMarker(newMarker);

        onSelectPlace(place);
      }
    },
    [kakao, map, marker, onSelectPlace]
  );

  return <MapContainer ref={mapRef} />;
}

export default MapComponent;
