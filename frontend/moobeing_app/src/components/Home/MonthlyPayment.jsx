import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import goToJourney from "../../assets/button/goToJourney.svg";
import { getSpendSummary } from "../../apis/AccountApi";

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
  color: ${(props) => (props.isMorePaid ? '#348833' : '#FF5A0E')}; /* true면 초록색, false면 빨간색 */
  padding: 5px 10px;
  font-size: 15px;
  font-weight: 600;
  font-family: 'mainFont';
  box-shadow: inset 0 -10px 0 #E0EED2;
`;

const MonthlyPayment = () => {
  const [paymentSum, setPaymentSum] = useState({ monthlyPaymentAmount: 0 });
  const [compareText, setCompareText] = useState('지난 달 지출내역이 없습니다')
  const [isMorePaid, setIsMorePaid] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpendSummary = async () => {
      try {
        const summary = await getSpendSummary();
        setPaymentSum({ monthlyPaymentAmount: summary.monthlyPaymentAmount });
        setCompareText(summary.compareText);
        setIsMorePaid(summary.isMorePaid);
      } catch (error) {
        console.error("소비 요약 데이터를 가져오지 못했습니다.", error);
      }
    };

    fetchSpendSummary();
  }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행됨

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
        <ComparisonText isMorePaid={isMorePaid}>{compareText}</ComparisonText>
      </TextContainer>
    </Container>
  );
}

export default MonthlyPayment;