import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LoanList from "./LoanList";

const Container = styled.div`
  background-color: #f5fded;
  height: 900px;
  width: 90%;
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10%;
  box-sizing: border-box;
`;

const SubHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5%;
`;

const SubTitle = styled.h2`
  margin: 0;
`;

const SortButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const SortButton = styled.p`
  margin: 0;
  cursor: pointer;
`;

const TotalLoan = styled.h1`
  margin-top: 0;
`;

const NavigateButton = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  cursor: pointer;
`;

function LoanHistory() {
  const [loans, setLoans] = useState([]);
  const [totalLoanAmount, setTotalLoanAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating API call to fetch loan data
    const fetchData = async () => {
      // Replace this with actual API call
      const response = {
        total_loan_amount: 3120100212,
        currency: "KRW",
        loan_details: [
          {
            user_deposit_id: 1,
            loan_type: "참대출",
            loan_amount: 1141824,
            bank_name: "Bank1",
            interest_rate: 23.342,
            bank_logo_url: "https://example.com/logos/bank1.png",
          },
          {
            user_deposit_id: 2,
            loan_type: "대출 그만 대출",
            loan_amount: 21241824,
            bank_name: "Bank1",
            interest_rate: 34.343,
            bank_logo_url: "https://example.com/logos/bank1.png",
          },
          {
            user_deposit_id: 3,
            loan_type: "자고 싶다 대출",
            loan_amount: 3141824,
            interest_rate: 12.342,
            bank_name: "Bank1",
            bank_logo_url: "https://example.com/logos/bank1.png",
          },
        ],
        filters: {
          sort_by: ["interest_rate", "loan_amount"],
        },
      };

      setLoans(response.loan_details);
      setTotalLoanAmount(response.total_loan_amount);
    };

    fetchData();
  }, []);

  const sortByInterestRate = () => {
    const sortedLoans = [...loans].sort(
      (a, b) => b.interest_rate - a.interest_rate
    );
    setLoans(sortedLoans);
  };

  const sortByLoanMoney = () => {
    const sortedLoans = [...loans].sort(
      (a, b) => b.loan_amount - a.loan_amount
    );
    setLoans(sortedLoans);
  };

  const navigateToTotalJourney = () => {
    navigate("/total-journey");
  };

  return (
    <Container>
      <SubHeader>
        <SubTitle>나의 대출현황</SubTitle>
        <SortButtonContainer>
          <SortButton onClick={sortByInterestRate}>금리순</SortButton>
          <SortButton onClick={sortByLoanMoney}>금액순</SortButton>
        </SortButtonContainer>
      </SubHeader>
      <TotalLoan>
        {totalLoanAmount.toLocaleString()} 원
        <NavigateButton onClick={navigateToTotalJourney}>&gt;</NavigateButton>
      </TotalLoan>
      <LoanList loans={loans} />
    </Container>
  );
}

export default LoanHistory;
