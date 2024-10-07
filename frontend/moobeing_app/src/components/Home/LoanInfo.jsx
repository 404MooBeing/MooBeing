import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import goToJourney from "../../assets/button/goToJourney.svg";
import { getLoanSum } from "../../apis/LoanApi";
import { getAccountBenefit } from "../../apis/AccountApi";

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
  font-size: 20px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 1;
  min-width: 0;
  flex-grow: 1;
  padding-bottom: 5px;

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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const LoanInfo = () => {
  // eslint-disable-next-line
  const [loanSum, setLoanSum] = useState(0);
  // eslint-disable-next-line
  const [accountBenefit, setAccountBenefit] = useState({});
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [loanList, setLoanList] = useState([]); // 초기값을 빈 배열로 설정
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAccountBenefitData();
  }, []); // 컴포넌트가 마운트될 때만 실행

  const fetchAccountBenefitData = async () => {
    setIsLoading(true);
    try {
      const response = await getAccountBenefit();
      setAccountBenefit(response);
      setRemainingBalance(response.accountLeftMoney || 0);
      setLoanList(Array.isArray(response.LoanList) ? response.LoanList : []); // 배열인지 확인 후 설정
    } catch (error) {
      console.error("계좌 혜택 데이터를 가져오는 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchLoanSum = async () => {
      try {
        const data = await getLoanSum();
        setLoanSum(data.sumLoanValue)
      } catch (error) {
        console.error("대출 총잔액 불러오기 실패:", error)
      }
    };

    fetchLoanSum();
  }, []);

  const navigate = useNavigate();

  const goToLoanPage = () => {
    navigate("/loan");
  };

  const goToLoanPaymentPage = () => {
    if (loanList.length > 0) {
      const firstLoan = loanList[0]; // 첫 번째 대출 상품을 선택
      navigate('/loan-payment', { state: { loanList, remainingBalance, selectedLoan: firstLoan } }); // loanList와 잔액, 첫 번째 대출 상품 전달
    } else {
      alert("대출 목록이 없습니다.");
    }
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }
 
  return (
    <Container>
      <SubHeader>
        <SubTitle>대출 현황</SubTitle>
        <NavigateButton onClick={goToLoanPage}>
          <NavigateImage src={goToJourney} alt="대출 현황 페이지로" />
        </NavigateButton>
      </SubHeader>
      <LoanBalance>
        {loanSum.toLocaleString()} 원
        <RepaymentButton onClick={goToLoanPaymentPage}>상환하러 가기</RepaymentButton>
      </LoanBalance>
    </Container>
  );
}

export default LoanInfo;