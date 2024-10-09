import React, { useState, useEffect, useMemo } from "react";
import styled, { keyframes, css } from "styled-components";
// import MonthlyRecord from "../components/Radish/MonthlyRecord";
import aniRad from "../../assets/radishes/aniRad.png"
import babyRad from "../../assets/radishes/babyRad.png"
import basicRad from "../../assets/radishes/basicRad.png"
import blushRad from "../../assets/radishes/blushRad.png"
import flippedRad from "../../assets/radishes/flippedRad.png"
import hairlotRad from "../../assets/radishes/hairlotRad.png"
import musinsaRad from "../../assets/radishes/musinsaRad.png"
import rainbowRad from "../../assets/radishes/rainbowRad.png"
import vacationRad from "../../assets/radishes/vacationRad.png"
import weightRad from "../../assets/radishes/weightRad.png"

import {
  getUserRadishCollection,
  selectRadish,
  growBabyRadish,
} from "../../apis/RadishApi";
import useUserStore from "../../store/UserStore";
import checkBox from "../../assets/checkBox.svg";
import { useNavigate } from "react-router-dom";

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
  width: 100%;
  padding: 0 20px;
  margin-bottom: 200px;
  box-sizing: border-box;
`;

const ChooseButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  background-color: rgba(255, 255, 255, 1);

  width: 100%;
  margin-bottom: 5px;
  margin-right: 30px;
  background-color: transparent !important;
  z-index: 1000;
`;

const ChooseButton = styled.button`
  background-color: ${(props) =>
    props.isactive === "true" ? "#348833" : "#E0EED2"};
  color: ${(props) => (props.isactive === "true" ? "white" : "black")};
  border: none;
  border-radius: 20px;
  padding: 10px 15px;
  cursor: pointer;
  font-family: 'mainFont';
  font-weight: 600;
`;

const ScrollContainer = styled.div`
  height: calc(100vh - 420px); /* 상단 요소들의 높이를 고려하여 조정하세요 */
  overflow-y: auto;
  padding-top: 15px;
  z-index : -1;

  /* 크롬, 사파리, 오페라 */
  &::-webkit-scrollbar {
    display: none;
  }

  /* IE와 Edge */
  -ms-overflow-style: none;

  /* Firefox */
  scrollbar-width: none;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  // justify-content: space-evenly;
  margin-bottom: 30px;
`;

const CharacterCard = styled.div`
  width: 50%;
  max-width: 180px;
  height: 170px;
  margin-bottom: 30px;
  margin-left: 5px;
  background-color: #f5fded;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border-radius: 10%;
  cursor: ${(props) => (props.isselectable === "true" ? "pointer" : "default")};
  box-shadow: 0.3px 0.3px 6px rgba(0, 0, 0, 0.12);
  ${(props) =>  
    props.isselected &&
    `
      filter: drop-shadow(0 0 8px #348833);
    `}

  @media (max-width: 400px) {
    width: calc(50% - 10px);
    margin-left: 0;
  }
`;

const CharacterImage = styled.img`
  width: 80px;
  height: 80px;
`;

const CharacterName = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  border: 1px solid rgba(128, 128, 128, 0.5);
  padding: 4px 8px;
  border-radius: 18px;
  font-weight: 700;
  font-size: 13px;
  color: #5E5054;
  background-color: ${(props) => {
    switch (props.rank) {
      case "B":
        return "#D6F2CE";
      case "A":
        return "#FFFFCC";
      case "S":
        return "#FBB4AE";
      default:
        return "transparent";
    }
  }};
`;

const CharacterCount = styled.span`
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 13px;
  font-weight: 700;
  color: #5E5054;
`;

const CheckBoxOverlay = styled.img`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 20px;
  height: 20px;
`;

const DecisionButtonContainer = styled.div`
  position: fixed;
  bottom: 90px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 1000;
`;

const DecisionButton = styled.button`
  background-color: #348833;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 15px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 15px;
  font-family: 'mainFont';
`;

// 애니메이션 정의
const explosionAnimation = keyframes`
  0% { transform: scale(0); opacity: 1; }
  20% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(2); opacity: 0; }
`;

const smokeAnimation = keyframes`
  0% { transform: scale(0); opacity: 1; }
  50% { transform: scale(1); opacity: 0.5; }
  100% { transform: scale(2); opacity: 0; }
