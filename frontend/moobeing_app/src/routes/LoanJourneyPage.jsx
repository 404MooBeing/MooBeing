import styled from "styled-components";
import LoanGraph from "../components/LoanGraph/LoanGraph";
import LoanDescription from "../components/LoanGraph/LoanDescription";
import Footer from "../components/Fixed/Footer";
import Header from "../components/Fixed/Header";
import {
  getLoanMapByProductName,
  getYearByProductName,
  getProductLoanBuddy,
  getProductYearLoanBuddy,
  getLoanDetail,
} from "../apis/LoanApi";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "./LoadingPage";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  align-items: center;
  padding-bottom: 70px;
`;

const ScrollableContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 5% 0 0 0;
  box-sizing: border-box;
`;

const LoanJourney = () => {
  const { loanName } = useParams(); // URL에서 loanName 매개변수 가져오기
  const [loanData, setLoanData] = useState([]);
  const [loanPeerData, setLoanPeerData] = useState([]);
  const [yearJourneyData, setYearJourneyData] = useState([]);
  const [yearPeerData, setYearPeerData] = useState([]);
  const [loanDetail, setLoanDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 비동기 API 호출들을 병렬로 실행
        const [
          loanResponse,
          peerResponse,
          yearResponse,
          yearPeerResponse,
          detailResponse,
        ] = await Promise.all([
          getLoanMapByProductName(loanName), // loan 데이터 호출
          getProductLoanBuddy(loanName), // peer 데이터 호출
          getYearByProductName(loanName), // 연도별 loan 데이터 호출
          getProductYearLoanBuddy(loanName), // 연도별 peer 데이터 호출
          getLoanDetail(loanName), // loan 세부 데이터 호출
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
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [loanName]); // loanName이 변경될 때마다 useEffect 실행

  if (loading) return <Loading />; // 로딩 중일 때 표시할 내용

  return (
    <PageWrapper>
      <ScrollableContent>
        <Header />
        <Container>
          {loanData.length > 0 ? (
            <LoanGraph
              data={loanData}
              peerData={loanPeerData}
              yearData={yearJourneyData}
              yearPeerData={yearPeerData}
            />
          ) : (
            <div>데이터가 없습니다.</div>
          )}
          <LoanDescription loanDetail={loanDetail} />
        </Container>
      </ScrollableContent>
      <Footer />
    </PageWrapper>
  );
};

export default LoanJourney;
