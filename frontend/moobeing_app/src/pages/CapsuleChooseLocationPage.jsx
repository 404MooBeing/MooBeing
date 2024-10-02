import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Map from "../components/CapsuleMap/Map";
import LocationSearch from "../components/CapsuleChooseLocation/LocationSearch";
import useCapsuleStore from "../store/Capsule";
import { postPlantCapsule } from "../apis/CapsuleApi";
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

function CapsuleChooseLocationPage() {
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [kakaoLoaded, setKakaoLoaded] = useState(false); // API 로드 상태
  const navigate = useNavigate();
  const { updateLocationInfo } = useCapsuleStore();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("사용자 위치를 가져오는 데 실패했습니다:", error);
          alert("사용자의 위치 정보에 접근할 수 없습니다.");
        }
      );
    } else {
      alert("사용자의 브라우저가 위치 서비스를 지원하지 않습니다.");
    }
  }, []);

  const searchPlaces = useCallback(
    (keyword) => {
      if (!window.kakao || !window.kakao.maps) {
        alert("Kakao Maps API가 완전히 로드되지 않았습니다.");
        return;
      }

      if (!userLocation) {
        alert("사용자의 위치 정보가 없습니다.");
        return;
      }

      const ps = new window.kakao.maps.services.Places();
      const searchOption = {
        location: new window.kakao.maps.LatLng(
          userLocation.lat,
          userLocation.lng
        ),
        radius: 10000,
        sort: window.kakao.maps.services.SortBy.DISTANCE,
      };

      ps.keywordSearch(
        keyword,
        (data, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            setPlaces(data);
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            alert("검색 결과가 존재하지 않습니다.");
          } else if (status === window.kakao.maps.services.Status.ERROR) {
            alert("검색 중 오류가 발생했습니다.");
          }
        },
        searchOption
      );
    },
    [userLocation]
  );

  const handleSelectPlace = (place) => {
    setSelectedPlace(place);
  };

  const handleDecision = () => {
    if (selectedPlace) {
      updateLocationInfo(
        selectedPlace.y,
        selectedPlace.x,
        selectedPlace.address_name,
        selectedPlace.place_name
      );
      navigate("/capsule-planting");
    }
  };

  return (
    <>
      <LocationSearch
        onSearch={searchPlaces}
        places={places}
        onSelectPlace={handleSelectPlace}
        kakaoLoaded={kakaoLoaded}
      />
      <Map
        places={places}
        userLocation={userLocation}
        onSelectPlace={handleSelectPlace}
        setKakaoLoaded={setKakaoLoaded} // API 로드 상태 전달
      />
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
            <AddressName>
              {selectedPlace.address_name
                ? selectedPlace.address_name
                : "없지롱"}
            </AddressName>
          </LocationInfo>
          <DecisionButton onClick={handleDecision}>결정</DecisionButton>
        </OverlayContainer>
      )}
    </>
  );
}

export default CapsuleChooseLocationPage;
