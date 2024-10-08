import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { postAccountHistory } from "../../apis/AccountApi";
import useTransactionStore from "../../store/TransactionStore";
import basicRad from "../../assets/radishes/basicRad.svg";
import useCapsuleStore from "../../store/CapsuleStore";

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
  const { updateTransactionInfo } = useCapsuleStore();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [selectedTransactionIndex, setSelectedTransactionIndex] = useState(null);
  const [page, setPage] = useState(1); // 페이지 상태 추가
  const [hasMore, setHasMore] = useState(true); // 추가 데이터가 있는지 여부
  const observer = useRef();

  // Zustand에서 필요한 상태와 함수들 가져오기
  const { account, isRadishSelected, sortCriteria } = useTransactionStore();

  // 거래 내역 불러오기
  const fetchTransactions = async (currentPage) => {
    if (account?.id && hasMore) {
      try {
        const accountHistoryData = {
          accountId: account.id,
          months: sortCriteria.period,
          transactionType: sortCriteria.type,
          page: currentPage, // 현재 페이지로 요청
        };
        const response = await postAccountHistory(accountHistoryData);
        
        if (response.length > 0) {
          setTransactions((prevTransactions) => [...prevTransactions, ...response]); // 이전 데이터에 추가
        } else {
          setHasMore(false); // 더 이상 데이터가 없을 경우
        }
      } catch (error) {
        console.error("거래 내역을 불러오는 중 오류가 발생했습니다:", error);
      }
    }
  };

  useEffect(() => {
    fetchTransactions(page); // 페이지가 변경될 때마다 데이터 가져오기
  }, [account, sortCriteria, page]);

  useEffect(() => {
    if (!isRadishSelected) {
      setSelectedTransactionIndex(null);
    }
  }, [isRadishSelected]);

  // 스크롤 끝에 도달했을 때 페이지를 증가시키는 함수
  const lastTransactionRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1); // 페이지 증가
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  const handleSelectTransaction = (index) => {
    if (isRadishSelected) {
      setSelectedTransactionIndex(index);
      const selectedTransaction = transactions[index];
      updateTransactionInfo(
        selectedTransaction.id,
        selectedTransaction.title,
        selectedTransaction.amount,
        selectedTransaction.date
      );
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
          <div key={index} ref={index === transactions.length - 1 ? lastTransactionRef : null}>
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
                  {transaction.amount.toLocaleString()} 원
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