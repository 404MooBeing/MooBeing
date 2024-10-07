import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAccountBenefit } from "../../apis/AccountApi";

const Container = styled.div`
  background-color: #f5fded;
  width: 90%;
  max-width: 1200px;
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8% 8% 5% 8%;
  box-sizing: border-box;
  border-radius: 20px;
`;

const SubHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const SubTitle = styled.div`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const SubSubTitle = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 15px;
`;

const ContentDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;

const ContentTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const Content = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const PayButton = styled.button`
  background-color: #E0EED2;
  border: none;
  padding: 10px 20px;
  margin: 20px 0;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  color: #5E5054;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 효과 추가 */
  transition: all 0.2s ease-in-out; /* 버튼 클릭 시 애니메이션 추가 */
  font-family: 'mainFont';
`;

function LoanDescription({ loanDetail }) {
  const { loanName } = useParams(); // URL에서 loanName을 가져옴
  const navigate = useNavigate(); // useNavigate 훅 사용

  const [loanSum, setLoanSum] = useState(0);
  const [accountBenefit, setAccountBenefit] = useState({});
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [loanList, setLoanList] = useState([]); // 초기값을 빈 배열로 설정
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetchAccountBenefitData();
  }, []); // 컴포넌트가 마운트될 때만 실행
  
  const fetchAccountBenefitData = async () => {
    setIsLoading(true);
    try {
      const response = await getAccountBenefit();
      setAccountBenefit(response);
      setRemainingBalance(loanDetail.monthBalance || 0);
      setLoanList(Array.isArray(response.LoanList) ? response.LoanList : []); // 배열인지 확인 후 설정
    } catch (error) {
      console.error("계좌 혜택 데이터를 가져오는 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const goToLoanPaymentPage = () => {
    // loanList에서 loanName과 일치하는 대출 상품을 찾음
    const selectedLoan = loanList.find(loan => loan.loanName === loanName);

    if (selectedLoan) {
      navigate('/loan-payment', { state: { loanList, remainingBalance, selectedLoan } });
    } else {
      alert("해당 대출 상품을 찾을 수 없습니다.");
    }
  };

  return (
    <Container>
      <SubHeader>
        <SubTitle>{loanName}</SubTitle>
        <SubSubTitle>상세 정보</SubSubTitle>
      </SubHeader>
      <ContentDetail>
        <ContentTitle>남은 대출 금액</ContentTitle>
        <Content>
          {loanDetail.remainingBalance?.toLocaleString() || 0} 원
        </Content>
        
      </ContentDetail>
      <ContentDetail>
        <ContentTitle>이번달 상환금액</ContentTitle>
        <Content>{loanDetail.monthBalance?.toLocaleString() || 0} 원</Content>
      </ContentDetail>
      <PayButton onClick={goToLoanPaymentPage}>상환하러 가기</PayButton>
    </Container>
  );
}

export default LoanDescription;