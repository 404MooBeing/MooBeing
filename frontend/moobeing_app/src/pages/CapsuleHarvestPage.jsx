import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import { useLocation } from "react-router-dom";
import { postHarvestCapsule } from "../apis/CapsuleApi";
import confetti from "canvas-confetti";
import soil from "../assets/capsules/Soil.png";
import radish from "../assets/radishes/basicRad.png";
import CapsuleResult from "../components/CapsuleMap/CapsuleResult";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  position: relative;
  background-color: #d2ebee;
`;

const Title = styled.h2`
  font-size: 40px;
  text-align: center;
  margin-top: 25%;
`;

const SoilImage = styled.img`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30%;
  max-height: 50vh;
  object-fit: cover;
  margin-bottom: 35%;
  z-index: 2;
`;

const RadishImage = styled.img`
  position: absolute;
  bottom: 45%;
  width: 300px;
  height: auto;
  z-index: 0;
  animation: ${({ show }) =>
    show &&
    css`
      ${radishAnimation} 3s steps(1, end) 3;
    `};
`;

const radishAnimation = keyframes`
  0% {
    transform: translateY(100%);
  }
  16.67% {
    transform: translateY(60%);
  }
  33.33% {
    transform: translateY(30%);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translate(-50%, -40%); }
  to { opacity: 1; transform: translate(-50%, -50%); }
`;

const CapsuleResultCardWrapper = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  animation: ${fadeIn} 0.8s ease-out;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9;
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
  bottom: 10%;
  left: 10%;
  width: 80%;
  background-color: #0000006a;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${slideInOut} 4s ease-in-out forwards;
  z-index: 1000;
`;

const CoinImage = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 10px;
`;

const ConfettiCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
`;

function CapsuleHarvest() {
  const location = useLocation();
  const [radishImageUrl, setRadishImageUrl] = useState("");
  const [harvestResponse, setHarvestResponse] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showCoinPopUp, setShowCoinPopUp] = useState(false);
  const confettiCanvasRef = useRef(null);

  useEffect(() => {
    if (location.state && location.state.id) {
      async function fetchHarvestData() {
        try {
          const response = await postHarvestCapsule(location.state.id);
          console.log("응답", response);
          setRadishImageUrl(location.state.image);
          setHarvestResponse(response);
        } catch (error) {
          console.error("무 수확 실패:", error);
        }
      }
      fetchHarvestData();
    }
  }, [location.state]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowResult(true);
      fireConfetti();
      if (harvestResponse && harvestResponse.coin > 0) {
        setShowCoinPopUp(true);
        setTimeout(() => {
          setShowCoinPopUp(false);
        }, 4000); // 4초 후 팝업 사라짐
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [harvestResponse]);

  const fireConfetti = () => {
    const myConfetti = confetti.create(confettiCanvasRef.current, {
      resize: true,
      useWorker: true,
    });

    myConfetti({
      particleCount: 100,
      spread: 90,
      origin: { x: 0, y: 0.8 },
    });

    myConfetti({
      particleCount: 100,
      spread: 130,
      origin: { x: 1, y: 0.8 },
    });
  };

  return (
    <Container>
      <ConfettiCanvas ref={confettiCanvasRef} />
      {showCoinPopUp && (
        <CoinPopUp>
          {harvestResponse.coin} 코인을 획득하였습니다!
          <CoinImage src={radish} alt="Coin" />
        </CoinPopUp>
      )}
      {!showResult ? (
        <>
          <Title>무를 수확중입니다.</Title>
          <SoilImage src={soil} alt="Soil" />
          <RadishImage src={radishImageUrl} alt="Radish" show={true} />
        </>
      ) : (
        harvestResponse && (
          <>
            <Overlay />
            <CapsuleResultCardWrapper>
              <CapsuleResult response={harvestResponse} />
            </CapsuleResultCardWrapper>
          </>
        )
      )}
    </Container>
  );
}

export default CapsuleHarvest;
