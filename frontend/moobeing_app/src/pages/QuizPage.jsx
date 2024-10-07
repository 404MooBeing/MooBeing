import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getNotStartedQuiz, submitAnswer } from "../apis/QuizApi";
import upArrow from "../assets/quiz/upArrow.svg";
import downArrow from "../assets/quiz/downArrow.svg";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/UserStore";

const PageContainer = styled.div`
  background-color: #e0eed2;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const QuizContainer = styled.div`
  background-color: white;
  border-radius: 20px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuizText = styled.div`
  font-size: 18px;
  text-align: center;
  margin-bottom: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200px;
`;

const ArrowButton = styled.button`
  width: 80px;
  height: 80px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UpButton = styled(ArrowButton)`
  background-color: #59a458;
`;

const DownButton = styled(ArrowButton)`
  background-color: #ffc045;
`;

const ArrowIcon = styled.img`
  width: 40px;
  height: 40px;
`;

const TimerContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
`;

const TimerCircle = styled.svg`
  transform: rotate(-90deg);
`;

const TimerText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  font-weight: bold;
`;

function Quiz() {
  const [quizData, setQuizData] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const navigate = useNavigate();
  const { userInfo } = useUserStore();

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const data = await getNotStartedQuiz();
        if (data) {
          setQuizData(data);
        } else {
          console.log("시작되지 않은 퀴즈가 없습니다.");
        }
      } catch (error) {
        console.error("퀴즈 불러오기 실패:", error);
      }
    }
    fetchQuiz();
  }, []);

  useEffect(() => {
    if (!quizData) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleAnswer("NONE");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizData]);

  const handleAnswer = async (answer) => {
    if (!quizData) return;
    try {
      const result = await submitAnswer(quizData.quizId, answer);
      navigate(`/quiz/result/${quizData.quizId}`, { state: result });
    } catch (error) {
      console.error("답변 제출 실패:", error);
    }
  };

  if (!quizData) return <div>잠시만용!!</div>;

  const timerPercentage = ((15 - timeLeft) / 15) * 100;

  return (
    <PageContainer>
      <QuizContainer>
        <TimerContainer>
          <TimerCircle width="100" height="100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e0e0e0"
              strokeWidth="10"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#ff9800"
              strokeWidth="10"
              strokeDasharray="282.7"
              strokeDashoffset={282.7 - (timerPercentage / 100) * 282.7}
            />
          </TimerCircle>
          <TimerText>{timeLeft}</TimerText>
        </TimerContainer>
        <QuizText>
          {userInfo.name}님의
          <br />
          지난 주 지출액은
          <br />
          {quizData.example}원
        </QuizText>
        <ButtonContainer>
          <UpButton onClick={() => handleAnswer("UP")}>
            <ArrowIcon src={upArrow} alt="Up" />
          </UpButton>
          <DownButton onClick={() => handleAnswer("DOWN")}>
            <ArrowIcon src={downArrow} alt="Down" />
          </DownButton>
        </ButtonContainer>
      </QuizContainer>
    </PageContainer>
  );
}

export default Quiz;
