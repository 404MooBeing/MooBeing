import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
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
import QuizResult from "./pages/QuizResultPage";
import Spend from "./pages/SpendPage";
import TransactionHistory from "./pages/TransactionHistoryPage";
import Welcome from "./pages/WelcomePage";
import useUserStore from "./store/UserStore";
import ChatbotPage from "./pages/ChatbotPage";
import ChatBot from "./assets/radishes/chatbotRad.png";
import closeButton from "./assets/button/closeButton.svg";

function Router() {
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = useUserStore((state) => state.userInfo);
  const [showChatbot, setShowChatbot] = useState(true); // 챗봇 표시 여부 상태

  // 로그인되지 않았을 경우 로그인 페이지로 리디렉션
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  // Header와 Footer를 표시하지 않을 경로 목록
  const noHeaderFooterRoutes = ["/loading", "/login", "/signup", "/welcome"];

  const shouldShowHeaderFooter = !noHeaderFooterRoutes.includes(
    location.pathname
  );

  // 챗봇 페이지에서는 챗봇 이미지 표시하지 않음
  const isChatbotPage = location.pathname === "/chatbot";

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
        <Routes>
          <Route path="/" element={userInfo ? <Home /> : <Navigate replace to="/login" />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/alarm" element={<Alarm />} />
          <Route path="/choose-character" element={<CapsuleChooseCharacter />} />
          <Route path="/choose-location" element={<CapsuleChooseLocation />} />
          <Route path="/capsule-harvest" element={<CapsuleHarvest />} />
          <Route path="/capsule-intro" element={<CapsuleIntro />} />
          <Route path="/capsule-create" element={<CapsuleCreate />} />
          <Route path="/capsule-planting" element={<CapsulePlanting />} />
          <Route path="/capsule-search" element={<CapsuleSearch />} />
          <Route path="/coin-exchange" element={<CoinExchange />} />
          <Route path="/coin" element={<Coin />} />
          <Route path="/get-radishcharacter" element={<GetRadishCharacter />} />
          <Route path="/total-journey" element={<TotalLoanJourney />} />
          <Route path="/each-journey/:loanName" element={<EachLoanJourney />} />
          <Route path="/loan" element={<Loan />} />
          <Route path="/loan-payment" element={<LoanPayment />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/moobti" element={<Moobti />} />
          <Route path="/my-capsule" element={<MyCapsule />} />
          <Route path="/my-map" element={<MyMap />} />
          <Route path="/user" element={<User />} />
          <Route path="/password-change" element={<PasswordChange />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz/result/:quizId" element={<QuizResult />} />
          <Route path="/spend" element={<Spend />} />
          <Route
            path="/transaction-history/:accountId"
            element={<TransactionHistory />}
          />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
        </Routes>
      </div>
      {shouldShowHeaderFooter && <Footer />}

      {/* Chatbot 이미지 (챗봇 페이지에서는 표시 안함, 챗봇이 활성화된 경우만 표시) */}
      {!isChatbotPage && showChatbot && (
        <div style={{ position: "fixed", bottom: "90px", right: "23px", zIndex: 1000 }}>
          <img
            src={ChatBot}
            alt="Chatbot"
            style={{
              width: "70px",
              height: "80px",
              cursor: "pointer",
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
        </div>
      )}
    </>
  );
}

export default Router;
