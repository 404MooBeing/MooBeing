import React, { useEffect, useState, useCallback, useRef } from "react";
import styled from "styled-components";
import LocationSearch from "../components/CapsuleChooseLocation/LocationSearch";
import radish from "../assets/radishes/basicRad.svg";

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const OverlayContainer = styled.div`
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
`;

const LocationInfo = styled.div`
  text-align: left;
`;

const PlaceName = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const CategoryName = styled.span`
  font-size: 14px;
  color: #666;
  margin-left: 10px;
`;

const AddressName = styled.p`
  margin: 5px 0 0;
  font-size: 14px;
  color: #333;
`;

const DecisionButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

function Map() {
  const [kakao, setKakao] = useState(null);
  const [map, setMap] = useState(null);
  const [places, setPlaces] = useState([]);
  const [marker, setMarker] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      alert("내 위치 설정이 현 브라우저에서 작동하지 않습니다.");
    }
  }, []);

  const searchPlaces = useCallback(
    (keyword) => {
      if (!kakao || !map || !userLocation) {
        console.error("Kakao Maps SDK is not fully loaded");
        return;
      }

      const ps = new kakao.maps.services.Places();
      const searchOption = {
        location: new kakao.maps.LatLng(userLocation.lat, userLocation.lng),
        radius: 10000,
        sort: kakao.maps.services.SortBy.DISTANCE,
      };

      ps.keywordSearch(
        keyword,
        (data, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const filteredData = data.filter(
              (place) =>
                place.place_name
                  .toLowerCase()
                  .includes(keyword.toLowerCase()) ||
                place.address_name.toLowerCase().includes(keyword.toLowerCase())
            );

            setPlaces(filteredData);
            setSelectedPlace(null);

            const bounds = new kakao.maps.LatLngBounds();
            filteredData.forEach((place) => {
              bounds.extend(new kakao.maps.LatLng(place.y, place.x));
            });
            map.setBounds(bounds);
          } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            alert("검색 결과가 존재하지 않습니다.");
          } else if (status === kakao.maps.services.Status.ERROR) {
            alert("검색 결과 중 오류가 발생했습니다.");
          }
        },
        searchOption
      );
    },
    [kakao, map, userLocation]
  );

  const moveToLocation = useCallback(
    (lat, lng, place) => {
      if (kakao && map) {
        const moveLatLon = new kakao.maps.LatLng(lat, lng);
        map.setCenter(moveLatLon);
        map.setLevel(2);

        // 기존 마커 제거
        if (marker) {
          marker.setMap(null);
        }

        // 새 마커 생성
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

        setPlaces([]);
        setSelectedPlace(place);
      }
    },
    [kakao, map, marker]
  );

  const handleDecision = () => {
    if (selectedPlace) {
      console.log("Decision made for:", selectedPlace);
      // 여기에 결정 시 실행할 로직 추가
    }
  };

  return (
    <MapContainer>
      <LocationSearch
        onSearch={searchPlaces}
        places={places}
        onSelectPlace={(lat, lng, place) => moveToLocation(lat, lng, place)}
      />
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
      {!map && <div>지도를 불러오는 중...</div>}
      {selectedPlace && (
        <OverlayContainer>
          <LocationInfo>
            <PlaceName>
              {selectedPlace.place_name}
              <CategoryName>
                {selectedPlace.category_name.split(" > ")[1] ||
                  selectedPlace.category_name.split(" > ")[0]}
              </CategoryName>
            </PlaceName>
            <AddressName>{selectedPlace.address_name}</AddressName>
          </LocationInfo>
          <DecisionButton onClick={handleDecision}>결정</DecisionButton>
        </OverlayContainer>
      )}
    </MapContainer>
  );
}

export default Map;
