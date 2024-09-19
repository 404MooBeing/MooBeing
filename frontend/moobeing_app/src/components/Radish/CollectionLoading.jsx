import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import basicRad from "../../assets/radishes/basicRad.svg";

// 페이드 인 애니메이션
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// 페이드 아웃 애니메이션
const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

// 스타일드 로딩 컨테이너
const StyledLoading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #e0eed2;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  animation: ${(props) => (props.isLoading ? fadeIn : fadeOut)} 0.5s ease-in-out;
  opacity: ${(props) => (props.isLoading ? 1 : 0)};
  pointer-events: ${(props) => (props.isLoading ? "all" : "none")};

  & .text-wrapper {
    color: #348833;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    font-family: "S-CoreDream";
    margin-bottom: 20px;
  }

  & .element {
    height: 20%;
    width: 30%;
  }
`;

const CollectionLoading = ({ isLoading }) => {
  const [visible, setVisible] = useState(isLoading);

  useEffect(() => {
    if (isLoading) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => setVisible(false), 500); // 페이드 아웃 시간
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!visible) return null;

  return (
    <StyledLoading isLoading={isLoading}>
      <p className="text-wrapper">무들이 아직 깨어나는 중입니다!</p>
      <img className="element" alt="Basic Radish" src={basicRad} />
    </StyledLoading>
  );
};

export default CollectionLoading;