import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/HomePage";
import Loading from "./pages/LoadingPage";
import Login from "./pages/LoginPage"; 
import SignUp from "./pages/SignUpPage";
import Alarm from "./pages/AlarmPage";
import CapsuleChooseCharacter from "./pages/CapsuleChooseCharacterPage";
import CapsuleChooseLocation from "./pages/CapsuleChooseLocationPage";
import CapsuleHarvest from "./pages/CapsuleHarvestPage";
import CapsuleIntro from "./pages/CapsuleIntroPage";
import CapsulePlanting from "./pages/CapsulePlantingPage";
import CapsuleSearch from "./pages/CapsuleSearchPage";
import CoinExchange from "./pages/CoinExchangePage";
import Coin from "./pages/CoinPage";
import GetRadishCharacter from "./pages/GetRadishCharacterPage";
import LoanJourney from "./pages/LoanJourneyPage";
import Loan from "./pages/LoanPage";
import LoanPayment from "./pages/LoanPaymentPage";
import Menu from "./pages/MenuPage";
import Moobti from "./pages/MoobtiPage";
import MyCapsule from "./pages/MyCapsulePage";
import User from "./pages/MyPage";
import PasswordChange from "./pages/PasswordChangePage";
import Quiz from "./pages/QuizPage";
import Spend from "./pages/SpendPage";
import TransactionHistory from "./pages/TransactionHistoryPage";
import Welcome from "./pages/WelcomePage";

function Router() {
  // userInfo 상태 설정: 초기값은 null로 설정
  const [userInfo, setUserInfo] = useState(null);

  // 임시로 userInfo 값을 설정 (null이면 로그인 상태가 아님)
  // 로그인된 상태로 테스트하고 싶다면 아래의 값으로 userInfo를 설정할 수 있음.
  // 예: { name: 'John Doe', email: 'john@example.com' }
  setUserInfo({ name: 'John Doe', email: 'john@example.com' });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/loading"
          element={userInfo ? <Loading /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!userInfo ? <Login /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!userInfo ? <SignUp /> : <Navigate to="/login" />}
        />
        <Route
          path="/alarm"
          element={!userInfo ? <Alarm /> : <Navigate to="/login" />}
        />
        <Route
          path="/choose-character"
          element={!userInfo ? <CapsuleChooseCharacter /> : <Navigate to="/login" />}
        />
        <Route
          path="/choose-location"
          element={!userInfo ? <CapsuleChooseLocation /> : <Navigate to="/login" />}
        />
        <Route
          path="/capsule-harvest"
          element={!userInfo ? <CapsuleHarvest /> : <Navigate to="/login" />}
        />
        <Route
          path="/capsule-intro"
          element={!userInfo ? <CapsuleIntro /> : <Navigate to="/login" />}
        />
        <Route
          path="/capsule-planting"
          element={!userInfo ? <CapsulePlanting /> : <Navigate to="/login" />}
        />
        <Route
          path="/capsule-search"
          element={!userInfo ? <CapsuleSearch /> : <Navigate to="/login" />}
        />
        <Route
          path="/coin-exchange"
          element={!userInfo ? <CoinExchange /> : <Navigate to="/login" />}
        />
        <Route
          path="/coin"
          element={!userInfo ? <Coin /> : <Navigate to="/login" />}
        />
        <Route
          path="/get-radishcharacter"
          element={!userInfo ? <GetRadishCharacter /> : <Navigate to="/login" />}
        />
        <Route
          path="/loan-journey"
          element={!userInfo ? <LoanJourney /> : <Navigate to="/login" />}
        />
        <Route
          path="/loan"
          element={!userInfo ? <Loan /> : <Navigate to="/login" />}
        />
        <Route
          path="/loan-payment"
          element={!userInfo ? <LoanPayment /> : <Navigate to="/login" />}
        />
        <Route
          path="/menu"
          element={!userInfo ? <Menu /> : <Navigate to="/login" />}
        />
        <Route
          path="/moobti"
          element={!userInfo ? <Moobti /> : <Navigate to="/login" />}
        />
        <Route
          path="/my-capsule"
          element={!userInfo ? <MyCapsule /> : <Navigate to="/login" />}
        />
        <Route
          path="/user"
          element={!userInfo ? <User /> : <Navigate to="/login" />}
        />
        <Route
          path="/password-change"
          element={!userInfo ? <PasswordChange /> : <Navigate to="/login" />}
        />
        <Route
          path="/quiz"
          element={!userInfo ? <Quiz /> : <Navigate to="/login" />}
        />
        <Route
          path="/spend"
          element={!userInfo ? <Spend /> : <Navigate to="/login" />}
        />
        <Route
          path="/transcation-history"
          element={!userInfo ? <TransactionHistory /> : <Navigate to="/login" />}
        />
        <Route
          path="/welcome"
          element={!userInfo ? <Welcome /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
