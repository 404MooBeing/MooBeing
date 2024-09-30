import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import radish from "../../assets/radishes/basicRad.svg";
import { useNavigate } from "react-router-dom";
// import { getStreamCnt } from "../../apis/UserApi";
// import { changeInterestRate } from "../../apis/LoanApi";

// 더미 데이터 함수 추가
const getDummyStreamCnt = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ streamCnt: 3 }); // 항상 3을 반환하도록 수정
    }, 500);
  });
};

const dummyChangeInterestRate = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: "금리 혜택이 적용되었습니다." });
    }, 500);
  });
};

const MonthlyRecordContainer = styled.div`
  width: 90%;
  max-width: 380px;
  height: 150px;
  border-radius: 20px;
  border: 1px solid #b1da89;
  box-shadow: 0.3px 0.3px 6px rgba(0, 0, 0, 0.12);
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8%; /* 내부 여백 추가 */
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
    `
    filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.5));
    cursor: pointer;
  `}
`;

const RadishImage = styled.img`
  width: 25px;
  height: 25px;
`;

const LastCircleText = styled.div`
  font-size: 10px;
  text-align: center;
  line-height: 1.2;
`;

const fadeInOut = keyframes`
  0% { opacity: 0; }
  15% { opacity: 1; }
  85% { opacity: 1; }
  100% { opacity: 0; }
`;

const AlertContainer = styled.div`
  position: fixed;
  top: 80px;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
  z-index: 100000;
  background-color: rgba(144, 144, 144, 0.8);
  padding: 10px 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
`;

const AlertButton = styled.button`
  background-color: transparent;
  border: none;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  text-decoration: underline;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 10px;
  background-color: transparent;
  border: none;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
`;

const LoanCoupon = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  const [streamCnt, setStreamCnt] = useState(0); // 초기값을 0으로 설정
  useEffect(() => {
    const fetchStreamCnt = async () => {
      try {
        const response = await getDummyStreamCnt();
        setStreamCnt(response.streamCnt);
      } catch (error) {
        console.error("Stream count를 가져오는 중 오류 발생:", error);
      }
    };

    fetchStreamCnt();
  }, []);

  const handleLastCircleClick = async () => {
    if (streamCnt === 6) {
      try {
        const response = await dummyChangeInterestRate();
        if (response.success) {
          setAlertMessage(response.message);
          setShowAlert(true);
        }
      } catch (error) {
        console.error("금리 혜택 적용 중 오류 발생:", error);
      }
    } else {
      setAlertMessage("아직 금리 혜택을 받을 수 없습니다.");
      setShowAlert(true);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <>
      <MonthlyRecordContainer>
        <Subtitle>
          {streamCnt === 6
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
            onClick={handleLastCircleClick}
          >
            {streamCnt === 6 ? (
              <LastCircleText>
                금리
                <br />
                혜택
              </LastCircleText>
            ) : (
              <LastCircleText>
                금리
                <br />
                혜택
              </LastCircleText>
            )}
          </Circle>
        </CirclesContainer>
      </MonthlyRecordContainer>
      {showAlert && (
        <AlertContainer>
          {alertMessage}
          <AlertButton onClick={handleGoHome}>보러가기</AlertButton>
          <CloseButton onClick={closeAlert}>X</CloseButton>
        </AlertContainer>
      )}
    </>
  );
};

export default LoanCoupon;
