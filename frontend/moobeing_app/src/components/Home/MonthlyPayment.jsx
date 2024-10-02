import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import goToJourney from "../../assets/button/goToJourney.svg";

// 반짝이는 애니메이션 정의
const sparkle = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const Container = styled.div`
  background-color: #f5fded;
  border-radius: 20px;
  width: 90%;
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const PaymentSum = styled.div`
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

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`

const ComparisonText = styled.div`
  color: #348833;
  padding: 5px 10px;
  font-size: 18px;
  border-radius: 10px;
  font-weight: 700;
  font-family: 'mainFont';
  animation: ${sparkle} 1.5s infinite; /* 1.5초마다 반복 */
`;

const MonthlyPayment = () => {
  // eslint-disable-next-line
  const [paymentSum, setLoanSum] = useState({ monthlyPaymentAmount: 300000 });
  // eslint-disable-next-line
  const [compareText, setCompareText] = useState('지난 달보다 3,022원 더 썼어요!')

  const navigate = useNavigate();

  const goToLoanSpendPage = () => {
    navigate("/spend");
  };

  return (
    <Container>
      <SubHeader>
        <SubTitle>이번 달 지출</SubTitle>
        <NavigateButton onClick={goToLoanSpendPage}>
          <NavigateImage src={goToJourney} alt="소비 분석 페이지로" />
        </NavigateButton>
      </SubHeader>
      <PaymentSum>
        {paymentSum.monthlyPaymentAmount.toLocaleString()} 원
      </PaymentSum>
      <TextContainer>
        <ComparisonText>"{compareText}"</ComparisonText>
      </TextContainer>
    </Container>
  );
}

export default MonthlyPayment;
