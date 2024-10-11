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
import { SyncLoader } from "react-spinners";
import dayjs from "dayjs";

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
  width: 95%;
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
`;

const Spend = () => {
  const { selectedDate, setSelectedDate } = useDateStore();
  const { spendData, spendCategory, pieChartData, setSpendData, setPieChartData, setSpendCategory } = useSpendStore();
  const [viewMode, setViewMode] = useState("캘린더 보기");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasFetchedData, setHasFetchedData] = useState(false);

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  // 이전 연도와 달을 상태로 관리
  const [prevYear, setPrevYear] = useState(year);
  const [prevMonth, setPrevMonth] = useState(month);

  // selectedDate가 변경될 때 year와 month 업데이트
  useEffect(() => {
    if (selectedDate) {
      const newYear = selectedDate.year();
      const newMonth = selectedDate.month() + 1; // month는 0-based이므로 1 더함

      // 연도 또는 달이 변경될 때만 업데이트
      if (newYear !== year || newMonth !== month) {
        setYear(newYear);
        setMonth(newMonth);
        setHasFetchedData(false); // 새로 요청할 때마다 상태 리셋
      }
    }
  }, [selectedDate, year, month]);

  // 여기에서 페이지를 떠날 때 날짜를 초기화
  useEffect(() => {
    // 컴포넌트가 언마운트될 때 날짜를 현재 날짜(dayjs())로 초기화
    return () => {
      setSelectedDate(dayjs()); // 페이지를 떠날 때 날짜 초기화
    };
  }, [setSelectedDate]);

  const dummySpendData = spendData;
  const dummyPieChartData = pieChartData;
  const dummySpendCategory = spendCategory;

  const fetchSpendData = useCallback(async (year, month) => {
    try {
      const data = await getSpendDataByMonth(year, month);
      setSpendData(data);
    } catch (error) {
      setError("소비 데이터 가져오기 실패");
      setSpendData(dummySpendData); 
    }
  }, [setSpendData, dummySpendData]);
  
  const fetchPieChartData = useCallback(async (year, month) => {
    try {
      const pieData = await getPieChart(year, month);
      setPieChartData(pieData);
    } catch (error) {
      setError("파이 차트 가져오기 실패");
      setPieChartData(dummyPieChartData);  
    }
  }, [setPieChartData, dummyPieChartData]);

  const fetchSpendCategory = useCallback(async (year, month) => {
    try {
      const spendCategoryData = await getSpendCategory(year, month);
      setSpendCategory(spendCategoryData);
    } catch (error) {
      setError("소비 데이터 조회 실패");
      setSpendCategory(dummySpendCategory);  
    }
  }, [setSpendCategory, dummySpendCategory]);

  useEffect(() => {
    // 에러가 발생했거나 데이터가 이미 로드되었으면 중단
    if (error || isLoading || hasFetchedData) return;
  
    setIsLoading(true);
    setError(null);
  
    const fetchData = async () => {
      try {
        await Promise.all([
          fetchSpendData(year, month),
          fetchPieChartData(year, month),
          fetchSpendCategory(year, month),
        ]);
        setHasFetchedData(true); // 데이터 요청 후 다시 상태를 true로 설정
      } catch (err) {
        setError("데이터 로드 중 오류 발생");
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  
    // 연도와 달이 변경되면 prevYear와 prevMonth를 업데이트
    setPrevYear(year);
    setPrevMonth(month);
  }, [year, month, fetchSpendData, fetchPieChartData, fetchSpendCategory, error, isLoading, hasFetchedData, prevYear, prevMonth]);

  return (
    <Screen>
      <Container>
        <PageTitle
          totalExpense={pieChartData.totalExpense || 0}
          setViewMode={setViewMode}
          viewMode={viewMode}
        />
        <style>{transitionStyles}</style>
        {isLoading ? (
          <LoadingOrError>
            <SyncLoader color="#348833" size={8} />
          </LoadingOrError>
        ) : (
          <TransitionGroup component={null}>
            {viewMode === "캘린더 보기" ? (
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