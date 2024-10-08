import React from "react";
import styled from "styled-components";

const PopupContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 15px;
  z-index: 1000;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #333;
`;

const Message = styled.p`
  font-size: 14px;
  color: #666;
  margin: 10px 0;
`;

const RadishImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin: 10px 0;
`;

const InfoText = styled.div`
  font-size: 14px;
  color: #333;
  margin: 5px 0;
`;

const DateText = styled.div`
  font-size: 14px;
  color: #666;
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 8px;
  margin: 10px 0;
  width: fit-content;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
`;

function NotGrownYetPopup({ data, onClose }) {
  return (
    <PopupContainer>
      <CloseButton onClick={onClose}>X</CloseButton>
      <Title>아직 열 수 없습니다</Title>
      <Message>아직 무가 자라지 않았어요!</Message>
      <DateText>D-{data.remainingDays}</DateText>
      {/* <InfoText>Address: {data.addressName}</InfoText> */}
      <InfoText>
        Created At: {new Date(data.createdAt).toLocaleString()}
      </InfoText>
    </PopupContainer>
  );
}

export default NotGrownYetPopup;
