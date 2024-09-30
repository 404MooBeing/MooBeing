import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Container = styled.div`
  background-color: #f5fded;
  min-height: 280px;
  width: 90%;
  max-width: 1200px;
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8%;
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
  padding: 10px 20px;
  width: 130px;
  background-color: #c0dda6;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 13px;
  margin-top: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #b5c99a;
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }

  &:active {
    background-color: #a9b98e;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(0);
  }
  @media (min-width: 600px) {
    width: 150px;
    font-size: 16px;
  }
`;

function LoanDescription() {
  const { loanName } = useParams();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  // 하드코딩된 loanDetail 데이터
  const loanDetail = {
    monthBalance: 5000000, // 남은 대출 금액
    remainingBalance: 300000, // 이번달 상환금액
  };

  // '상환하러 가기' 버튼 클릭 시 호출되는 함수
  const handlePayment = () => {
    if (loanName) {
      navigate(`/loan-payment/${loanName}`); // 선택된 대출과 함께 이동
    } else {
      setShowAlert(true); // 커스텀 경고창 표시
      setTimeout(() => setShowAlert(false), 2000); // 2초 후 경고창 숨기기
    }
  };

  return (
    <Container>
      <SubHeader>
        <SubTitle>{loanName || "대출명"}</SubTitle>
        <SubSubTitle>상세 정보</SubSubTitle>
      </SubHeader>
      <ContentDetail>
        <ContentTitle>남은 대출 금액</ContentTitle>
        <Content>{loanDetail.monthBalance.toLocaleString()} 원</Content>
      </ContentDetail>
      <ContentDetail>
        <ContentTitle>이번달 상환금액</ContentTitle>
        <Content>{loanDetail.remainingBalance.toLocaleString()} 원</Content>
      </ContentDetail>
      <PayButton onClick={handlePayment}>상환하러 가기</PayButton>
      {showAlert && <div>경고: 대출 이름이 없습니다.</div>}
    </Container>
  );
}

export default LoanDescription;
