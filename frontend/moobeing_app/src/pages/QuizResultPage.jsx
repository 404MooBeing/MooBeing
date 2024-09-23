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

  // If there's no result in the state, redirect to the quiz page
  if (!result) {
    useEffect(() => {
      navigate("/quiz");
    }, [navigate]);
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
