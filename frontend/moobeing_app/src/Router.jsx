import React, { useEffect } from "react";
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
import EconomyQuiz from "./pages/EconomyQuizPage"
import QuizResult from "./pages/QuizResultPage";
import Spend from "./pages/SpendPage";
import TransactionHistory from "./pages/TransactionHistoryPage";
import Welcome from "./pages/WelcomePage";
import useUserStore from "./store/UserStore";
import ChatBot from "./assets/radishes/chatbotRad.png";

function Router() {
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = useUserStore((state) => state.userInfo);
  // Header와 Footer를 표시하지 않을 경로 목록
  const noHeaderFooterRoutes = ["/loading", "/login", "/signup", "/welcome"];

  const shouldShowHeaderFooter = !noHeaderFooterRoutes.includes(
    location.pathname
  );

  // 챗봇 클릭 시 챗봇 페이지로 이동
  // const handleChatbotClick = () => {
  //   navigate("/chatbot");
  // };

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
          <Route path="/get-radish" element={<GetRadishCharacter />} />
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
          <Route path="/economy-quiz" element={<EconomyQuiz />} />
          <Route path="/quiz/result/:quizId" element={<QuizResult />} />
          <Route path="/spend" element={<Spend />} />
          <Route
            path="/transaction-history/:accountId"
            element={<TransactionHistory />}
          />
          <Route path="/welcome" element={<Welcome />} />
          {/* <Route path="/welcome" element={<Welcome />} /> */}
        </Routes>
      </div>
      {shouldShowHeaderFooter && <Footer />}
      {/* Chatbot 이미지 */}
      <img
        src={ChatBot}
        alt="Chatbot"
        style={{
          position: "fixed",
          bottom: "90px",
          right: "23px",
          width: "70px",
          height: "80px",
          zIndex: 1000,
          cursor: "pointer",
          filter: "drop-shadow(4px 3px 3px #c3c3c3)",
        }}
        // onClick={handleChatbotClick}
      />
    </>
  );
}

export default Router;
