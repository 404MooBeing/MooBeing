import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { postAccountHistory } from "../../apis/AccountApi"; // API 함수 가져오기
import useTransactionStore from "../../store/TransactionStore";
import basicRad from "../../assets/radishes/basicRad.svg";

const ListContainer = styled.div`
  padding: 20px;
  width: 90%;
  transition: opacity 0.3s ease;
`;

const TransactionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
  border-bottom: 1px solid #E3E3E3;
  background-color: ${(props) => (props.isSelected ? "#F5FDED" : "transparent")}; 
  opacity: ${(props) => (props.isRadishSelected && !props.isSelected ? "0.3" : "1")};
  cursor: ${(props) => (props.isRadishSelected ? "pointer" : "default")};
  transition: background-color 0.3s ease, opacity 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.isRadishSelected ? "#F5FDED" : "transparent"};
  }
`;

const TitleAndTime = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 600;
  padding-bottom: 5px;
`;

const Time = styled.span`
  font-size: 12px;
  color: #aaa;
  padding-bottom: 5px;
`;

const DateHeader = styled.div`
  font-size: 14px;
  color: #666;
  margin-top: 12px;
  padding-bottom: 12px;
  border-bottom: 2px solid #AFAFAF;
`;

const AmountAndRemain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const Amount = styled.span`
  color: ${(props) => (props.amount > 0 ? "#348833" : "#FF5A0E")};
  font-weight: bold;
`;

const Remain = styled.span`
  color: #aaa;
  font-size: 12px;
`;

const SelectButton = styled.button`
  position: fixed;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: #348833;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  z-index: 1000;
  font-family: 'mainFont';
`;


const NoTransactionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 6vh;
`;

const NoTransactionImage = styled.img`
  width: 70px;
  height: auto;
  margin: 15px 0px;

  @media (min-width: 600px) {
    width: 75px;
  }
`;

const NoTransactionText = styled.p`
  font-size: 12px;
  color: #24272d;
  margin: 0;
`;

const TransactionList = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [selectedTransactionIndex, setSelectedTransactionIndex] = useState(null);

  // Zustand에서 필요한 상태와 함수들 가져오기
  const { account, isRadishSelected, sortCriteria } = useTransactionStore();

  // 거래 내역 불러오기
  useEffect(() => {
    const fetchTransactions = async () => {
      if (account?.id) {
        try {
          const accountHistoryData = {
            accountId: account.id,
            months: sortCriteria.period,
            transactionType: sortCriteria.type,
            page: 1,
          };
          const response = await postAccountHistory(accountHistoryData);
          setTransactions(response); // 받아온 거래 내역 저장
        } catch (error) {
          console.error("거래 내역을 불러오는 중 오류가 발생했습니다:", error);
        }
      }
    };

    fetchTransactions(); // 컴포넌트 마운트 시 거래 내역 불러오기
  }, [account, sortCriteria]); // account와 sortCriteria가 변경될 때마다 호출

  useEffect(() => {
    if (!isRadishSelected) {
      setSelectedTransactionIndex(null);
    }
  }, [isRadishSelected]);

  const handleSelectTransaction = (index) => {
    if (isRadishSelected) {
      setSelectedTransactionIndex(index);
    }
  };

  const handleSelectButton = () => {
    if (selectedTransactionIndex !== null) {
      const selectedTransaction = transactions[selectedTransactionIndex];
      navigate('/capsule-intro', {
        state: { selectedTransaction }
      });
    } else {
      alert("내역을 선택해주세요!");
    }
  };

  return (
    <ListContainer selected={isRadishSelected}>
      {transactions.length > 0 ? (
        transactions.map((transaction, index) => (
          <div key={index}>
            {index === 0 || transactions[index - 1].date !== transaction.date ? (
              <DateHeader>{transaction.date}</DateHeader>
            ) : null}
            <TransactionItem
              onClick={() => handleSelectTransaction(index)}
              isSelected={index === selectedTransactionIndex}
              isRadishSelected={isRadishSelected}
            >
              <TitleAndTime>
                <Time>{transaction.time}</Time>
                <Title>{transaction.title}</Title>
              </TitleAndTime>
              <AmountAndRemain>
                <Amount amount={transaction.amount}>
                  {transaction.amount} 원
                </Amount>
                <Remain>잔액 {transaction.remainBalance}</Remain>
              </AmountAndRemain>
            </TransactionItem>
          </div>
        ))
      ) : (
        <NoTransactionContainer>
          <NoTransactionImage src={basicRad} alt="계좌 내역이 없습니다." />
          <NoTransactionText>계좌 내역이 없습니다.</NoTransactionText>
      </NoTransactionContainer>
      )}
      {isRadishSelected && <SelectButton onClick={handleSelectButton}>선택하기</SelectButton>}
    </ListContainer>
  );
};

export default TransactionList;