import React from "react";
import { useNavigate } from "react-router";
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
  color: black;
  font-family: 'mainFont';
`;

const HarvestButton = styled.button`
  display: inline-block;
  padding: 10px 20px;
  background-color: #4caf50; /* 초록색 */
  color: white;
  border-radius: 5px;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
  margin-top: 15px;
  border: none;
  font-family: 'mainFont';

  &:hover {
    background-color: #45a049;
  }
`;

function NotGrownYetPopup({ data, onClose }) {
  const navigate = useNavigate();

  const handleHarvest = () => {
    // capsule-harvest로 이동할 때 data.id를 state로 전달
    navigate("/capsule-harvest", {
      state: { id: data.id, image: data.radishImageUrl },
    });
  };

  return (
    <PopupContainer>
      <CloseButton onClick={onClose}>X</CloseButton>
      <Title>무캡슐이 열렸습니다!</Title>
      <Message>축하해요! 무캡슐을 수확할 수 있습니다.</Message>
      <HarvestButton onClick={handleHarvest}>수확하기</HarvestButton>
    </PopupContainer>
  );
}

export default NotGrownYetPopup;
