import styled from "styled-components";
import PageTitle from "../components/Spend/PageTitle";
import Calendar from "../components/Spend/Calendar";
import { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import DailyCategory from "../components/Spend/DailyCategory";
import PieGraph from "../components/Spend/PieGraph";
import MonthlyCategory from "../components/Spend/MonthlyCategory";

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

const dummySpendData = [
	{
		date: '2024-09-01',
		totalSpend: 74500,
		history: [
			{ id: 1, title: "스타벅스 커피", categoryName: "식비", price: 5000 },
			{ id: 2, title: "헬스장 이용료", categoryName: "건강", price: 60000 },
			{ id: 3, title: "넷플릭스 구독", categoryName: "문화", price: 9500 },
		],
	},
	{
		date: '2024-09-02',
		totalSpend: 24200,
		history: [
			{ id: 4, title: "버스 교통비", categoryName: "교통", price: 1200 },
			{ id: 5, title: "롯데마트 쇼핑", categoryName: "유흥", price: 23000 },
		],
	},
	{
		date: '2024-09-03',
		totalSpend: 168000,
		history: [
			{ id: 6, title: "대출 상환", categoryName: "대출", price: 150000 },
			{ id: 7, title: "도서 구매", categoryName: "문화", price: 18000 },
		],
	},
	{
		date: '2024-09-04',
		totalSpend: 8500,
		history: [
			{ id: 8, title: "식당 점심식사", categoryName: "식비", price: 8500 },
		],
	},
];

const graphData = {
  totalExpense: 440000,
  getPieChartList: [
    {
      id: "식비",
      label: "식비",
      value: 50000,
      color: "hsl(190, 70%, 50%)"
    },
    {
      id: "대출",
      label: "대출",
      value: 200000,
      color: "hsl(250, 70%, 50%)"
    },
    {
      id: "문화",
      label: "문화",
      value: 15000,
      color: "hsl(234, 70%, 50%)"
    },
    {
      id: "유흥",
      label: "유흥",
      value: 80000,
      color: "hsl(198, 70%, 50%)"
    },
    {
      id: "교통",
      label: "교통",
      value: 25000,
      color: "hsl(117, 70%, 50%)"
    },
    {
      id: "건강",
      label: "건강",
      value: 70000,
      color: "hsl(61, 96%, 81%)"
    }
  ],
  getCategoryList: [
    {
      label: "식비",
      percent: 11.36,
      amount: 50000
    },
    {
      label: "대출",
      percent: 45.45,
      amount: 200000
    },
    {
      label: "문화",
      percent: 3.41,
      amount: 15000
    },
    {
      label: "유흥",
      percent: 18.18,
      amount: 80000
    },
    {
      label: "교통",
      percent: 5.68,
      amount: 25000
    },
    {
      label: "건강",
      percent: 15.91,
      amount: 70000
    }
  ]
};


const Spend = () => {
	const [spendData, setSpendData] = useState([]);
	const [viewMode, setViewMode] = useState("차트 보기"); // '차트 보기' or '캘린더 보기'

  useEffect(() => {
    // 더미 데이터를 사용해 history를 설정
    setSpendData(dummySpendData);
  }, []);

	return (
		<Screen>
			<Container>
					<PageTitle
						totalExpense={graphData.totalExpense}
						setViewMode={setViewMode}
						viewMode={viewMode}
					/>
					<style>{transitionStyles}</style>
					<TransitionGroup component={null}>
						{viewMode === "차트 보기" ? (
							<CSSTransition key="calendar" timeout={500} classNames="fade">
							<CalendarWrapper>
								<Calendar spendData={spendData}/>
								<DailyCategory spendData={spendData} />
							</CalendarWrapper>
							</CSSTransition>
						) : (
							<CSSTransition key="graph" timeout={500} classNames="fade">
								<PieWrapper>
									<PieGraph data={graphData.getPieChartList} />
									<MonthlyCategory data={graphData.getCategoryList} /> 
								</PieWrapper>
							</CSSTransition>
						)}
					</TransitionGroup>
			</Container>
		</Screen>
  );
};

export default Spend;