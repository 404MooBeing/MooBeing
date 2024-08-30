import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Footer from "../components/Fixed/Footer";
import Header from "../components/Fixed/Header";
import Line from "../assets/button/Line.svg";
import {
  getUserRadishCollection,
  selectRadish,
  growBabyRadish,
} from "../apis/RadishApi";
import useUserStore from "../store/UserStore";
import checkBox from "../assets/checkBox.svg";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  padding-bottom: 30px;
`;

const ScrollableContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
  box-sizing: border-box;
`;

const ContentContainer = styled.div`
  flex: 1;
  margin-bottom: 20px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 5vh auto 0;
  padding: 0 20px;
  box-sizing: border-box;
`;

const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Subtitle = styled.h2`
  margin-bottom: 20px;
`;

const SortButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const SortButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: ${(props) => (props.isselected ? "bold" : "normal")};
`;

const LineImg = styled.img`
  height: 15px;
  padding: 0px 10px;
  margin-top: 2px;
`;

const ChooseButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const ChooseButton = styled.button`
  background-color: ${(props) =>
    props.isactive === "true" ? "#348833" : "#E0EED2"};
  color: ${(props) => (props.isactive === "true" ? "white" : "black")};
  border: none;
  border-radius: 30px;
  padding: 10px 20px;
  cursor: pointer;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
  margin-bottom: 50px;
`;

const CharacterCard = styled.div`
  width: calc(50% - 10px);
  max-width: 180px;
  height: 150px;
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
  padding: 2px 5px;
  border-radius: 20px;
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
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

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

const GrowButton = styled.button`
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
`;

const RadishCollection = () => {
  const [sortBy, setSortBy] = useState("date");
  const [isChooseActive, setIsChooseActive] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedSort, setSelectedSort] = useState("date");
  const [characters, setCharacters] = useState([]);
  const { userInfo, setUserInfo } = useUserStore();
  const [growingCharacter, setGrowingCharacter] = useState(null);

  useEffect(() => {
    const fetchRadishCollection = async () => {
      try {
        const response = await getUserRadishCollection();
        setCharacters(response.memberRadishes);
      } catch (error) {
        console.error("Failed to fetch radish collection:", error);
      }
    };

    fetchRadishCollection();
  }, []);

  const handleSort = (type) => {
    if (type === "date") {
      setCharacters([...characters]);
    } else if (type === "radishRank") {
      const sortedCharacters = [...characters].sort((a, b) => {
        if (a.radishRank < b.radishRank) return -1;
        if (a.radishRank > b.radishRank) return 1;
        return 0;
      });
      setCharacters(sortedCharacters);
    }
    setSortBy(type);
    setSelectedSort(type);
  };

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
        setIsChooseActive(false);
        setSelectedCharacter(null);
      } catch (error) {
        console.error("Failed to select radish:", error);
      }
    }
  };

  const handleGrow = async (char) => {
    setGrowingCharacter(char);
    try {
      const newRadish = await growBabyRadish();
      setTimeout(() => {
        const updatedCharacters = characters.map((c) => {
          if (c.radishId === char.radishId) {
            return {
              ...newRadish,
              radishNumber: c.radishNumber - 5,
            };
          }
          return c;
        });
        setCharacters(updatedCharacters);
        setGrowingCharacter(null);
      }, 2000);
    } catch (error) {
      console.error("Failed to grow radish:", error);
      setGrowingCharacter(null);
    }
  };

  return (
    <PageWrapper>
      <Header />
      <ScrollableContent>
        <ContentContainer>
          <Container>
            <TitleContainer>
              <Subtitle>무 컬렉션</Subtitle>
              <SortButtonContainer>
                <SortButton
                  onClick={() => handleSort("date")}
                  isselected={selectedSort === "date"}
                >
                  날짜순
                </SortButton>
                <LineImg src={Line} alt="Line" />
                <SortButton
                  onClick={() => handleSort("radishRank")}
                  isselected={selectedSort === "radishRank"}
                >
                  랭킹순
                </SortButton>
              </SortButtonContainer>
            </TitleContainer>
            <ChooseButtonContainer>
              <ChooseButton
                onClick={handleChoose}
                isactive={isChooseActive.toString()}
              >
                선택
              </ChooseButton>
            </ChooseButtonContainer>
            <CardContainer>
              {characters.map((char) => (
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
                        <CharacterImage src={char.radishImageUrl} />
                      </NewCharacterEffect>
                    </AnimationContainer>
                  ) : (
                    <CharacterImage src={char.radishImageUrl} />
                  )}
                  <CharacterName rank={char.radishRank}>
                    {char.radishName}
                  </CharacterName>
                  <CharacterCount>{char.radishNumber}x</CharacterCount>
                  {((!isChooseActive &&
                    char.radishName === userInfo.radishName) ||
                    (isChooseActive &&
                      selectedCharacter?.radishId === char.radishId)) && (
                    <CheckBoxOverlay src={checkBox} alt="Selected" />
                  )}
                  {char.radishName === "응애무" && char.radishNumber >= 5 && (
                    <GrowButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGrow(char);
                      }}
                      disabled={growingCharacter !== null}
                    >
                      성장하기
                    </GrowButton>
                  )}
                </CharacterCard>
              ))}
            </CardContainer>
          </Container>
        </ContentContainer>
      </ScrollableContent>
      <Footer />
      {selectedCharacter !== null && (
        <DecisionButtonContainer>
          <DecisionButton onClick={handleDecision}>결정</DecisionButton>
        </DecisionButtonContainer>
      )}
    </PageWrapper>
  );
};

export default RadishCollection;
