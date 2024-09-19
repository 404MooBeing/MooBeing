import { useState } from "react";
import styled from "styled-components";
import MyInfo from "../components/User/MyInfo";
import PasswordChange from "../components/User/PasswordChange";
import Header from "../components/Fixed/Header";
import Footer from "../components/Fixed/Footer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
`;

const MainContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const MyPage = () => {
  const [isPasswordChangeVisible, setIsPasswordChangeVisible] = useState(false);

  const handlePasswordChangeClick = () => {
    setIsPasswordChangeVisible(true);
  };

  return (
    <Container>
      <Header />
      <MainContent>
        {!isPasswordChangeVisible ? (
          <MyInfo onPasswordChangeClick={handlePasswordChangeClick} />
        ) : (
          <PasswordChange />
        )}
      </MainContent>
      <Footer />
    </Container>
  );
};

export default MyPage;
