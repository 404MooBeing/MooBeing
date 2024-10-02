import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import goToJourney from "../../assets/button/goToJourney.svg";
import { getLoanMonthly } from "../../apis/LoanApi.js";

const Container = styled.div`
  background-color: #f5fded;
  border-radius: 20px;
  height: 150px;
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
  justify-content: space-between;
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
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  margin-top: 10px;
  font-size: 20px;
  font-weight: 700;

  @media (min-width: 600px) {
    font-size: 25px;
  }
`;

const AmountWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const NavigateButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  font-weight: 700;
  display: flex;
  align-items: center;
  margin-left: 6px;
  padding: 0;
`;

const NavigateImage = styled.img`
  width: 20px;
  height: 20px;
`;

function MonthlyLoanPayment() {
  const [loanSum, setLoanSum] = useState({ monthlyLoanAmount: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMonthlyLoanData();
  }, []); // 빈 배열을 넣어 컴포넌트가 마운트될 때만 실행

  const fetchMonthlyLoanData = async () => {
    setIsLoading(true);
    try {
      const response = await getLoanMonthly();
      setLoanSum(response);
      console.log(loanSum)
    } catch (error) {
      console.error("월별 대출 정보 불러오기 실패:", error);
      setLoanSum({ monthlyLoanAmount: 0 });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpendPage = () => {
    navigate("/spend");
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <Container>
      <SubHeader>
        <SubTitle>이번 달 상환 예정 금액</SubTitle>
      </SubHeader>
      <LoanBalance>
        <AmountWrapper>
          {loanSum.monthlyLoanAmount.toLocaleString()} 원
        </AmountWrapper>
        <NavigateButton onClick={handleSpendPage}>
          <NavigateImage src={goToJourney} alt="여정지도" />
        </NavigateButton>
      </LoanBalance>
    </Container>
  );
}

export default MonthlyLoanPayment;
