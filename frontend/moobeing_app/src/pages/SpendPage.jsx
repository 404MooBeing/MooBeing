import { useState, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import SubHeader from "../components/Spend/SubHeader";
import PaymentHistory from "../components/Spend/PaymentHistory";
import Calendar from "../components/Spend/Calendar";
import PieGraph from "../components/Spend/PieGraph";
import PaymentCategory from "../components/Spend/PaymentCategory";
import Footer from "../components/Fixed/Footer";
import Header from "../components/Fixed/Header";
import { getPieChart, getSpendDataByDay } from "../apis/SpendApi"; // API 함수 가져오기

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const ScrollableContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  padding-bottom: 70px;
`;

const CalendarWrapper = styled.div`
  width: 100%;
  padding: 20px 20px 0px 20px;
  box-sizing: border-box;
`;

const PieWrapper = styled.div`
  width: 100%;
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
  const [pieData, setPieData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [totalExpense, setTotalExpense] = useState(0);
  const [monthlySpendData, setMonthlySpendData] = useState([]);
  const [dailyHistory, setDailyHistory] = useState([]);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleAnalyzeClick = () => {
    setShowAnalysis((prevShowAnalysis) => !prevShowAnalysis);
  };

  useEffect(() => {
    const fetchData = async () => {
      const year = selectedDate.year();
      const month = selectedDate.month() + 1;

      try {
        // Promise.all을 사용하여 두 개의 API 호출을 병렬로 수행
        const [pieDataResponse, spendDataResponse] = await Promise.all([
          getPieChart(year, month),
          getSpendDataByDay(year, month),
        ]);

        // 파이차트 데이터 설정
        setPieData(pieDataResponse.getPieChartList);
        setTotalExpense(pieDataResponse.totalExpense);
        setCategoryData(pieDataResponse.getCategoryList);

        // 지출 데이터 설정
        setMonthlySpendData(spendDataResponse);

        // 선택된 날짜의 지출 내역 설정
        const dayData = spendDataResponse.find(
          (data) => data.date === selectedDate.format("YYYY-MM-DD")
        );
        setDailyHistory(dayData ? dayData.history : []);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
        setDailyHistory([]);
      }
    };

    fetchData();
  }, [selectedDate]);

  return (
    <PageWrapper>
      <Header />
      <ScrollableContent>
        <SubHeader
          month={selectedDate.format("M월")}
          onAnalyzeClick={handleAnalyzeClick}
          totalExpense={totalExpense}
        />
        <style>{transitionStyles}</style>
        <TransitionGroup component={null}>
          {!showAnalysis ? (
            <CSSTransition key="calendar" classNames="fade" timeout={300}>
              <>
                <CalendarWrapper>
                  <Calendar
                    selectedDate={selectedDate}
                    onDateChange={handleDateChange}
                    monthlySpendData={monthlySpendData}
                  />
                </CalendarWrapper>
                <PaymentHistory
                  date={selectedDate.format("M월 D일")}
                  history={dailyHistory}
                />
              </>
            </CSSTransition>
          ) : (
            <CSSTransition key="analysis" classNames="fade" timeout={300}>
              <>
                <PieWrapper>
                  <PieGraph data={pieData} width="100%" height={300} />
                </PieWrapper>
                <PaymentCategory data={categoryData} />
              </>
            </CSSTransition>
          )}
        </TransitionGroup>
      </ScrollableContent>
      <Footer />
    </PageWrapper>
  );
};

export default Spend;
