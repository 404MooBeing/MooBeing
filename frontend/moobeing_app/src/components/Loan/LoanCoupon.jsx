import React, { useState, useEffect } from "react";
import styled from "styled-components";
import radish from "../../assets/radishes/basicRad.png";
import { getStreamCnt } from "../../apis/UserApi";
import CoinPopUp from "../../components/CoinPopUp/PopUp";

const MonthlyRecordContainer = styled.div`
  width: 85%;
  border-radius: 20px;
  border: 1px solid #b1da89;
  box-shadow: 0.3px 0.3px 6px rgba(0, 0, 0, 0.12);
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 3% 5%;
  box-sizing: border-box;
`;

const Subtitle = styled.h3`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const CirclesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Circle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #b1da89;
  background-color: ${(props) =>
    props.last && props.completed
      ? "#FFD600"
      : props.last
      ? "#CCCCCC"
      : "#F5FDED"};
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.last &&
    props.completed &&
    `filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.5)); cursor: pointer;`}
  ${(props) => !props.completed && props.last && `cursor: not-allowed;`}
`;

const RadishImage = styled.img`
  width: 25px;
  height: 25px;
`;

const LastCircleText = styled.div`
  font-size: 10px;
  text-align: center;
  line-height: 1.2;
  font-weight: 700;
`;

const LoanCoupon = () => {
  const [streamCnt, setStreamCnt] = useState(0); // 초기값을 0으로 설정
  const [coin, setCoin] = useState(0); // 초기값을 0으로 설정
  const [showCoinPopUp, setShowCoinPopUp] = useState(false); // CoinPopUp 상태 관리

  useEffect(() => {
    const fetchStreamCnt = async () => {
      try {
        const response = await getStreamCnt();
        setStreamCnt(response.streamCnt);
        setCoin(response.coin);
      } catch (error) {
        console.error("Stream count를 가져오는 중 오류 발생:", error);
      }
    };

    fetchStreamCnt();
  }, []);

  const handleLastCircleClick = () => {
    if (streamCnt === 6) {
      setShowCoinPopUp(true); // 코인 팝업 띄우기
    }
  };

  return (
    <>
      <MonthlyRecordContainer>
        <Subtitle>
          {streamCnt >= 6
            ? "6개월동안 성실히 상환한 당신!"
            : `${streamCnt}개월째 성실히 상환중!`}
        </Subtitle>
        <CirclesContainer>
          {[...Array(5)].map((_, index) => (
            <Circle key={index}>
              {index < streamCnt && <RadishImage src={radish} alt="Radish" />}
            </Circle>
          ))}
          <Circle
            last
            completed={streamCnt === 6}
            onClick={streamCnt === 6 ? handleLastCircleClick : null} // 6개월 이상이 되어야 클릭 가능
          >
            <LastCircleText>
              코인
              <br />
              획득
            </LastCircleText>
          </Circle>
        </CirclesContainer>
      </MonthlyRecordContainer>
      {showCoinPopUp && <CoinPopUp coin={coin}/>}
    </>
  );
};

export default LoanCoupon;
