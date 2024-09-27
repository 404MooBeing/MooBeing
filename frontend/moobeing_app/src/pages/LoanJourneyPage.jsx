import { useState } from "react";
import PercentBar from "../components/LoanJourney/PercentBar";
import styled from "styled-components";
import LoanJourneyGraph from "../components/LoanJourney/LoanJourneyGraph";
import EachLoanProductInfo from "../components/LoanJourney/EachLoanProductInfo"

const Screen = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* 전체 화면을 차지 */
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow-y: auto; /* 내부 콘텐츠만 스크롤 가능 */
  box-sizing: border-box;
  padding-bottom: 150px; /* Footer 공간 확보 */
  padding-top: 20px;
`;

const LoanJourney = () => {

  const dummyLoanData = [
    { year: 2020, month: 1, loanBalance: 1500000 },
    { year: 2020, month: 2, loanBalance: 1450000 },
    { year: 2020, month: 3, loanBalance: 1400000 },
    { year: 2020, month: 4, loanBalance: 1350000 },
    { year: 2020, month: 5, loanBalance: 1300000 },
  ];

  const dummyLoanPeerData = [
    { year: 2020, month: 1, loanBalance: 1600000 },
    { year: 2020, month: 2, loanBalance: 1550000 },
    { year: 2020, month: 3, loanBalance: 1500000 },
    { year: 2020, month: 4, loanBalance: 1450000 },
    { year: 2020, month: 5, loanBalance: 1400000 },
  ];

  const dummyYearJourneyData = [
    { year: 2020, loanBalance: 1500000 },
    { year: 2021, loanBalance: 1400000 },
    { year: 2022, loanBalance: 1300000 },
    { year: 2023, loanBalance: 1200000 },
    { year: 2024, loanBalance: 1100000 },
  ];

  const dummyYearPeerData = [
    { year: 2020, loanBalance: 1550000 },
    { year: 2021, loanBalance: 1450000 },
    { year: 2022, loanBalance: 1350000 },
    { year: 2023, loanBalance: 1250000 },
    { year: 2024, loanBalance: 1150000 },
  ];

  const [loanData, setLoanData] = useState(dummyLoanData);
  const [loanPeerData, setLoanPeerData] = useState(dummyLoanPeerData);
  const [yearJourneyData, setYearJourneyData] = useState(dummyYearJourneyData);
  const [yearPeerData, setYearPeerData] = useState(dummyYearPeerData);

  return (
    <Screen>
      <Container>
        <LoanJourneyGraph
          data={loanData}
          peerData={loanPeerData}
          yearData={yearJourneyData}
          yearPeerData={yearPeerData}
        />
        <PercentBar/>
        <EachLoanProductInfo/>
      </Container>
    </Screen>
  );
};

export default LoanJourney;