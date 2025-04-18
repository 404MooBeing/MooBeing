import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Fixed/Header";
import Footer from "./components/Fixed/Footer";
import Home from "./pages/HomePage";
import Loading from "./pages/LoadingPage";
import Login from "./pages/LoginPage";
import SignUp from "./pages/SignUpPage";
import Alarm from "./pages/AlarmPage";
import CapsuleChooseCharacter from "./pages/CapsuleChooseCharacterPage";
import CapsuleChooseLocation from "./pages/CapsuleChooseLocationPage";
import CapsuleHarvest from "./pages/CapsuleHarvestPage";
import CapsuleIntro from "./pages/CapsuleIntroPage";
import CapsuleCreate from "./pages/CapsuleCreatePage";
import CapsulePlanting from "./pages/CapsulePlantingPage";
import CapsuleSearch from "./pages/CapsuleSearchPage";
import CoinExchange from "./pages/CoinExchangePage";
import Coin from "./pages/CoinPage";
import GetRadishCharacter from "./pages/GetRadishCharacterPage";
import TotalLoanJourney from "./pages/TotalLoanJourneyPage";
import EachLoanJourney from "./pages/EachLoanJourneyPage";
import Loan from "./pages/LoanPage";
import LoanPayment from "./pages/LoanPaymentPage";
import Menu from "./pages/MenuPage";
import Moobti from "./pages/MoobtiPage";
import MyCapsule from "./pages/MyCapsulePage";
import MyMap from "./pages/MyMap";
import User from "./pages/MyPage";
import PasswordChange from "./pages/PasswordChangePage";
import Quiz from "./pages/QuizPage";
import EconomyQuiz from "./pages/EconomyQuizPage";
import QuizResult from "./pages/QuizResultPage";
import Spend from "./pages/SpendPage";
import TransactionHistory from "./pages/TransactionHistoryPage";
import Welcome from "./pages/WelcomePage";
import useUserStore from "./store/UserStore";
import ChatbotPage from "./pages/ChatbotPage";
import ChatBot from "./assets/radishes/chatbotRad.png";
import closeButton from "./assets/button/closeButton.svg";

const ChatbotWrapper = styled.div`
  position: fixed;
  bottom: ${(props) => props.position.bottom}px;
  right: ${(props) => props.position.right}px;
  z-index: 1000;
  cursor: grab;
  touch-action: none;
`;

