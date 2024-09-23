import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import radish from "../assets/radishes/basicRad.svg";

const fadeIn = keyframes`
  from { opacity: 0.5; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 0.5; }
  to { opacity: 0; }
`;

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
  animation: ${(props) => (props.isLoading ? fadeIn : fadeOut)} 1s ease-in-out;
  opacity: ${(props) => (props.isLoading ? 1 : 0)};
  pointer-events: ${(props) => (props.isLoading ? "all" : "none")};

  & .text-wrapper {
    color: #348833;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0;
    line-height: normal;
    text-align: center;
    font-family: "S-CoreDream";
  }

  & .element {
    height: 20%;
    width: 30%;
  }
`;

const Loading = ({ isLoading }) => {
  const [visible, setVisible] = useState(isLoading);

  useEffect(() => {
    if (isLoading) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => setVisible(false), 6000); // 로딩 시간 3초로 설정
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!visible) return null;

  return (
    <StyledLoading isLoading={isLoading}>
      <img className="element" alt="Element" src={radish} />
      <p className="text-wrapper">
        당신의 대출이 <br />
        '무' 가 되는 그날까지
      </p>
    </StyledLoading>
  );
};

export default Loading;
