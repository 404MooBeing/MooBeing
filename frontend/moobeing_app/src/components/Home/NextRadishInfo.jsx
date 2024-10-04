import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { differenceInSeconds, intervalToDuration } from "date-fns";
import basicRadish from "../../assets/radishes/basicRad.svg";
import { getRadishSummary } from "../../apis/RadishApi";

const Container = styled.div`
  background-color: #f5fded;
  border-radius: 20px;
  width: 90%;
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 8%;
  box-sizing: border-box;
`;

const SubHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
`;

const SubTitle = styled.div`
  font-size: 22px;
  font-weight: 700;
  @media (min-width: 600px) {
    font-size: 27px;
  }
`;

const LeftRad = styled.div`
  margin-left: 10px;
`;

const CountdownContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Countdown = styled.div`
  font-size: 20px;
  font-weight: 700;

  @media (min-width: 600px) {
    font-size: 35px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const RadishIcon = styled.img`
  width: 50px;
  height: 50px;
  opacity: 50%;
`;

const ComingSoon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 15px;
  font-weight: 700;
  color: #5E5054;
  pointer-events: none;
  text-align: center;
`;

const LoanInfo = () => {
  const [timeLeft, setTimeLeft] = useState("");

  const targetDate = new Date("2024-10-05T00:00:00");

  const calculateTimeLeft = () => {
    const now = new Date();
    const secondsLeft = differenceInSeconds(targetDate, now);

    if (secondsLeft > 0) {
      const duration = intervalToDuration({
        start: now,
        end: targetDate,
      });

      // undefined 방지를 위해 기본값을 설정
      const days = duration.days || 0;
      const hours = duration.hours || 0;
      const minutes = duration.minutes || 0;
      const remainingSeconds = secondsLeft % 60;

      // 한국어 형식으로 문자열 만들기
      const formattedDuration = `${days}일 ${hours}시간 ${minutes}분 ${remainingSeconds}초`;
      return formattedDuration;
    } else {
      return "시간이 만료되었습니다!";
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <SubHeader>
        <SubTitle>다음 무 수확까지</SubTitle>
        <LeftRad>남은 무 6개</LeftRad>
      </SubHeader>
      <CountdownContainer>
        <Countdown>{timeLeft}</Countdown>
        <ImageContainer>
          <RadishIcon src={basicRadish} alt="Radish Icon" />
          <ComingSoon>coming soon</ComingSoon>
        </ImageContainer>
      </CountdownContainer>
    </Container>
  );
};

export default LoanInfo;
