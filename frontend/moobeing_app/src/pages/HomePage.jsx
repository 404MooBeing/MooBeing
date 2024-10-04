import React from "react";
import styled from "styled-components";
import QuizPopup from "../components/Home/QuizPopup";
import CreditScore from "../components/Home/CreditScore";
import AccountInfo from "../components/Home/AccountsInfo";
import LoanInfo from "../components/Home/LoanInfo";
import MonthlyPayment from "../components/Home/MonthlyPayment";
import NextRadishInfo from "../components/Home/NextRadishInfo";


const Screen = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* 전체 화면을 차지 */
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow-y: auto; /* 내부 콘텐츠만 스크롤 가능 */
  box-sizing: border-box;
  padding-bottom: 150px; /* Footer 공간 확보 */
`;


const Home = () => {  
return (
    <Screen>
      <Container>
        <QuizPopup/>
        <AccountInfo />
        <LoanInfo />
        <MonthlyPayment />
        <CreditScore/>
        <NextRadishInfo />
      </Container>
    </Screen>
  );
};

export default Home;