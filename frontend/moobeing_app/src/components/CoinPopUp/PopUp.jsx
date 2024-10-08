import styled, { keyframes } from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RadishCoinImgSrc from "../../assets/coin/RadishCoin.png";

// 코인이 위로 튀는 애니메이션 정의
const jump = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0); }
`;

// 코인 이미지 스타일 정의
const CoinImage = styled.img`
  width: 70px;
  animation: ${jump} 0.8s ease-in-out infinite;
  margin: 20px 0 10px 0;
`;

// 팝업 배경 및 버튼 스타일
const CoinButton = styled.button`
  background-color: #E0EED2;
  width: 100px;
  color: #5E5054;
  border: none;
  padding: 10px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  font-family: 'mainFont';
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
`;

const CoinPopup = styled.div`
  position: fixed;
  top: 35%;
  left: 50%;
  width: 70%;
  background-color: #F5FDED;
  transform: translateX(-50%);
  z-index: 100000;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
  text-align: center;
`;

const PopupMessage = styled.div`
  text-align: center;
  font-size: 20px; 
  margin-bottom: 30px;
`;

// 투명한 검정색 배경 처리 (Backdrop)
const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* 투명한 검정 배경 */
  z-index: 99999; /* 팝업 바로 뒤에 위치 */
`;

const PopUp = ({ coin }) => {
  const [isProcessing, setIsProcessing] = useState(false); 
  const [popupMessage, setPopupMessage] = useState(`${coin} 코인을 획득하셨습니다!`);
  const [buttonText, setButtonText] = useState("확인");
  const navigate = useNavigate();

  // 버튼 클릭 핸들러
  const btnHandler = () => {
    navigate("/coin");
  };

  return (
    <>
      <Backdrop />
      <CoinPopup>
        {/* 코인 이미지 */}
        <CoinImage src={RadishCoinImgSrc} alt="코인 이미지" />
        <PopupMessage>
          <p>{popupMessage}</p>
        </PopupMessage>
        {/* 확인 버튼 */}
        <CoinButton onClick={btnHandler} disabled={isProcessing}>
          {buttonText}
        </CoinButton>
      </CoinPopup>
    </>
  );
};

export default PopUp;
