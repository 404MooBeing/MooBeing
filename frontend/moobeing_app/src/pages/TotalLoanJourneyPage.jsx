import { useState, useEffect } from "react";
import PercentBar from "../components/LoanJourney/PercentBar";
import styled from "styled-components";
import TotalLoanJourneyGraph from "../components/LoanJourney/TotalLoanJourneyGraph";
import { useLocation } from "react-router-dom"; // useLocation 훅 추가
import {
  getAllLoanMapByMonth,
  getAllLoanBuddy,
  getAllLoanMapByYear,
  getYearLoanBuddy,
} from "../apis/LoanApi";
import Loading from "./LoadingPage";

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

const TotalLoanJourney = () => {
  const location = useLocation(); // location 객체로부터 상태 값을 가져옴
  const totalPercent = location.state?.totalPercent || 0; // totalPercent 값을 가져오거나 기본값 0 설정

  const [journeyData, setJourneyData] = useState([]);
  const [yearJourneyData, setYearJourneyData] = useState([]);
  const [peerData, setPeerData] = useState([]);
  const [yearPeerData, setYearPeerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [
          loanResponse,
          buddyResponse,
          yearJourneyResponse,
          yearBuddyResponse,
        ] = await Promise.all([
          getAllLoanMapByMonth(),
          getAllLoanBuddy(),
          getAllLoanMapByYear(),
          getYearLoanBuddy(),
        ]);

        const { getAllJourneyList: journeyListData } = loanResponse;
        const { getAllJourneyList: peerListData } = buddyResponse;
        const { getAllJourneyList: yearJourneyData } = yearJourneyResponse;
        const { getAllJourneyList: yearPeerData } = yearBuddyResponse;

        setJourneyData(journeyListData);
        setPeerData(peerListData);
        setYearJourneyData(yearJourneyData);
        setYearPeerData(yearPeerData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;

  return (
    <Screen>
      <Container>
        {journeyData.length > 0 ? (
          <TotalLoanJourneyGraph
            data={journeyData}
            peerData={peerData}
            yearData={yearJourneyData}
            yearPeerData={yearPeerData}
          />
        ) : (
          <div>데이터가 없습니다.</div>
        )}
        {/* PercentBar에 totalPercent 값을 전달 */}
        <PercentBar percent={totalPercent} />
      </Container>
    </Screen>
  );
};

export default TotalLoanJourney;
