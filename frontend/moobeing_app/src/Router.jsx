import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
  const location = useLocation();

<<<<<<< frontend/moobeing_app/src/Router.jsx
  useEffect(() => {
    // 컴포넌트가 마운트될 때 한 번만 실행됩니다.
    setUserInfo({ name: "John Doe", email: "john@example.com" });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/loading"
        element={userInfo ? <Loading /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={userInfo ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/signup"
        element={userInfo ? <Navigate to="/" /> : <SignUp />}
      />
      <Route
        path="/alarm"
        element={userInfo ? <Alarm /> : <Navigate to="/login" />}
      />
      <Route
        path="/choose-character"
        element={
          userInfo ? <CapsuleChooseCharacter /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/choose-location"
        element={
          userInfo ? <CapsuleChooseLocation /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/capsule-harvest"
        element={userInfo ? <CapsuleHarvest /> : <Navigate to="/login" />}
      />
      <Route path="/capsule-intro" element={<CapsuleIntro />} />
      <Route path="/capsule-create" element={<CapsuleCreate />} />
      <Route
        path="/capsule-planting"
        element={userInfo ? <CapsulePlanting /> : <Navigate to="/login" />}
      />
      <Route
        path="/capsule-search"
        element={userInfo ? <CapsuleSearch /> : <Navigate to="/login" />}
      />
      <Route
        path="/coin-exchange"
        element={userInfo ? <CoinExchange /> : <Navigate to="/login" />}
      />
      <Route
        path="/coin"
        element={userInfo ? <Coin /> : <Navigate to="/login" />}
      />
      <Route
        path="/get-radishcharacter"
        element={userInfo ? <GetRadishCharacter /> : <Navigate to="/login" />}
      />
      <Route
        path="/loan-journey"
        element={userInfo ? <LoanJourney /> : <Navigate to="/login" />}
      />
      <Route
        path="/loan"
        element={userInfo ? <Loan /> : <Navigate to="/login" />}
      />
      <Route
        path="/loan-payment"
        element={userInfo ? <LoanPayment /> : <Navigate to="/login" />}
      />
      <Route
        path="/menu"
        element={userInfo ? <Menu /> : <Navigate to="/login" />}
      />
      <Route
        path="/moobti"
        element={userInfo ? <Moobti /> : <Navigate to="/login" />}
      />
      <Route
        path="/my-capsule"
        element={userInfo ? <MyCapsule /> : <Navigate to="/login" />}
      />
      <Route
        path="/user"
        element={userInfo ? <User /> : <Navigate to="/login" />}
      />
      <Route
        path="/password-change"
        element={userInfo ? <PasswordChange /> : <Navigate to="/login" />}
      />
      <Route
        path="/quiz"
        element={userInfo ? <Quiz /> : <Navigate to="/login" />}
      />
      <Route
        path="/spend"
        element={userInfo ? <Spend /> : <Navigate to="/login" />}
      />
      <Route
        path="/transcation-history"
        element={userInfo ? <TransactionHistory /> : <Navigate to="/login" />}
      />
      <Route
        path="/welcome"
        element={userInfo ? <Welcome /> : <Navigate to="/login" />}
      />
    </Routes>
=======
  // Header와 Footer를 표시하지 않을 경로 목록
  const noHeaderFooterRoutes = ['/loading'];

  const shouldShowHeaderFooter = !noHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowHeaderFooter && <Header />}
      <div style={{ minHeight: shouldShowHeaderFooter ? 'calc(100vh - 120px)' : '100vh', padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
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
          <Route path="/loan-journey" element={<LoanJourney />} />
          <Route path="/loan" element={<Loan />} />
          <Route path="/loan-payment" element={<LoanPayment />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/moobti" element={<Moobti />} />
          <Route path="/my-capsule" element={<MyCapsule />} />
          <Route path="/user" element={<User />} />
          <Route path="/password-change" element={<PasswordChange />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/spend" element={<Spend />} />
          <Route path="/transaction-history" element={<TransactionHistory />} />
          <Route path="/welcome" element={<Welcome />} />
        </Routes>
      </div>
      {shouldShowHeaderFooter && <Footer />}
    </>
>>>>>>> frontend/moobeing_app/src/Router.jsx
  );
}

export default Router;
