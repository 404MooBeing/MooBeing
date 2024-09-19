import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import LoanHistory from "../components/Home/LoanHistory";
import LoanPayment from "../components/Home/LoanPayment";
import QuizPopup from "../components/Home/QuizPopup";
import CreditScore from "../components/Home/CreditScore";
import Footer from "../components/Fixed/Footer";
import Header from "../components/Fixed/Header";
import { getNotStartedQuiz } from "../apis/QuizApi";
import useUserStore from "../store/UserStore"; // Zustand 스토어 import

const Screen = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const slideUp = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-20px);
    opacity: 0;
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  padding-bottom: 70px;
`;

const QuizWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  animation: ${({ $isclosing }) => ($isclosing ? slideUp : slideDown)} 0.5s
    ease-out;
  transition: opacity 0.5s ease-out;
  opacity: ${({ $isclosing }) => ($isclosing ? 0 : 1)};
`;

const Home = () => {
  const [isQuizPopupVisible, setQuizPopupVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const setCanAccessQuiz = useUserStore((state) => state.setCanAccessQuiz);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const data = await getNotStartedQuiz();
        setQuizData(data);
        if (data) {
          setQuizPopupVisible(true);
          setCanAccessQuiz(true); // 퀴즈 팝업이 표시될 때 canAccessQuiz를 true로 설정
        }
      } catch (error) {
        console.error("퀴즈 데이터 가져오기 실패:", error);
      }
    };

    fetchQuizData();
  }, [setCanAccessQuiz]);

  useEffect(() => {
    // isQuizPopupVisible 상태가 변경될 때마다 canAccessQuiz 업데이트
    setCanAccessQuiz(isQuizPopupVisible);
  }, [isQuizPopupVisible, setCanAccessQuiz]);

  const handleCloseQuizPopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setQuizPopupVisible(false);
      setIsClosing(false);
      setCanAccessQuiz(false); // 퀴즈 팝업이 닫힐 때 canAccessQuiz를 false로 설정
    }, 500);
  };

  return (
    <Screen>
      <Container>
        <Header />
        {isQuizPopupVisible && quizData && (
          <QuizWrapper $isclosing={isClosing}>
            <QuizPopup onClose={handleCloseQuizPopup} quizData={quizData} />
          </QuizWrapper>
        )}
        <LoanHistory />
        <LoanPayment />
        <CreditScore />
      </Container>
      <Footer />
    </Screen>
  );
};

export default Home;
