import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import goToJourney from "../../assets/button/goToJourney.svg";

const Container = styled.div`
  background-color: #f5fded;
  border-radius: 20px;
  width: 90%;
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 8%; /* 내부 여백 추가 */
  box-sizing: border-box;
`;

const SubHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
`;

const SubTitle = styled.div`
  margin: 0;
  font-size: 22px;
  font-weight: 700;

  @media (min-width: 600px) {
    font-size: 27px;
  }
`;

const LoanBalance = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  margin-top: 10px;
  font-size: 20px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 2px 10px;
  flex-shrink: 1;
  min-width: 0;
  flex-grow: 1;

  @media (min-width: 600px) {
    font-size: 25px;
  }
`;

const NavigateButton = styled.button`
  margin-left: 5px;
  margin-top: 4px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  font-weight: 700;
`;

const NavigateImage = styled.img`
  width: 20px;
  height: 20px;
`;

const RepaymentButton = styled.button`
  background-color: #E0EED2;
  color: #5E5054;
  border: none;
  padding: 10px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  font-family: 'mainFont';
`

function LoanInfo() {
  const [loanSum, setLoanSum] = useState({ monthlyLoanAmount: 300000 });

  const navigate = useNavigate();

  const goToLoanPage = () => {
    navigate("/loan");
  };

  const goToLoanPaymentPage = () => {
    navigate("/loan-payment");
  };
 
  return (
    <Container>
      <SubHeader>
        <SubTitle>대출 현황</SubTitle>
        <NavigateButton onClick={goToLoanPage}>
          <NavigateImage src={goToJourney} alt="대출 현황 페이지로" />
        </NavigateButton>
      </SubHeader>
      <LoanBalance>
        {loanSum.monthlyLoanAmount.toLocaleString()} 원
        <RepaymentButton onClick={goToLoanPaymentPage}>상환하러 가기</RepaymentButton>
      </LoanBalance>
    </Container>
  );
}

export default LoanInfo;
