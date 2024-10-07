import { useState } from "react";
import styled from "styled-components";
import CoinInfo from "../components/Coin/CoinInfo";
import CoinList from "../components/Coin/CoinList";

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
  
  // 정렬 기준 변경 함수
  const handleSortSelect = (selectedSort) => {
    setSortCriteria(selectedSort); // 정렬 기준 업데이트
  };

  return (
    <Screen>
      <Container>
        <CoinInfo
          onSortSelect={handleSortSelect}
          sortCriteria={sortCriteria}
        />
        <CoinList 
          sortCriteria={sortCriteria} 
        />
      </Container>
    </Screen>
  );
};

export default CoinPage;
