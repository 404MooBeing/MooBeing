import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MapComponent from "../components/CapsuleMap/Map";
import LocationSearch from "../components/CapsuleChooseLocation/LocationSearch";
import useCapsuleStore from "../store/CapsuleStore";
import { postPlantCapsule } from "../apis/CapsuleApi";
import useRadishStore from "../store/RadishStore";
import FindingLocation from "../components/CapsuleChooseLocation/FindingLocation";
import CurrentLocationIcon from "../assets/capsules/CurrentLocationIcon.png";

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

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px; /* 선택사항: 모서리를 둥글게 만듦 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 아래쪽에만 그림자 효과 */
`;

const Popup = styled.div`
  position: fixed;
  bottom: 50%;
  left: 50%;
  width: 250px;
  text-align: center;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  z-index: 2000;
  font-size: 14px;
`;

function CapsuleChooseLocationPage() {
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState(null); // 지도 중심 상태 추가
  const [customMarkers, setCustomMarkers] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showNearbyPopup, setShowNearbyPopup] = useState(false); // 추가

  const navigate = useNavigate();
  const {
    updateLocationInfo,
    dealId,
    description,
    type,
    imgFile,
    radishId,
    radishImageUrl,
  } = useCapsuleStore();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userCoords);
          setMapCenter(userCoords); // 초기 지도 중심을 사용자 위치로 설정
          setCustomMarkers([
            {
              lat: userCoords.lat,
              lng: userCoords.lng,
              imageUrl: CurrentLocationIcon, // 마커 타입을 구분
            },
          ]);

          updateLocationInfo(
            userCoords.lat,
            userCoords.lng,
            "현재위치",
            "사용자 위치"
          );
          setLoading(false); // 로딩 완료
        },
        (error) => {
          console.error("사용자 위치를 가져오는 데 실패했습니다:", error);
          alert("사용자의 위치 정보에 접근할 수 없습니다.");
          setLoading(false); // 로딩 실패 시에도 로딩창 닫기
        }
      );
    } else {
      alert("사용자의 브라우저가 위치 서비스를 지원하지 않습니다.");
      setLoading(false);
    }
  }, [updateLocationInfo]);

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
            setPopupMessage("검색 결과가 존재하지 않습니다.");
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
          } else if (status === window.kakao.maps.services.Status.ERROR) {
            setPopupMessage("검색 중 오류가 발생했습니다.");
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
          }
        },
        searchOption
      );
    },
    [userLocation]
  );

  const handleSelectPlace = (place) => {
    setSelectedPlace(place);
    setMapCenter({ lat: place.y, lng: place.x });
    setPlaces([]);

    setCustomMarkers([
      {
        lat: place.y,
        lng: place.x,
        imageUrl: radishImageUrl,
      },
    ]);

    updateLocationInfo(place.y, place.x, place.address_name, place.place_name);
  };

  const handleDecision = async () => {
    if (selectedPlace) {
      updateLocationInfo(
        selectedPlace.y,
        selectedPlace.x,
        selectedPlace.address_name,
        selectedPlace.place_name
      );

      try {
        const formData = new FormData();
        formData.append("dealId", dealId);
        formData.append("imgFile", imgFile);
        formData.append("description", description);
        formData.append("type", type);
        formData.append("lat", selectedPlace.y);
        formData.append("lng", selectedPlace.x);
        formData.append("addressName", selectedPlace.address_name);
        formData.append("placeName", selectedPlace.place_name);
        formData.append("radishId", radishId);

        const response = await postPlantCapsule(formData);

        navigate("/capsule-planting", { state: { response } });
      } catch (error) {
        console.error("캡슐 심기 실패:", error);
        if (error.response) {
          console.log(error.response);
          if (error.response.data.code === "RD002") {
            setShowNearbyPopup(true);
            setTimeout(() => setShowNearbyPopup(false), 3000);
          } else {
            console.error("서버 응답 데이터:", error.response.data);
            alert("캡슐 심기에 실패했습니다. 다시 시도해주세요.");
          }
        }
      }
    }
  };

  return (
    <>
      {loading ? (
        <FindingLocation />
      ) : (
        <>
          <SearchContainer>
            <LocationSearch
              onSearch={searchPlaces}
              places={places}
              onSelectPlace={handleSelectPlace}
            />
          </SearchContainer>

          <MapComponent
            markers={customMarkers}
            userLocation={userLocation}
            center={mapCenter}
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
      )}
      {showPopup && <Popup>{popupMessage}</Popup>}
      {showNearbyPopup && <Popup>이미 가까운곳에 무가 심겨져있어요</Popup>}
    </>
  );
}

export default CapsuleChooseLocationPage;
