import React, { useState } from "react";
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
  display: flex;
  align-items: center;
`;

const CreatedDateText = styled.div`
  font-size: 12px;
  color: #348833;
  margin: 5px 0;
  display: flex;
  align-items: center;
`;

const CopyButton = styled.button`
  margin-left: 10px;
  padding: 4px 8px;
  font-size: 12px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const DateText = styled.div`
  font-size: 14px;
  color: #666;
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 8px;
  margin: 5px 0;
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

const ToastMessage = styled.div`
  position: fixed;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  z-index: 2000;
  font-size: 12px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
`;

function NotGrownYetPopup({ data, onClose }) {
  const [showToast, setShowToast] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard
      .writeText(data.addressName)
      .then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      })
      .catch(() => alert("복사 실패! 다시 시도해주세요."));
  };

  return (
    <>
      <PopupContainer>
        <CloseButton onClick={onClose}>X</CloseButton>
        <Title>아직 열 수 없습니다</Title>
        <Message>이런, 무를 열기에 멀리 계시네요</Message>
        <DateText>D-{data.remainingDays < 0 ? 0 : data.remainingDays}</DateText>
        <InfoText>
          {data.addressName}
          <CopyButton onClick={handleCopyAddress}>복사</CopyButton>
        </InfoText>
        <CreatedDateText>
          이 무는 {new Date(data.createdAt).toLocaleDateString()}에
          심어졌습니다.
        </CreatedDateText>
      </PopupContainer>
      {showToast && (
        <ToastMessage style={{ opacity: 1 }}>
          무캡슐을 열으러 가볼까요?
        </ToastMessage>
      )}
    </>
  );
}

export default NotGrownYetPopup;
