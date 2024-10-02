import styled from "styled-components";
import PageTitle from "../components/Spend/PageTitle";
import Calendar from "../components/Spend/Calendar";
import { useEffect, useState } from "react";
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

const Spend = () => {
  const { selectedDate } = useDateStore();
  const { spendData, pieChartData, spendCategory, setSpendData, setPieChartData, setSpendCategory } = useSpendStore();
  const [viewMode, setViewMode] = useState("차트 보기"); // '차트 보기' or '캘린더 보기'

  useEffect(() => {
    const year = selectedDate.year();
    const month = selectedDate.month() + 1;

    const fetchSpendData = async () => {
      try {
        const data = await getSpendDataByMonth(year, month);
        setSpendData(data);
      } catch (error) {
        console.error("소비 데이터 가져오기 실패", error);
      }
    };

    const fetchPieChartData = async () => {
      try {
        const pieData = await getPieChart(year, month);
        setPieChartData(pieData);
      } catch (error) {
        console.error("파이 차트 가져오기 실패", error);
      }
    };

    const fetchSpendCategory = async () => {
      try {
        const spendCategoryData = await getSpendCategory(year, month);
        setSpendCategory(spendCategoryData);
      } catch (error) {
        console.error("월별 소비 카테고리별 조회 실패", error);
      }
    };

    fetchSpendData();
    fetchPieChartData();
    fetchSpendCategory();
  }, [selectedDate, setSpendData, setPieChartData, setSpendCategory]);

  return (
    <Screen>
      <Container>
        <PageTitle
          totalExpense={useSpendStore.getState().pieChartData.totalExpense || 0}
          setViewMode={setViewMode}
          viewMode={viewMode}
        />
        <style>{transitionStyles}</style>
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
      </Container>
    </Screen>
  );
};

export default Spend;