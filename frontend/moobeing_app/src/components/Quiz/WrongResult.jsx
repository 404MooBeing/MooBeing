import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import basicRad from "../../assets/radishes/basicRad.png";

const ResultContainer = styled.div`
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const Expression = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Result = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
`;

const Radish = styled.img`
  width: 30%;
  height: 30%;
  margin: 15px 0;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 600px) {
    width: 25%;
    height: 25%;
  }
`;

const ChatBubbleContainer = styled.div`
  position: relative;
  margin-top: 30px;
  height: auto;
  max-width: 260px;
  margin-left: auto;
  margin-right: auto;
`;

const ChatBubbleSVG = styled.svg`
  width: 100%;
  height: auto;
  filter: drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.1));
`;

const ChatBubbleText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  font-size: 15px;
  color: #333;
  text-align: center;
  padding-bottom: 15px;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const Button = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 12px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  cursor: pointer;
  border-radius: 12px;
  transition: background-color 0.3s ease;
  width: 170px;
  margin-left: auto;
  margin-right: auto;

  &:hover {
    background-color: #45a049;
  }

  @media (min-width: 600px) {
    width: 250px;
  }

  @media (min-width: 600px) {
    width: 250px;
  }
`;

const formatKoreanCurrency = (amount) => {
  const units = ["", "만", "억", "조"];
  let result = "";
  let unitIndex = 0;

  while (amount > 0) {
    const chunk = amount % 10000;
    if (chunk > 0) {
      result = `${chunk}${units[unitIndex]} ${result}`;
    }
    amount = Math.floor(amount / 10000);
    unitIndex++;
  }

  return result.trim() + "원";
};

const ChatBubble = ({ message }) => {
  const minWidth = 80; // Reduced minimum width
  const maxWidth = 120; // Reduced maximum width
  const charWidth = 40; // Slightly reduced character width
  const lineHeight = 25; // Slightly reduced line height
  const padding = 20; // Reduced padding

  const messageWidth = Math.min(
    Math.max(message.length * charWidth, minWidth),
    maxWidth
  );
  const messageHeight = Math.ceil(messageWidth / charWidth / 3) * lineHeight;

  const width = messageWidth + padding * 2;
  const height = messageHeight + padding * 2;

  return (
    <ChatBubbleContainer>
      <ChatBubbleSVG
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={`M10,0 H${width - 10} 
             C${width},0 ${width},0 ${width},10 
             V${height - 20} 
             C${width},${height - 10} ${width},${height - 10} ${width - 10},${
            height - 10
          } 
             H${width / 2 + 20} 
             L${width / 2},${height} 
             L${width / 2 - 20},${height - 10} 
             H10 
             C0,${height - 10} 0,${height - 10} 0,${height - 20} 
             V10 
             C0,0 0,0 10,0 Z`}
          fill="#ffffffa1"
          stroke="#bbbbbb"
          strokeWidth="1"
        />
      </ChatBubbleSVG>
      <ChatBubbleText>{message}</ChatBubbleText>
    </ChatBubbleContainer>
  );
};

function RightResult({ message, answer, type, explanation }) {
  const formattedAnswer = formatKoreanCurrency(answer);
  const navigate = useNavigate();

  const handleGetRadish = () => {
    navigate("/");
  };

  return (
    <ResultContainer>
      <Expression>다음 기회에!</Expression>

      {type === "economy" ? (
        <Result>{explanation}</Result>
      ) : (
        <>
          <Result>
            지난 주 지출액은 <br /> {formattedAnswer} 입니다.
          </Result>
        </>
      )}
      <ChatBubble message={message} />
      <Radish src={basicRad} alt="Radish character" />
      <Button onClick={handleGetRadish}>홈으로 가기 </Button>
    </ResultContainer>
  );
}

export default RightResult;
