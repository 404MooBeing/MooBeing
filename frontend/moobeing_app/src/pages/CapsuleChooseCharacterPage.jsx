import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import previousIcon from "../assets/button/PreviousIcon.svg";
import nextIcon from "../assets/button/NextIcon.svg";
import { getUserRadishCollection } from "../apis/RadishApi";
import useCapsuleStore from "../store/CapsuleStore";
import useRadishStore from "../store/RadishStore";
import aniRad from "../assets/radishes/aniRad.png";
import babyRad from "../assets/radishes/babyRad.png";
import basicRad from "../assets/radishes/basicRad.svg";
import blushRad from "../assets/radishes/blushRad.png";
import flippedRad from "../assets/radishes/flippedRad.png";
import hairlotRad from "../assets/radishes/hairlotRad.png";
import musinsaRad from "../assets/radishes/musinsaRad.png";
import rainbowRad from "../assets/radishes/rainbowRad.png";
import vacationRad from "../assets/radishes/vacationRad.png";
import weightRad from "../assets/radishes/weightRad.png";
import { SyncLoader } from "react-spinners";

const Radishs = {
  aniRad: aniRad,
  babyRad: babyRad,
  basicRad: basicRad,
  blushRad: blushRad,
  flippedRad: flippedRad,
  hairlotRad: hairlotRad,
  musinsaRad: musinsaRad,
  rainbowRad: rainbowRad,
  vacationRad: vacationRad,
  weightRad: weightRad,
};

const Container = styled.div`
  width: 80%;
  max-width: 500px;
  margin: 0 auto;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.div`
  align-self: flex-start;
  margin-bottom: 10px;
  font-size: 22px;
  font-weight: 600;
`;

const LeftDay = styled.div`
  align-self: flex-start;
  color: #616161;
  margin-bottom: 40px;
  font-size: 16px;
`;

const CharacterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
`;

const CharacterSizes = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 38px;
  width: 220px;
`;

const DateInfo = styled.p`
  color: #348833;
  margin-top: 25px;
  align-self: center;
  font-size: 15px;
`;

const NextButton = styled.button`
  width: 80%;
  max-width: 500px;
  background-color: ${(props) => (props.disabled ? "#cccccc" : "#e0eed2")};
  color: black;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  position: absolute;
  bottom: 12%;
  left: 50%;
  transform: translateX(-50%);
`;

const CharacterCard = styled.div`
  width: 50%;
  height: 210px;
  border-radius: 20px;
  background: #f5fded;
  box-shadow: 0.3px 0.3px 6px 0px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: 400px) {
    height: 180px;
  }

`;

const CharacterImg = styled.img`
  max-width: 75%;
  max-height: 75%;
  margin-bottom: 13%;
`;

const CharacterName = styled.div`
  position: absolute;
  bottom: 0;
  width: 90%;
  padding: 10px;
  border-radius: 0px 0px 20px 20px;
  border-top: 1px solid #c9c9c9;
  background: #fff;
  text-align: center;
`;

const NavigationButton = styled.div`
  width: 30px;
  height: 31px;
  border-radius: 10px;
  border: 1px solid #afafaf;
  background: #fff;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
`;

const LeftButton = styled(NavigationButton)`
  left: 10px;
`;

const RightButton = styled(NavigationButton)`
  right: 10px;
`;

const CharacterSize = styled.button`
  padding: 5px 10px;
  border-radius: 10px;
  border: 1px solid #afafaf;
  background: #fff;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
  flex: 1;
  max-width: 100px;
  color: black;
  height: 33px;
  cursor: pointer;
  outline: ${(props) => (props.selected ? "2px solid #348833" : "none")};
  font-weight: bold;
  font-family: 'mainFont';
`;

function ChooseCharacter() {
  const [currentCharacter, setCurrentCharacter] = useState(0);
  const [currentSize, setCurrentSize] = useState(null);
  const navigate = useNavigate();
  const { characters } = useRadishStore();
  const { updateRadishInfo } = useCapsuleStore();
  const [isLoading, setIsLoading] = useState(true); // 이미지 로딩 상태 추가

  const sizes = [
    { name: "작은무", day: 20, value: "SMALL_RADISH" },
    { name: "중간무", day: 40, value: "MEDIUM_RADISH" },
    { name: "큰무", day: 60, value: "LARGE_RADISH" },
  ];

  const handleNext = () => {
    const harvestDate = getHarvestDate(sizes[currentSize].day);
    updateRadishInfo(
      sizes[currentSize].value,
      characters[currentCharacter].radishId,
      harvestDate,
      characters[currentCharacter].radishImageUrl
    );

    navigate("/choose-location");
  };

  const nextCharacter = () => {
    setCurrentCharacter((prev) => (prev + 1) % characters.length);
    setIsLoading(true); // 캐릭터 변경 시 로딩 상태로 전환
  };

  const prevCharacter = () => {
    setCurrentCharacter(
      (prev) => (prev - 1 + characters.length) % characters.length
    );
    setIsLoading(true); // 캐릭터 변경 시 로딩 상태로 전환
  };

  const getHarvestDate = (days) => {
    const today = new Date();
    const harvestDate = new Date(today.setDate(today.getDate() + days));
    return harvestDate.toISOString().split("T")[0].replace(/-/g, "/");
  };

  // 이미지 로드 완료 시 로딩 상태 해제
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <Container>
      <Title>심을 무캡슐을 선택해주세요</Title>
      <LeftDay>
        수확까지 +{currentSize !== null ? sizes[currentSize].day : 0}일
      </LeftDay>
      <CharacterContainer>
        <LeftButton onClick={prevCharacter}>
          <img src={previousIcon} alt="Previous" />
        </LeftButton>
        <CharacterCard>
          {isLoading && <SyncLoader color={"#348833"} size={10} />}
          <CharacterImg
            src={characters[currentCharacter].radishImageUrl}
            alt={characters[currentCharacter].radishName}
            onLoad={handleImageLoad} // 이미지 로드 완료 시 호출
            style={{ display: isLoading ? "none" : "block" }} // 로딩 중일 때 이미지를 숨김
          />
          <CharacterName>
            {characters[currentCharacter].radishName}
          </CharacterName>
        </CharacterCard>
        <RightButton onClick={nextCharacter}>
          <img src={nextIcon} alt="Next" />
        </RightButton>
      </CharacterContainer>
      <CharacterSizes>
        {sizes.map((size, index) => (
          <CharacterSize
            key={index}
            onClick={() => setCurrentSize(index)}
            selected={currentSize === index}
          >
            {size.name}
          </CharacterSize>
        ))}
      </CharacterSizes>
      {currentSize !== null && (
        <DateInfo>
          {getHarvestDate(sizes[currentSize].day)}에 수확가능해요!
        </DateInfo>
      )}
      <NextButton onClick={handleNext} disabled={currentSize === null}>
        다음
      </NextButton>
    </Container>
  );
}

export default ChooseCharacter;
