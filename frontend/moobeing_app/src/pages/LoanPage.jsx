import React from "react";
import styled from "styled-components";
import LoanProductRecommend from "../components/Loan/LoanProductRecommend";
import LoansInfo from "../components/Loan/LoansInfo";
import MonthlyLoanPayment from "../components/Loan/MonthlyLoanPayment";
import LeftMoneyManage from "../components/Loan/LeftMoneyManage";
import LoanCoupon from "../components/Loan/LoanCoupon";
import HiddenRadish from "../components/Loan/HiddenRadish";

const Screen = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const ScrollableContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Rectangle = styled.div`
  width: 100%;
  height: 80px;
  background-color: #c0dda5;
  bottom: 120px;
  z-index: 1;
  padding-top: 130px;
`;

const LoanPage = () => {
  return (
    <Screen>
      <ScrollableContainer>
        <ContentWrapper>
          <LoanProductRecommend />
          <LoansInfo />
          <MonthlyLoanPayment />
          <LeftMoneyManage />
          <LoanCoupon />
          <HiddenRadish />
        </ContentWrapper>
        < Rectangle/>
      </ScrollableContainer>
    </Screen>
  );
};

export default LoanPage;
