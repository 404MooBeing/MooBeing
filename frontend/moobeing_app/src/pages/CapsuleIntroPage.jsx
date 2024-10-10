import React, { useEffect } from "react";
import styled from "styled-components";
import smileRad from "../assets/radishes/smileRad.svg";
import { useNavigate } from "react-router-dom";
import { getCharacter } from "../apis/CapsuleApi";
import useRadishStore from "../store/RadishStore";

const Container = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
`;

const Title = styled.h1`
  text-align: left;
  font-size: 30px;
  margin-bottom: 30px;
`;

const ContentContainer = styled.div`
  align-self: stretch;
`;

const ContentList = styled.ol`
  list-style-type: none;
  padding: 0;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 15px;
    top: 15px;
    bottom: 15px;
    width: 2px;
    background: black;
  }
`;

const ContentItem = styled.li`
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  position: relative;

  &::before {
    content: "${(props) => props.number}";
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid black;
    margin-right: 10px;
    font-weight: bold;
    background-color: white;
    z-index: 1;
  }

  &::after {
    content: "";
    position: absolute;
    left: 15px;
    top: 50%;
    bottom: -50%;
    width: 2px;
    background: black;
    z-index: 0;
  }

  &:last-child::after {
    display: none;
  }
`;

const ContentText = styled.p`
  margin: 0;
`;

const Radish = styled.img`
  width: 45%;
  height: auto;
  align-self: center;
  margin-top: 0;
`;

const StartButton = styled.button`
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

function CapsuleIntro() {
  const navigate = useNavigate();
  const { characters, setCharacters, setIsLoading, setError } =
    useRadishStore();

  useEffect(() => {
    const fetchCharacters = async () => {
      setIsLoading(true);
      try {
        const charactersData = await getCharacter();
        setCharacters(charactersData);
        // console.log(charactersData);
        // console.log(characters);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, [setCharacters, setIsLoading, setError]);

  const handleStart = () => {
    navigate("/capsule-create");
  };
  return (
    <Container>
      <Title>
        특별한 소비를 <br />
        기록하는 타임무
      </Title>
      <ContentContainer>
        <ContentList>
          <ContentItem number="1">
            <ContentText>무캡슐을 작성해주세요</ContentText>
          </ContentItem>
          <ContentItem number="2">
            <ContentText>해당 거래내역의 장소를 선택해요</ContentText>
          </ContentItem>
          <ContentItem number="3">
            <ContentText>무가 다 자란 후 해당 장소로 가서 수확해요</ContentText>
          </ContentItem>
        </ContentList>
      </ContentContainer>
      <Radish src={smileRad} alt="Smiling Radish" />
      <StartButton onClick={handleStart}>시작</StartButton>
    </Container>
  );
}

export default CapsuleIntro;