`;

const newCharacterAnimation = keyframes`
  0% { transform: scale(0); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
`;

const AnimationContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ExplosionEffect = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #ffd700;
  border-radius: 50%;
  animation: ${explosionAnimation} 0.5s ease-out;
`;

const SmokeEffect = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(200, 200, 200, 0.8);
  border-radius: 50%;
  animation: ${smokeAnimation} 1s ease-out 0.5s;
`;

const NewCharacterEffect = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${newCharacterAnimation} 0.5s ease-out 1.5s both;
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const ButtonBase = styled.button`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #348833;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  z-index: 10;
  font-family: 'mainFont';
`;

const GrowButton = styled(ButtonBase)`
  animation: ${(props) =>
    props.fadeOut
      ? css`
          ${fadeOut} 0.5s ease-out forwards
        `
      : "none"};
`;

const AcquireButton = styled(ButtonBase)`
  animation: ${fadeIn} 0.5s ease-in;
`;

const MyRadish = () => {
  const [sortBy, setSortBy] = useState(null);
  const [isChooseActive, setIsChooseActive] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [characters, setCharacters] = useState([]);
  const { userInfo, setUserInfo } = useUserStore();
  const [growingCharacter, setGrowingCharacter] = useState(null);
  const [isGrowthComplete, setIsGrowthComplete] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRadishCollection = async () => {
      try {
        const memberRadishes = await getUserRadishCollection();
        setCharacters(memberRadishes);
      } catch (error) {
        console.error("무 컬렉션 가져오기 실패:", error);
      }
    };

    fetchRadishCollection();
  }, []);

  const sortedCharacters = useMemo(() => {
    let sorted = [...characters];
    if (sortBy === "radishCreateTime") {
      sorted.sort(
        (a, b) => new Date(b.radishCreateTime) - new Date(a.radishCreateTime)
      );
    } else if (sortBy === "radishRank") {
      const rankOrder = { S: 3, A: 2, B: 1 };
      sorted.sort((a, b) => rankOrder[b.radishRank] - rankOrder[a.radishRank]);
    }
    return sorted;
  }, [characters, sortBy]);

  const handleChoose = () => {
    setIsChooseActive(!isChooseActive);
    setSelectedCharacter(null);
  };

  const handleCardClick = (char) => {
    if (isChooseActive) {
      setSelectedCharacter(selectedCharacter === char.radishId ? null : char);
    }
  };

  const handleDecision = async () => {
    if (selectedCharacter) {
      try {
        await selectRadish(selectedCharacter.radishName);
        setUserInfo({
          ...userInfo,
          radishName: selectedCharacter.radishName,
          radishRank: selectedCharacter.radishRank,
          radishImageUrl: selectedCharacter.radishImageUrl,
        });
        await selectRadish(selectedCharacter.radishName);
        setIsChooseActive(false);
        setSelectedCharacter(null);
      } catch (error) {
        console.error("Failed to select radish:", error);
      }
    }
  };

  const handleGrow = async (char) => {
    setIsFadingOut(true);
    setTimeout(() => {
      setGrowingCharacter(char);
      try {
        const newRadish = async () => {
          const result = await growBabyRadish();
          setTimeout(() => {
            setCharacters((prevCharacters) =>
              prevCharacters.map((c) => {
                if (c.radishId === char.radishId) {
                  return {
                    ...result,
                    radishNumber: c.radishNumber - 5,
                  };
                }
                return c;
              })
            );
            setGrowingCharacter(null);
            setIsGrowthComplete(true);
          }, 2000); // 애니메이션 지속 시간
        };
        newRadish();
      } catch (error) {
        console.error("Failed to grow radish:", error);
        setGrowingCharacter(null);
      }
    }, 500); // fadeOut 애니메이션 지속 시간
  };

  const handleAcquire = () => {
    window.location.reload();
    navigate('/user?tab=collection')
  };

  return (
    <Container>
      <ChooseButtonContainer>
        <ChooseButton
          onClick={handleChoose}
          isactive={isChooseActive.toString()}
        >
          선택
        </ChooseButton>
      </ChooseButtonContainer>
      <ScrollContainer>
        <CardContainer>
          {sortedCharacters.map((char) => (
            <CharacterCard
              key={char.radishId}
              isselectable={isChooseActive ? "true" : "false"}
              isselected={selectedCharacter?.radishId === char.radishId}
              onClick={() => handleCardClick(char)}
            >
              {growingCharacter?.radishId === char.radishId ? (
                <AnimationContainer>
                  <ExplosionEffect />
                  <SmokeEffect />
                  <NewCharacterEffect>
                    <CharacterImage src={Radishs[char.radishImageUrl]} />
                  </NewCharacterEffect>
                </AnimationContainer>
              ) : (
                <CharacterImage src={Radishs[char.radishImageUrl]} />
              )}
              <CharacterName rank={char.radishRank}>
                {char.radishName}
              </CharacterName>
              <CharacterCount>x {char.count}</CharacterCount>
              {((!isChooseActive &&
                char.radishName === userInfo.radishName) ||
                (isChooseActive &&
                  selectedCharacter?.radishId === char.radishId)) && (
                <CheckBoxOverlay src={checkBox} alt="Selected" />
              )}
              {char.radishName === "응애무" &&
                char.count >= 5 &&
                !isGrowthComplete &&
                !isFadingOut && (
                  <GrowButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGrow(char);
                    }}
                    disabled={growingCharacter !== null}
                    fadeOut={isFadingOut}
                  >
                    성장하기
                  </GrowButton>
                )}
              {isGrowthComplete &&
                growingCharacter?.radishId === char.radishId && (
                  <AcquireButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAcquire();
                    }}
                  >
                    획득하기
                  </AcquireButton>
                )}
            </CharacterCard>
          ))}
        </CardContainer>
      </ScrollContainer>
      {selectedCharacter !== null && (
        <DecisionButtonContainer>
          <DecisionButton onClick={handleDecision}>결정</DecisionButton>
        </DecisionButtonContainer>
      )}
    </Container>
  );
};

export default MyRadish;