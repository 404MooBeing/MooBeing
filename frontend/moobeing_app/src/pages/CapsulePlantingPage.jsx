import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import plantingRad from "../assets/radishes/PlantingRad.svg";
import Planting from "../components/CapsulePlanting/Planting";
import Planted from "../components/CapsulePlanting/Planted";
import { useLocation } from "react-router-dom";
import RadishCoinImgSrc from "../assets/coin/RadishCoin.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  position: relative;
  margin-bottom: 20vh;
  background-color: #d2ebee;
`;

const RadishInSoil = styled.img`
  position: absolute;
  bottom: 0;
  width: 100%;
  max-height: 50vh;
  object-fit: cover;
  margin-bottom: 35%;
`;

const slideInOut = keyframes`
  0% {
    transform: translateX(-50%);
    opacity: 0;
  }
  20% {
    transform: translateX(0);
    opacity: 1;
  }
  80% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(50%);
    opacity: 0;
  }
`;

const CoinPopUp = styled.div`
  position: absolute;
  bottom: 60%;
  width: 80%;
  background-color: #00000044;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center; /* 이미지와 텍스트를 수직 중앙 정렬 */
  animation: ${slideInOut} 4s ease-in-out forwards;
  z-index: 1000;
`;

const CoinImage = styled.img`
  width: 24px; /* 문구 높이와 일치하도록 조정 */
  height: 24px;
  margin-left: 10px; /* 텍스트와 이미지 간의 간격 */
`;

const ZContainer = styled.div`
  position: absolute;
  bottom: 43%;
  left: 73%;
  gap: 15%;
  transform: translateX(-50%) rotate(-20deg);
  display: flex;
  align-items: flex-end;
`;

const fadeInOut = keyframes`
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
`;

const ZText = styled.span`
  font-weight: 1000;
  opacity: 0;
  animation: ${({ isAnimating }) =>
    isAnimating
      ? css`
          ${fadeInOut} 3s ease-in-out infinite
        `
      : "none"};
  animation-delay: ${(props) => props.delay}s;
  color: #5e5054;
`;

const Z1 = styled(ZText)`
  font-size: 40px;
`;

const Z2 = styled(ZText)`
  font-size: 50px;
`;

const Z3 = styled(ZText)`
  font-size: 60px;
`;

function CapsulePlanting() {
  const location = useLocation();
  const coin = location.state?.response?.coin || 0;
  const [showPlanted, setShowPlanted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const [showCoinPopUp, setShowCoinPopUp] = useState(false);

  useEffect(() => {
    console.log("coin 잘 들어왔나요?", coin);
    console.log(
      "무심기 로딩창으로 response 잘 왔나요?",
      location.state.response
    );
    const timer = setTimeout(() => {
      setShowPlanted(true);
      setIsAnimating(false);
      if (coin > 0) {
        setShowCoinPopUp(true);
        setTimeout(() => {
          setShowCoinPopUp(false);
        }, 4000);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [coin]);

  return (
    <>
      <Container>
        {!showPlanted ? (
          <Planting />
        ) : (
          <Planted response={location.state.response} />
        )}
        <RadishInSoil src={plantingRad} alt="Radish in soil" />
        <ZContainer>
          <Z1 delay={0} isAnimating={isAnimating}>
            Z
          </Z1>
          <Z2 delay={0.5} isAnimating={isAnimating}>
            Z
          </Z2>
          <Z3 delay={1} isAnimating={isAnimating}>
            Z
          </Z3>
        </ZContainer>
        {showCoinPopUp && (
          <CoinPopUp>
            {coin} 코인을 획득하였습니다!
            <CoinImage src={RadishCoinImgSrc} alt="Coin" />
          </CoinPopUp>
        )}
      </Container>
    </>
  );
}

export default CapsulePlanting;
