import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import previousIcon from "../assets/button/PreviousIcon.svg";
import nextIcon from "../assets/button/NextIcon.svg";
import musinsaRad from "../assets/radishes/musinsaRad.svg";
import { getUserRadishCollection } from "../apis/RadishApi";
import useCapsuleStore from "../store/CapsuleStore";
import useRadishStore from "../store/RadishStore";

import aniRad from "../assets/radishes/aniRad.png"
import babyRad from "../assets/radishes/babyRad.png"
import basicRad from "../assets/radishes/basicRad.png"
import blushRad from "../assets/radishes/blushRad.png"
import flippedRad from "../assets/radishes/flippedRad.png"
import hairlotRad from "../assets/radishes/hairlotRad.png"
import musinsaRad from "../assets/radishes/musinsaRad.png"
import rainbowRad from "../assets/radishes/rainbowRad.png"
import vacationRad from "../assets/radishes/vacationRad.png"
import weightRad from "../assets/radishes/weightRad.png"

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
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  align-self: flex-start;
  margin-bottom: -5px;
  font-size: 28px;
`;

const LeftDay = styled.p`
  align-self: flex-start;
  color: #616161;
  margin-bottom: 50px;
  font-size: 28px;
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
  margin-top: 40px;
  width: 230px;
`;

const DateInfo = styled.p`
  color: #348833;
  margin-top: 25px;
  align-self: center;
`;

const NextButton = styled.button`
  width: 80%;
  max-width: 500px;
  background-color: #e0eed2;
  color: black;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
`;

const CharacterCard = styled.div`
  width: 200px;
  height: 220px;
  border-radius: 20px;
  background: #f5fded;
  box-shadow: 0.3px 0.3px 6px 0px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const CharacterImg = styled.img`
  max-width: 80%;
  max-height: 80%;
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
  height: 40px;
  cursor: pointer;
  outline: ${(props) => (props.selected ? "2px solid #348833" : "none")};
  font-weight: bold;
`;

function ChooseCharacter() {
  const [currentCharacter, setCurrentCharacter] = useState(0);
  const [currentSize, setCurrentSize] = useState(null);
  const navigate = useNavigate();
  const { characters } = useRadishStore();
  const { updateRadishInfo } = useCapsuleStore();

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
    console.log(useCapsuleStore.getState());

    navigate("/choose-location");
  };

  const nextCharacter = () => {
    setCurrentCharacter((prev) => (prev + 1) % characters.length);
  };

  const prevCharacter = () => {
    setCurrentCharacter(
      (prev) => (prev - 1 + characters.length) % characters.length
    );
  };

  const getHarvestDate = (days) => {
    const today = new Date();
    const harvestDate = new Date(today.setDate(today.getDate() + days));
    return harvestDate.toISOString().split("T")[0].replace(/-/g, "/");
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
          <CharacterImg
            src={Radishs[characters[currentCharacter].radishImageUrl]}
            alt={characters[currentCharacter].radishName}
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
      <NextButton onClick={handleNext}>다음</NextButton>
    </Container>
  );
}

export default ChooseCharacter;
