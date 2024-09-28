import React from "react";
import styled, { keyframes } from "styled-components";
import plantingRad from "../assets/radishes/PlantingRad.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  position: relative;
  margin-bottom: 20vh;
`;

const Title = styled.h1`
  text-align: center;
  margin-top: 20%;
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
  bottom: 400px;
  left: 50%;
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
  font-weight: 800;
  transform: rotate(-35deg);
  opacity: 0;
  animation: ${fadeInOut} 3s ease-in-out infinite;
  animation-delay: ${(props) => props.delay}s;
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
  return (
    <Container>
      <Title>
        무가 심어지고 <br /> 있습니다.
      </Title>
      <RadishInSoil src={plantingRad} alt="Radish in soil" />
      <ZContainer>
        <Z1 delay={0}>Z</Z1>
        <Z2 delay={0.5}>Z</Z2>
        <Z3 delay={1}>Z</Z3>
      </ZContainer>
    </Container>
  );
}

export default CapsulePlanting;
