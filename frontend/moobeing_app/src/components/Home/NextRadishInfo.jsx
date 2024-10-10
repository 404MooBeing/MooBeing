import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { differenceInSeconds, intervalToDuration } from "date-fns";
import basicRadish from "../../assets/radishes/basicRad.png";
import { getRadishSummary } from "../../apis/RadishApi";
import useUserStore from "../../store/UserStore";

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
  margin-bottom: 170px;
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
  font-size: 18px;
  font-weight: 700;

  @media (min-width: 600px) {
    font-size: 25px;
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
  color: #5e5054;
  pointer-events: none;
  text-align: center;
`;

const RadishInfo = () => {
  const { radishSummary, setRadishSummary } = useUserStore(); // store에서 데이터 가져오기
  const [timeLeft, setTimeLeft] = useState("뽑을 무가 없습니다");
  const [count, setCount] = useState(0);
  const [targetDate, setTargetDate] = useState(null); // 목표 시간을 상태로 저장

  const calculateTimeLeft = (targetDate) => {
    const now = new Date();
    const secondsLeft = differenceInSeconds(new Date(targetDate), now);

    if (secondsLeft > 0) {
      const duration = intervalToDuration({
        start: now,
        end: new Date(targetDate),
      });

      const days = duration.days || 0;
      const hours = duration.hours || 0;
      const minutes = duration.minutes || 0;
      const remainingSeconds = secondsLeft % 60;

      const formattedDuration = `${days}일 ${hours}시간 ${minutes}분 ${remainingSeconds}초`;
      return formattedDuration;
    } else {
      return "무를 뽑을 수 있습니다!";
    }
  };

  useEffect(() => {
    const fetchRadishSummary = async () => {
      try {
        const summary = await getRadishSummary();
        setRadishSummary(summary); // store에 데이터 업데이트
        setCount(summary.count); // 상태 업데이트
        setTargetDate(summary.remainTime);
      } catch (error) {
        console.error("무 요약 데이터를 가져오지 못했습니다.", error);
      }
    };

    fetchRadishSummary();
  }, [setRadishSummary]);

  useEffect(() => {
    if (!targetDate) return;

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate)); // 남은 시간을 매초 계산
    }, 1000);

    return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [targetDate]); // targetDate가 변경될 때마다 실행

  return (
    <Container>
      <SubHeader>
        <SubTitle>다음 무 수확까지</SubTitle>
        <LeftRad>남은 무 {count}개</LeftRad> {/* count 상태 반영 */}
      </SubHeader>
      <CountdownContainer>
        <Countdown>{timeLeft}</Countdown> {/* 남은 시간 표시 */}
        <ImageContainer>
          <RadishIcon src={basicRadish} alt="Radish Icon" />
          <ComingSoon>coming soon</ComingSoon>
        </ImageContainer>
      </CountdownContainer>
    </Container>
  );
};

export default RadishInfo;
