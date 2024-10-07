// NotOpenedYetPopup.jsx
import React from "react";
import styled from "styled-components";

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 2000;
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
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
`;

function NotOpenedYetPopup({ data, onClose }) {
  return (
    <PopupContainer>
      <Title>Not Opened Yet</Title>
      <Message>You are too far to open this radish.</Message>
      <CloseButton onClick={onClose}>Close</CloseButton>
    </PopupContainer>
  );
}

export default NotOpenedYetPopup;
