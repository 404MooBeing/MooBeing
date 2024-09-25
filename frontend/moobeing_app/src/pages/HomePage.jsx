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
  height: 100vh;
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


const Home = () => {  
return (
    <Screen>
      <Container>
        <QuizPopup/>
        <AccountInfo/>
        <LoanInfo />
        <MonthlyPayment />
        <CreditScore/>
        <NextRadishInfo />
      </Container>
    </Screen>
  );
};

export default Home;