import { useLocation } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import TransactionInfo from "../components/TransactionHistory/TransactionInfo";
import TransactionList from "../components/TransactionHistory/TransactionList";

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

const TransactionHistory = () => {
  const location = useLocation();
  const { account: initialAccount, accounts } = location.state || {};

  // account 상태를 상위 컴포넌트에서 관리
  const [account, setAccount] = useState(initialAccount || {});

  // 계좌 변경 함수 (TransactionInfo에서 호출)
  const handleAccountChange = (selectedAcc) => {
    setAccount(selectedAcc);
  };

   // 조회 조건 관리
  const [sortCriteria, setSortCriteria] = useState({ period: "1개월", type: "전체" });
  
  // 정렬 기준 변경 함수
  const handleSortSelect = (selectedSort) => {
    setSortCriteria(selectedSort); // 정렬 기준 업데이트
  };

  // 무 심기 선택 버튼 state 조절
  const [isRadishSelected, setIsRadishSelected] = useState(false);

  // 무 심기 선택 버튼 조절
  const toggleRadishSelection = () => {
    setIsRadishSelected(!isRadishSelected);
  };


  return (
    <Screen>
      <Container>
        <TransactionInfo
          account={account}
          accounts={accounts}
          isRadishSelected={isRadishSelected}
          toggleRadishSelection={toggleRadishSelection}
          onAccountChange={handleAccountChange}
          onSortSelect={handleSortSelect}
          sortCriteria={sortCriteria}
        />
        <TransactionList 
          account={account} 
          isRadishSelected={isRadishSelected}
          sortCriteria={sortCriteria} 
        />
      </Container>
    </Screen>
  );
};

export default TransactionHistory;
