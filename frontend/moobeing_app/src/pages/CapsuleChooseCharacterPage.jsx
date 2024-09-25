import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
`;

const Title = styled.h1`
  align-self: flex-start;
  margin-bottom: 10px;
`;

const LeftDay = styled.h2`
  align-self: flex-start;
  color: #616161;
  margin-bottom: 20px;
`;

const CharacterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
`;

const CharacterCard = styled.div`
  width: 200px;
  height: 300px;
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
`;

const CharacterName = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px;
  border-radius: 0px 0px 20px 20px;
  border-top: 1px solid #000;
  background: #fff;
  text-align: center;
`;

const NavigationButton = styled.div`
  width: 25px;
  height: 26px;
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

const CharacterSizes = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const CharacterSize = styled.div`
  padding: 5px 10px;
  border: 1px solid #000;
  border-radius: 5px;
`;

const NextButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-self: center;
`;

const characters = [
  { name: "작은무", size: 3, image: "/path/to/small-radish.png" },
  { name: "중간무", size: 5, image: "/path/to/medium-radish.png" },
  { name: "큰무", size: 7, image: "/path/to/large-radish.png" },
];

function ChooseCharacter() {
  const [currentCharacter, setCurrentCharacter] = useState(0);
  const navigate = useNavigate();

  const nextCharacter = () => {
    setCurrentCharacter((prev) => (prev + 1) % characters.length);
  };

  const prevCharacter = () => {
    setCurrentCharacter(
      (prev) => (prev - 1 + characters.length) % characters.length
    );
  };

  return (
    <Container>
      <Title>심을 무캡슐을 선택해주세요</Title>
      <LeftDay>수확까지 +{characters[currentCharacter].size}일</LeftDay>
      <CharacterContainer>
        <LeftButton onClick={prevCharacter}>
          <img src="/path/to/left-icon.png" alt="Previous" />
        </LeftButton>
        <CharacterCard>
          <CharacterImg
            src={characters[currentCharacter].image}
            alt={characters[currentCharacter].name}
          />
          <CharacterName>{characters[currentCharacter].name}</CharacterName>
        </CharacterCard>
        <RightButton onClick={nextCharacter}>
          <img src="/path/to/right-icon.png" alt="Next" />
        </RightButton>
      </CharacterContainer>
      <CharacterSizes>
        {characters.map((char, index) => (
          <CharacterSize key={index}>{char.name}</CharacterSize>
        ))}
      </CharacterSizes>
      <NextButton onClick={() => navigate("/next-page")}>다음</NextButton>
    </Container>
  );
}

export default ChooseCharacter;
