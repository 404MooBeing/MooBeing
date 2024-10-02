import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import plantingRad from "../assets/radishes/PlantingRad.svg";
import Planting from "../components/CapsulePlanting/Planting";
import Planted from "../components/CapsulePlanting/Planted";
import useCapsuleStore from "../store/Capsule";
import { postPlantCapsule } from "../apis/CapsuleApi";

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
  const [showPlanted, setShowPlanted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const {
    dealId,
    imgFile,
    description,
    type,
    lat,
    lng,
    addressName,
    placeName,
    radishId,
  } = useCapsuleStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPlanted(true);
      setIsAnimating(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const sendCapsuleData = async () => {
      const capsuleData = {
        dealId: dealId,
        imgFile: imgFile,
        description: description,
        type: type,
        lat: lat,
        lng: lng,
        addressName: addressName,
        placeName: placeName,
        radishId: radishId,
      };
      try {
        await postPlantCapsule(capsuleData); // 캡슐 데이터를 postPlantCapsule 함수에 전달
      } catch (error) {
        console.error("캡슐 정보 전송 실패 힝:", error);
        alert("캡슐 정보를 보내는 중 오류가 발생했습니다.");
      }
    };

    sendCapsuleData(); // 비동기 함수 호출
  }, []); // 의존성 배열 추가

  return (
    <>
      <Container>
        {!showPlanted ? <Planting /> : <Planted />}
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
      </Container>
    </>
  );
}

export default CapsulePlanting;
