import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import basicRad from "../../assets/radishes/basicRad.svg";

const ResultContainer = styled.div`
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  width: 40%;
  height: 40%;
  margin: 15px 0;

  @media (min-width: 600px) {
    width: 30%;
    height: 30%;
  }
`;

const Button = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 12px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px 2px;
  cursor: pointer;
  border-radius: 12px;
  transition: background-color 0.3s ease;
  width: 180px;

  &:hover {
    background-color: #45a049;
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

function RightResult({ message, answer, type, explanation }) {
  const formattedAnswer = formatKoreanCurrency(answer);
  const navigate = useNavigate();

  const handleGetRadish = () => {
    navigate("/get-radish", { state: { source: "quiz" } });
  };

  return (
    <ResultContainer>
          <Expression>대단해요!</Expression>
          {type === "economy" ? (
        <Result>{explanation}</Result>
      ) : (
        <>
          <Result>
            지난 주 지출액은 <br /> {formattedAnswer} 입니다.
          </Result>
        </>
      )}
      <Radish src={basicRad} alt="Radish character" />
          <Button onClick={handleGetRadish}>무 받으러 가기</Button>
    </ResultContainer>
  );
}

export default RightResult;
