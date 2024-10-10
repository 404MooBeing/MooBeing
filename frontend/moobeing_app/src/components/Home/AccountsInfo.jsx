import { useState, useEffect } from "react";
import styled from "styled-components";
import AccountList from "./AccountList";
import { getAccountSum } from "../../apis/AccountApi";
import useUserStore from "../../store/UserStore";

const Container = styled.div`
  background-color: #f5fded;
  border-radius: 20px;
  width: 90%;
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 8% 5% 5% 8%;
  box-sizing: border-box;
  margin-top: 5%;
`;

const SubHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4%;
`;

const SubTitle = styled.div`
  margin: 0;
  font-size: 22px;
  font-weight: 700;

  @media (min-width: 600px) {
    font-size: 27px;
  }
`;

const TotalAccount = styled.div`
  margin-top: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 0;
  font-size: 20px;
  font-weight: 700;

  @media (min-width: 600px) {
    font-size: 25px;
  }
`;

const AccountListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const AccountInfo = () => {
  const { totalAccountAmount, setTotalAccountAmount } = useUserStore();

  useEffect(() => {
    const fetchAccountSum = async () => {
      try {
        const data = await getAccountSum();
        setTotalAccountAmount(data); // API 응답을 상태에 저장
      } catch (error) {
        console.error('대출금 총합 조회 실패:', error);
      }
    };

    fetchAccountSum(); // useEffect 안에서 API 호출
  }, [setTotalAccountAmount]); // 의존성에 setTotalAccountAmount 추가
  
  return (
    <Container>
      <SubHeader>
        <SubTitle>총 자산</SubTitle>
      </SubHeader>
      <TotalAccount>
        {totalAccountAmount?.toLocaleString()} 원 
      </TotalAccount>
      <AccountListContainer>
        <AccountList/>
      </AccountListContainer>
    </Container>
  );
}

export default AccountInfo; 
