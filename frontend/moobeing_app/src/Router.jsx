import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/HomePage";
import Loading from "./pages/LoadingPage";

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
          path="/loading"
          element={userInfo ? <Loading /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={userInfo ? <Login /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={userInfo ? <SignUp /> : <Navigate to="/login" />}
        />
        <Route
          path="/"
          element={userInfo ? <Home /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
