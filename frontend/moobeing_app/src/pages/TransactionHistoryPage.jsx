import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";
import TransactionInfo from "../components/TransactionHistory/TransactionInfo";
import TransactionList from "../components/TransactionHistory/TransactionList";
import useTransactionStore from "../store/TransactionStore";

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
  const { account: selectedAccount, accounts: initialAccounts } = location.state || {}; // useLocation으로 받은 account와 accounts

  const { setAccount, setAccounts, resetState, accounts } = useTransactionStore();

  // 최초에 초기값 설정 및 선택된 계좌 설정
  useEffect(() => {
    if (initialAccounts && accounts.length === 0) {
      setAccounts(initialAccounts); // 계좌 목록을 store에 저장
    }

    if (selectedAccount) {
      setAccount(selectedAccount); // 선택된 계좌를 store에 저장
    }

    return () => {
      // 페이지를 떠날 때 상태 초기화
      resetState();
    };
  }, [initialAccounts, selectedAccount, accounts, setAccounts, setAccount, resetState]);
  
  return (
    <Screen>
      <Container>
        <TransactionInfo />
        <TransactionList />
      </Container>
    </Screen>
  );
};

export default TransactionHistory;
