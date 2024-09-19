import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./routes/HomePage";
import Loading from "./routes/LoadingPage";
import LoanJourney from "./routes/LoanJourneyPage";
import Login from "./routes/LoginPage";
import SignUp from "./routes/SignUpPage";
import MyPage from "./routes/MyPage";
import RadishCollection from "./routes/RadishCollectionPage";
import Repayment from "./routes/RepaymentPage";
import Spend from "./routes/SpendPage";
import TotalJourney from "./routes/TotalJourneyPage";
import Welcome from "./routes/WelcomePage";
import Quiz from "./routes/QuizPage";
import QuizResult from "./routes/QuizResultPage";
import GetRadish from "./routes/GetRadishPage";
import useUserStore from "./store/UserStore";

function Router() {
  const { userInfo, isLoading, setLoading, setUserInfo, canAccessQuiz } =
    useUserStore((state) => ({
      userInfo: state.userInfo,
      isLoading: state.isLoading,
      setLoading: state.setLoading,
      setUserInfo: state.setUserInfo,
      canAccessQuiz: state.canAccessQuiz,
    }));

  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      setLoading(true);
      // 여기서 사용자 인증 및 정보를 가져오는 로직을 수행
      // 예를 들어, 토큰 유효성 검사 또는 사용자 정보 가져오기

      // 시뮬레이션을 위한 setTimeout
      setTimeout(() => {
        setLoading(false);
        setInitializing(false);
      }, 1000);
    };

    initializeApp();
  }, [setLoading]);

  if (initializing) {
    return <Loading isLoading={true} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={userInfo ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/loan-journey/:loanName"
          element={userInfo ? <LoanJourney /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!userInfo ? <Login /> : <Navigate to="/" />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/mypage"
          element={userInfo ? <MyPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/radish-collection"
          element={userInfo ? <RadishCollection /> : <Navigate to="/login" />}
        />
        <Route
          path="/repayment/:selectedLoanName"
          element={userInfo ? <Repayment /> : <Navigate to="/login" />}
        />
        <Route
          path="/spend"
          element={userInfo ? <Spend /> : <Navigate to="/login" />}
        />
        <Route
          path="/total-journey"
          element={userInfo ? <TotalJourney /> : <Navigate to="/login" />}
        />
        <Route
          path="/welcome"
          element={userInfo ? <Welcome /> : <Navigate to="/login" />}
        />
        <Route
          path="/quiz"
          element={
            userInfo && canAccessQuiz ? (
              <Quiz />
            ) : userInfo ? (
              <Navigate to="/" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/quiz/result/:quizId"
          element={userInfo ? <QuizResult /> : <Navigate to="/login" />}
        />
        <Route
          path="/get-radish"
          element={userInfo ? <GetRadish /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
