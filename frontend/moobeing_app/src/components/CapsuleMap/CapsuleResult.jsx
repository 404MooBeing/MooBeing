import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const Card = styled.div`
  width: 300px;
  height: auto;
  background-color: #f5fded;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between; /* 수직 방향으로 공간을 균일하게 분배 */
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TransactionInfoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px;
  margin-bottom: 10px;
`;

const TransactionDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  gap: 8px;
`;

const TransactionName = styled.div`
  margin: 0;
  font-weight: bold;
  font-size: 16px;
`;

const TransactionAmount = styled.div`
  margin: 0;
  font-size: 14px;
`;

const TransactionDate = styled.div`
  margin-right: 20px;
  font-size: 16px;
  font-weight: bold;
`;

const ImageContainer = styled.div`
  width: 78%;
  height: 200px;
  /* background-color: #effedf0; */
  border-radius: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const CharacterImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 20px;
`;

const OpenButton = styled.button`
  width: 80%;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 10px;
  border: none;
  background-color: #e0eed2;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
  font-family: 'mainFont';

  &:hover {
    background-color: #8bc8a5;
  }
`;

const CapsuleResult = ({ response }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    const formattedDate = response.date.slice(0, 7);
    navigate(`/my-capsule?date=${formattedDate}`);
  };

  return (
    <Card>
      <TransactionInfoContainer>
        <TransactionDetails>
          <TransactionName>{response.title}</TransactionName>
          <TransactionAmount>{response.amount}원</TransactionAmount>
        </TransactionDetails>
        <TransactionDate>{response.date}</TransactionDate>
      </TransactionInfoContainer>

      <ImageContainer>
        <CharacterImage src={response.imageUrl} alt="캡슐 이미지" />
      </ImageContainer>

      <OpenButton onClick={handleClick}>열기</OpenButton>
    </Card>
  );
};

export default CapsuleResult;