function Router() {
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = useUserStore((state) => state.userInfo);
  const [showChatbot, setShowChatbot] = useState(true); // 챗봇 표시 여부 상태
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ bottom: 90, right: 23 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    // 사용자가 로그인하지 않은 경우에만 로딩 페이지를 표시
    if (!userInfo && location.pathname !== "/signup") {
      const timer = setTimeout(() => {
        setIsLoading(false); // 로딩 종료
        navigate("/login"); // 로그인 페이지로 이동
      }, 3000); // 3초 후 이동

      return () => clearTimeout(timer); // 클린업 함수
    } else {
      setIsLoading(false); // 로그인 상태이거나 signup 페이지이면 로딩 종료
    }
  }, [navigate, userInfo, location.pathname]);

  // 뒤로 가기를 막는 로직
  useEffect(() => {
    if (location.pathname === "/get-radish") {
      window.history.pushState(null, "", window.location.href); // 현재 상태를 히스토리에 추가
      const handlePopState = () => {
        navigate("/", { replace: true }); // 뒤로 가기를 시도하면 홈으로 리다이렉트
      };

      window.addEventListener("popstate", handlePopState);

      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [location.pathname, navigate]);

  // Header와 Footer를 표시하지 않을 경로 목록
  const noHeaderFooterRoutes = ["/loading", "/login", "/signup", "/welcome"];
  // 챗봇을 표시할 경로
  const chatbotRoutes = ["/", "/loan", "/spend", "/menu"];

  // 챗봇 페이지에서는 챗봇 이미지 표시하지 않음
  const isChatbotPage = location.pathname === "/chatbot";

  const shouldShowHeaderFooter = !noHeaderFooterRoutes.includes(location.pathname) && !isLoading && userInfo;

  const shouldShowChatbot =
    chatbotRoutes.includes(location.pathname) && !isChatbotPage;

  // 챗봇 드래그 시작
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX || e.touches[0].clientX,
      y: e.clientY || e.touches[0].clientY,
    });
  };

  // 챗봇 드래그 중
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;

    const deltaX = dragStart.x - clientX;
    const deltaY = dragStart.y - clientY;

    setPosition((prevPosition) => ({
      bottom: prevPosition.bottom + deltaY,
      right: prevPosition.right + deltaX,
    }));

    setDragStart({ x: clientX, y: clientY });
  };

  // 챗봇 드래그 끝
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 페이지가 변경될 때마다 챗봇 위치를 초기화
  useEffect(() => {
    setPosition({ bottom: 90, right: 23 }); // 기본 위치로 초기화
  }, [location.pathname]);

  // 페이지 이동 시 챗봇 다시 표시
  useEffect(() => {
    if (chatbotRoutes.includes(location.pathname)) {
      setShowChatbot(true); // 페이지가 변경될 때 챗봇 다시 표시
    }
  }, [location.pathname]);

  // 챗봇 클릭 시 챗봇 페이지로 이동
  const handleChatbotClick = () => {
    navigate("/chatbot");
  };

  // 챗봇 닫기 버튼 클릭 시 챗봇 숨김
  const handleChatbotClose = () => {
    setShowChatbot(false);
  };

  return (
    <>
      {shouldShowHeaderFooter && <Header />}
      <div
        style={{
          minHeight: shouldShowHeaderFooter ? "calc(100vh - 120px)" : "100vh",
        }}
      >
        {isLoading ? ( // 로딩 중이면 Loading 컴포넌트 표시
          <Loading isLoading={isLoading} />
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/welcome"
              element={
                userInfo ? <Welcome /> : <Navigate replace to="/login" />
              }
            />
            <Route
              path="/"
              element={userInfo ? <Home /> : <Navigate replace to="/login" />}
            />
            <Route
              path="/alarm"
              element={userInfo ? <Alarm /> : <Navigate replace to="/login" />}
            />
            <Route
              path="/choose-character"
              element={
                userInfo ? (
                  <CapsuleChooseCharacter />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route
              path="/choose-location"
              element={
                userInfo ? (
                  <CapsuleChooseLocation />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route
              path="/capsule-harvest"
              element={
                userInfo ? <CapsuleHarvest /> : <Navigate replace to="/login" />
              }
            />
            <Route
              path="/capsule-intro"
              element={
                userInfo ? <CapsuleIntro /> : <Navigate replace to="/login" />
              }
            />
            <Route
              path="/capsule-create"
              element={
                userInfo ? <CapsuleCreate /> : <Navigate replace to="/login" />
              }
            />
            <Route
              path="/capsule-planting"
              element={
                userInfo ? (
                  <CapsulePlanting />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route
              path="/capsule-search"
              element={
                userInfo ? <CapsuleSearch /> : <Navigate replace to="/login" />
              }
            />
            <Route
              path="/coin-exchange"
              element={
                userInfo ? <CoinExchange /> : <Navigate replace to="/login" />
              }
            />
            <Route
              path="/coin"
              element={userInfo ? <Coin /> : <Navigate replace to="/login" />}
            />
            <Route
              path="/get-radish"
              element={
                userInfo ? (
                  <GetRadishCharacter />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route
              path="/total-journey"
              element={
                userInfo ? (
                  <TotalLoanJourney />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route
              path="/each-journey/:loanName"
              element={
                userInfo ? (
                  <EachLoanJourney />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route
              path="/loan"
              element={userInfo ? <Loan /> : <Navigate replace to="/login" />}
            />
            <Route
              path="/loan-payment"
              element={
                userInfo ? <LoanPayment /> : <Navigate replace to="/login" />
              }
            />
            <Route
              path="/menu"
              element={userInfo ? <Menu /> : <Navigate replace to="/login" />}
            />
            <Route
              path="/moobti"
              element={userInfo ? <Moobti /> : <Navigate replace to="/login" />}
            />
            <Route
              path="/my-capsule"
              element={
                userInfo ? <MyCapsule /> : <Navigate replace to="/login" />
              }
            />
            <Route
              path="/my-map"
              element={userInfo ? <MyMap /> : <Navigate replace to="/login" />}
            />
            <Route
              path="/user"
              element={userInfo ? <User /> : <Navigate replace to="/login" />}
            />
            <Route
              path="/password-change"
              element={
                userInfo ? <PasswordChange /> : <Navigate replace to="/login" />
              }
            />
            <Route
              path="/quiz"
              element={userInfo ? <Quiz /> : <Navigate replace to="/login" />}
            />
            <Route
              path="/economy-quiz"
              element={
                userInfo ? <EconomyQuiz /> : <Navigate replace to="/login" />
              }
            />
            <Route
              path="/quiz/result/:quizId"
              element={
                userInfo ? <QuizResult /> : <Navigate replace to="/login" />
              }
            />
            <Route
              path="/spend"
              element={userInfo ? <Spend /> : <Navigate replace to="/login" />}
            />
            <Route
              path="/transaction-history/:accountId"
              element={
                userInfo ? (
                  <TransactionHistory />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route
              path="/chatbot"
              element={
                userInfo ? <ChatbotPage /> : <Navigate replace to="/login" />
              }
            />
          </Routes>
        )}
      </div>
      {shouldShowHeaderFooter && <Footer />}

      {/* Chatbot 이미지 (챗봇 페이지 또는 특정 페이지에서는 표시 안함, 챗봇이 활성화된 경우만 표시) */}
      {!isChatbotPage && showChatbot && shouldShowChatbot && !isLoading && (
        <ChatbotWrapper
          position={position}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown} // 터치 드래그 시작
          onTouchMove={handleMouseMove} // 터치 드래그 중
          onTouchEnd={handleMouseUp} // 터치 드래그 끝
        >
          <img
            src={ChatBot}
            alt="Chatbot"
            style={{
              width: "70px",
              height: "80px",
              filter: "drop-shadow(4px 3px 3px #c3c3c3)",
            }}
            onClick={handleChatbotClick}
          />
          <img
            src={closeButton}
            alt="Close"
            style={{
              position: "absolute",
              top: "0",
              right: "4px",
              width: "12px",
              height: "12px",
              cursor: "pointer",
            }}
            onClick={handleChatbotClose}
          />
        </ChatbotWrapper>
      )}
    </>
  );
}

export default Router;
