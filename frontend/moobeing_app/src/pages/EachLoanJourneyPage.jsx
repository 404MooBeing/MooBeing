import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  getLoanMapByProductName,
  getYearByProductName,
  getProductLoanBuddy,
  getProductYearLoanBuddy,
  getLoanDetail,
  getEachLoanPercent,
} from "../apis/LoanApi";
import { useParams } from "react-router-dom";
import Loading from "./LoadingPage";
import EachLoanProductInfo from "../components/LoanJourney/EachLoanProductInfo";
import EachLoanJourneyGraph from "../components/LoanJourney/EachLoanJourneyGraph";
import PercentBar from "../components/LoanJourney/PercentBar";

const Screen = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* 전체 화면을 차지 */
  width: 100%;
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

const EachLoanJourney = () => {
  const { loanName } = useParams(); // URL에서 loanName 매개변수 가져오기
  const [loanData, setLoanData] = useState([]);
  const [loanPeerData, setLoanPeerData] = useState([]);
  const [yearJourneyData, setYearJourneyData] = useState([]);
  const [yearPeerData, setYearPeerData] = useState([]);
  const [loanDetail, setLoanDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loanPercent, setLoanPercent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 비동기 API 호출들을 병렬로 실행
        const [
          loanResponse,
          peerResponse,
          yearResponse,
          yearPeerResponse,
          detailResponse,
          percentResponse,
        ] = await Promise.all([
          getLoanMapByProductName(loanName), // loan 데이터 호출
          getProductLoanBuddy(loanName), // peer 데이터 호출
          getYearByProductName(loanName), // 연도별 loan 데이터 호출
          getProductYearLoanBuddy(loanName), // 연도별 peer 데이터 호출
          getLoanDetail(loanName), // loan 세부 데이터 호출
          getEachLoanPercent(loanName), // loan 퍼센트 데이터 호출
        ]);

        const { getAllJourneyList: allJourneyList } = loanResponse;
        const { getAllJourneyList: peerJourneyList } = peerResponse;
        const { getAllJourneyList: yearJourneyList } = yearResponse;
        const { getAllJourneyList: yearPeerJourneyList } = yearPeerResponse;

        // 상태 업데이트
        setLoanData(allJourneyList);
        setLoanPeerData(peerJourneyList);
        setYearJourneyData(yearJourneyList);
        setYearPeerData(yearPeerJourneyList);
        setLoanDetail(detailResponse);
        setLoanPercent(percentResponse.remainingPercent); // loanPercent 상태 업데이트
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [loanName]); // loanName이 변경될 때마다 useEffect 실행

  if (loading) return <Loading />; // 로딩 중일 때 표시할 내용

  return (
    <Screen>
      <Container>
        {loanData.length > 0 ? (
          <>
            <EachLoanJourneyGraph
              data={loanData}
              peerData={loanPeerData}
              yearData={yearJourneyData}
              yearPeerData={yearPeerData}
            />
            <PercentBar percent={loanPercent}/>
            <EachLoanProductInfo loanDetail={loanDetail}/>
          </>
        ) : (
            <div>데이터가 없습니다.</div>
        )}
      </Container>
    </Screen>
  );
};

export default EachLoanJourney;