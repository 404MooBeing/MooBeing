import { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import LoanList from "./LoanList";
import goToJourney from "../../assets/button/goToJourney.svg";
import { getLoanSort, getLoanPercent } from "../../apis/LoanApi.js";
import basicRad from "../../assets/radishes/basicRad.png"; // basicRad 이미지 임포트

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const Container = styled.div`
  background-color: #f5fded;
  border-radius: 20px;
  width: 90%;
  margin-bottom: 5%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 8%;
  box-sizing: border-box;
  animation: ${(props) =>
    props.$isclosing
      ? css`
          ${fadeOut} 0.5s ease-out forwards
        `
      : "none"};
  transition: opacity 0.5s ease-out;
`;

const SubHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const SubTitle = styled.div`
  margin: 0;
  font-size: 22px;
  font-weight: 700;

  @media (min-width: 600px) {
    font-size: 22px;
  }
`;

const SortButtonContainer = styled.div`
  display: flex;
  gap: 10px;

  @media (min-width: 600px) {
    gap: 20px;
  }
`;

const SortButton = styled.p`
  margin: 0;
  font-size: 12px;
  padding: 6px;
  cursor: pointer;
  background-color: ${(props) =>
    props.isactive === "true" ? "#348833" : "#e0eed2"};
  color: ${(props) => (props.isactive === "true" ? "#ffffff" : "#24272D")};
  border-radius: 10px;

  @media (min-width: 600px) {
    font-size: 14px;
    padding: 8px;
  }
`;

const TotalLoan = styled.div`
  margin-top: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 0;
  font-size: 20px;
  font-weight: 700;

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
  font-weight: 800;
`;

const NavigateImage = styled.img`
  width: 18px;
  height: 18px;
`;

const LoanListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const NoLoansContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const NoLoansImage = styled.img`
  width: 70px;
  height: auto;
  margin: 10px 0px;

  @media (min-width: 600px) {
    width: 75px;
  }
`;

const NoLoanText = styled.p`
  font-size: 12px;
  color: #24272d;
  margin: 0;
`;

function LoansInfo() {
  const [loans, setLoans] = useState([]);
  const [totalLoanAmount, setTotalLoanAmount] = useState(0);
  const [totalPercent, setTotalPercent] = useState(0); // totalPercent 상태 추가
  const [activeSort, setActiveSort] = useState("interest");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getLoanSort("rate");
        setLoans(response.getMemberLoanDtoList || []);
        setTotalLoanAmount(response.totalLoanAmount || 0);
      } catch (error) {
        console.error("대출 정보 불러오기 실패:", error);
        setLoans([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Loan Percent를 불러와서 totalPercent 설정
    const fetchLoanPercent = async () => {
      try {
        const response = await getLoanPercent();
        setTotalPercent(response.remainingPercent || 0); // percent 데이터를 받아서 상태에 저장
      } catch (error) {
        console.error("대출 퍼센트 불러오기 실패:", error);
      }
    };

    fetchLoanPercent();
  }, []);

  const sortByInterestRate = async () => {
    try {
      const response = await getLoanSort("rate");
      setLoans(response.getMemberLoanDtoList);
      setActiveSort("interest");
    } catch (error) {
      console.error("금리순 정렬 실패:", error);
    }
  };

  const sortByLoanMoney = async () => {
    try {
      const response = await getLoanSort("amount");
      setLoans(response.getMemberLoanDtoList);
      setActiveSort("amount");
    } catch (error) {
      console.error("금액순 정렬 실패:", error);
    }
  };

  const navigateToTotalJourney = () => {
    navigate("/total-journey", { state: { totalPercent } }); // totalPercent를 함께 전달
  };

  if (isLoading) {
    return <div></div>;
  }

  return (
    <Container>
      <SubHeader>
        <SubTitle>나의 대출현황</SubTitle>
        <SortButtonContainer>
          <SortButton
            onClick={sortByInterestRate}
            isactive={activeSort === "interest" ? "true" : "false"}
          >
            금리순
          </SortButton>
          <SortButton
            onClick={sortByLoanMoney}
            isactive={activeSort === "amount" ? "true" : "false"}
          >
            금액순
          </SortButton>
        </SortButtonContainer>
      </SubHeader>
      <TotalLoan>
        {totalLoanAmount?.toLocaleString()} 원
        <NavigateButton onClick={navigateToTotalJourney}>
          <NavigateImage src={goToJourney} alt="여정지도" />
        </NavigateButton>
      </TotalLoan>
      <LoanListContainer>
        {loans && loans.length > 0 ? (
          <LoanList loans={loans} />
        ) : (
          <NoLoansContainer>
            <NoLoansImage src={basicRad} alt="대출 없음" />
            <NoLoanText>대출 내역이 없습니다.</NoLoanText>
          </NoLoansContainer>
        )}
      </LoanListContainer>
    </Container>
  );
}

export default LoansInfo;
