import { useState, useEffect } from "react";
import styled from "styled-components";
import CoinInfo from "../components/Coin/CoinInfo";
import CoinList from "../components/Coin/CoinList";
import { getCoinHistory } from "../apis/CoinApi";

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

const CoinPage = () => {

   // 조회 조건 관리
  const [sortCriteria, setSortCriteria] = useState({ period: "1개월", type: "전체" });
  const [coinList, setCoinList] = useState([
    // 하나은행 일반 계좌
    {date: "2024.09.20 (금)", title: "무 뽑기", time: "12:30", amount: 4000, remainBalance: "8000" },
    {date: "2024.09.20 (금)", title: "출석체크", time: "10:55", amount: 1000, remainBalance: "9000" },
    {date: "2024.09.19 (목)", title: "출석체크", time: "18:15", amount: 1000, remainBalance: "4000" },
    {date: "2024.09.19 (목)", title: "무 뽑기", time: "14:45", amount: 2000, remainBalance: "3000" },
    {date: "2024.09.18 (수)", title: "출석체크", time: "08:25", amount: 1000, remainBalance: "1000" },
    {date: "2024.09.18 (수)", title: "환전", time: "20:10", amount: -21500, remainBalance: "0" },
  ]);
  
  // 정렬 기준 변경 함수
  const handleSortSelect = (selectedSort) => {
    setSortCriteria(selectedSort); // 정렬 기준 업데이트
    // fetchData();
  };

  const fetchData = async () => {
    try {
       // Zustand 스토어에 저장
       console.log(sortCriteria)
      const requestBody = {
        months: sortCriteria.period,
        transactionType: sortCriteria.type,
        page: 1
      }
      const data = await getCoinHistory(requestBody)
      setCoinList(data);
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
    }
  };

  useEffect(() => {
    
    fetchData();
  }, [setCoinList]);

  return (
    <Screen>
      <Container>
        <CoinInfo
          onSortSelect={handleSortSelect}
          sortCriteria={sortCriteria}
        />
        <CoinList 
          sortCriteria={sortCriteria} 
          coinList={coinList}
        />
      </Container>
    </Screen>
  );
};

export default CoinPage;
