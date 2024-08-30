import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LoanList from "./LoanList";
import goToJourney from "../../assets/button/goToJourney.svg";
import { getLoanSort } from "../../apis/LoanApi";
import basicRad from "../../assets/radishes/basicRad.svg"; // basicRad 이미지 임포트

const Container = styled.div`
  background-color: #f5fded;
  border-radius: 20px;
  height: 900px;
  width: 90%;
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 8% 5% 5% 8%;
  box-sizing: border-box;
  margin-top: 5%;
`;

const SubHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5%;
`;

const SubTitle = styled.div`
  margin: 0;
  font-size: 22px;
  font-weight: 700;

  @media (min-width: 600px) {
    font-size: 27px;
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
  width: 20px;
  height: 20px;
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
  width: 70px; /* 이미지 크기 조정 */
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

function LoanHistory() {
  const [loans, setLoans] = useState([]);
  const [totalLoanAmount, setTotalLoanAmount] = useState(0);
  const [activeSort, setActiveSort] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLoanSort("amount"); // API 호출
        setLoans(response.getMemberLoanDtoList); // 받아온 대출 정보 설정
        setTotalLoanAmount(response.totalLoanAmount || 0); // 총 대출 금액 설정
      } catch (error) {
        console.error("대출 정보 불러오기 실패:", error);
      }
    };

    fetchData();
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
    navigate("/total-journey");
  };

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
        {loans.length > 0 ? (
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

export default LoanHistory;
