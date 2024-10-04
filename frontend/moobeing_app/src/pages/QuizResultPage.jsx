import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RightResult from "../components/Quiz/RightResult";
import WrongResult from "../components/Quiz/WrongResult";
import styled from "styled-components";

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e0eed2;
`;

function QuizResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state;

  // useEffect는 항상 동일한 위치에서 호출되어야 함
  useEffect(() => {
    if (!result) {
      navigate("/quiz");
    }
  }, [result, navigate]);

  // result가 없으면 null을 반환하여 아무것도 렌더링하지 않음
  if (!result) {
    return null;
  }

  return (
    <PageContainer>
      {result.correct ? (
        <RightResult message={result.message} answer={result.answer} />
      ) : (
        <WrongResult message={result.message} answer={result.answer} />
      )}
    </PageContainer>
  );
}

export default QuizResult;
