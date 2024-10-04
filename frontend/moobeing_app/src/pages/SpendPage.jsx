import styled from "styled-components";
import PageTitle from "../components/Spend/PageTitle";
import Calendar from "../components/Spend/Calendar";
import { useEffect, useState, useCallback } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import DailyCategory from "../components/Spend/DailyCategory";
import PieGraph from "../components/Spend/PieGraph";
import MonthlyCategory from "../components/Spend/MonthlyCategory";
import { getSpendDataByMonth, getPieChart, getSpendCategory } from "../apis/SpendApi";
import useDateStore from "../store/DateStore";
import useSpendStore from "../store/SpendStore";

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
`;

const CalendarWrapper = styled.div`
  width: 90%;
  padding: 20px 20px 0px 20px;
  box-sizing: border-box;
`;

const PieWrapper = styled.div`
  width: 90%;
  padding: 20px;
  box-sizing: border-box;
`;

const transitionStyles = `
  .fade-enter {
    opacity: 0;
    transform: translateY(20px);
  }
  .fade-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 500ms, transform 500ms;
  }
  .fade-exit {
    opacity: 1;
    transform: translateY(0);
  }
  .fade-exit-active {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 500ms, transform 500ms;
  }
`;

const LoadingOrError = styled.div`
  margin-top: 30%;
`

const Spend = () => {
  const { selectedDate } = useDateStore();
  const { spendData, pieChartData, spendCategory, setSpendData, setPieChartData, setSpendCategory } = useSpendStore();
  const [viewMode, setViewMode] = useState("차트 보기");
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const [error, setError] = useState(null); // 에러 상태 추가

  // API 호출 함수들 최적화
  const fetchSpendData = useCallback(async (year, month) => {
    try {
      const data = await getSpendDataByMonth(year, month);
      setSpendData(data);
    } catch (error) {
      setError("소비 데이터 가져오기 실패");
      console.error(error);
    }
  }, [setSpendData]);

  const fetchPieChartData = useCallback(async (year, month) => {
    try {
      const pieData = await getPieChart(year, month);
      setPieChartData(pieData);
    } catch (error) {
      setError("파이 차트 가져오기 실패");
      console.error(error);
    }
  }, [setPieChartData]);

  const fetchSpendCategory = useCallback(async (year, month) => {
    try {
      const spendCategoryData = await getSpendCategory(year, month);
      setSpendCategory(spendCategoryData);
    } catch (error) {
      setError("소비 데이터 조회 실패");
      console.error(error);
    }
  }, [setSpendCategory]);

  useEffect(() => {
    const year = selectedDate.year();
    const month = selectedDate.month() + 1;

    // 로딩 상태 시작
    setIsLoading(true);
    setError(null);

    // API 호출 실행
    Promise.all([
      fetchSpendData(year, month),
      fetchPieChartData(year, month),
      fetchSpendCategory(year, month),
    ])
      .finally(() => setIsLoading(false)); // 로딩 상태 종료
  }, [selectedDate, fetchSpendData, fetchPieChartData, fetchSpendCategory]);

  return (
    <Screen>
      <Container>
        <PageTitle
          totalExpense={useSpendStore.getState().pieChartData.totalExpense || 0}
          setViewMode={setViewMode}
          viewMode={viewMode}
        />
        <style>{transitionStyles}</style>
        {isLoading ? (
          <LoadingOrError>로딩 중</LoadingOrError>
        ) : error ? (
          <LoadingOrError>{error}</LoadingOrError>
        ) : (
          <TransitionGroup component={null}>
            {viewMode === "차트 보기" ? (
              <CSSTransition key="calendar" timeout={500} classNames="fade">
                <CalendarWrapper>
                  <Calendar />
                  <DailyCategory />
                </CalendarWrapper>
              </CSSTransition>
            ) : (
              <CSSTransition key="graph" timeout={500} classNames="fade">
                <PieWrapper>
                  <PieGraph />
                  <MonthlyCategory />
                </PieWrapper>
              </CSSTransition>
            )}
          </TransitionGroup>
        )}
      </Container>
    </Screen>
  );
};

export default Spend;