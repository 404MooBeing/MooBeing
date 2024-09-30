import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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

const allTransactions = [
  // 하나은행 일반 계좌
  { accountNum: '1003-2293-332-1', date: "2024.09.20 (금)", title: "스타벅스", time: "10:55", amount: -4800, remain: "995,200" },
  { accountNum: '1003-2293-332-1', date: "2024.09.20 (금)", title: "택시 요금", time: "12:30", amount: -12000, remain: "983,200" },
  { accountNum: '1003-2293-332-1', date: "2024.09.19 (목)", title: "편의점", time: "18:15", amount: -5600, remain: "988,800" },
  { accountNum: '1003-2293-332-1', date: "2024.09.19 (목)", title: "GS 칼텍스", time: "14:45", amount: -62000, remain: "950,200" },
  { accountNum: '1003-2293-332-1', date: "2024.09.18 (수)", title: "서울교통공사", time: "08:25", amount: -1250, remain: "999,950" },
  { accountNum: '1003-2293-332-1', date: "2024.09.18 (수)", title: "BHC 치킨", time: "20:10", amount: -21500, remain: "978,450" },
  
  // 농협은행 정기예금
  { accountNum: '3244-2293-332-1', date: "2024.09.17 (화)", title: "편의점", time: "10:45", amount: -3200, remain: "496,800" },
  { accountNum: '3244-2293-332-1', date: "2024.09.17 (화)", title: "주유소", time: "16:20", amount: -54000, remain: "460,000" },
  { accountNum: '3244-2293-332-1', date: "2024.09.16 (월)", title: "이마트", time: "19:00", amount: -45200, remain: "504,800" },
  { accountNum: '3244-2293-332-1', date: "2024.09.15 (일)", title: "카페", time: "15:10", amount: 5500, remain: "550,000" },
  { accountNum: '3244-2293-332-1', date: "2024.09.14 (토)", title: "스타벅스", time: "08:50", amount: -4800, remain: "555,500" },
  { accountNum: '3244-2293-332-1', date: "2024.09.14 (토)", title: "GS25 편의점", time: "13:35", amount: -3200, remain: "560,300" },
  
  // 신한은행 적금
  { accountNum: '3324-33435-333-1', date: "2024.09.13 (금)", title: "GS 칼텍스", time: "09:15", amount: -87000, remain: "740,000" },
  { accountNum: '3324-33435-333-1', date: "2024.09.13 (금)", title: "롯데마트", time: "15:45", amount: -45200, remain: "825,000" },
  { accountNum: '3324-33435-333-1', date: "2024.09.12 (목)", title: "교보문고", time: "11:10", amount: 12800, remain: "770,000" },
  { accountNum: '3324-33435-333-1', date: "2024.09.12 (목)", title: "배달의민족", time: "20:05", amount: -21500, remain: "755,000" },
  { accountNum: '3324-33435-333-1', date: "2024.09.11 (수)", title: "스타벅스", time: "10:55", amount: -5800, remain: "775,000" },
  { accountNum: '3324-33435-333-1', date: "2024.09.10 (화)", title: "맥도날드", time: "12:45", amount: -6700, remain: "750,000" },
  
  // 우리은행 주택청약
  { accountNum: '3324-3838-333-1', date: "2024.09.09 (월)", title: "편의점", time: "12:35", amount: -3200, remain: "296,800" },
  { accountNum: '3324-3838-333-1', date: "2024.09.09 (월)", title: "영화관", time: "20:10", amount: -12000, remain: "300,000" },
  { accountNum: '3324-3838-333-1', date: "2024.09.08 (일)", title: "택시 요금", time: "09:30", amount: -9800, remain: "312,000" },
  { accountNum: '3324-3838-333-1', date: "2024.09.07 (토)", title: "이마트", time: "16:20", amount: -21000, remain: "322,000" },
  { accountNum: '3324-3838-333-1', date: "2024.09.06 (금)", title: "스타벅스", time: "18:40", amount: -4800, remain: "343,000" },
  { accountNum: '3324-3838-333-1', date: "2024.09.05 (목)", title: "편의점", time: "13:45", amount: -3200, remain: "348,000" },
  { accountNum: '3324-3838-333-1', date: "2024.09.05 (목)", title: "편의점", time: "13:90", amount: 3200, remain: "348,000" },
];


const TransactionList = ({ account, isRadishSelected, sortCriteria }) => {
  const navigate = useNavigate();
  const [selectedTransactionIndex, setSelectedTransactionIndex] = useState(null);

  useEffect(() => {
    if (!isRadishSelected) {
      setSelectedTransactionIndex(null);
    }
  }, [isRadishSelected]);

  // 선택한 계좌번호와 일치하는 트랜잭션 필터링
  let transactions = allTransactions.filter(transaction => transaction.accountNum === account.accountNum);

  // sortCriteria에 따라 입금/출금 또는 전체 필터링
  if (sortCriteria.type === '입금') {
    transactions = transactions.filter(transaction => transaction.amount > 0);
  } else if (sortCriteria.type === '출금') {
    transactions = transactions.filter(transaction => transaction.amount < 0);
  }

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
      {transactions.map((transaction, index) => (
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
                {transaction.amount.toLocaleString()} 원
              </Amount>
              <Remain>잔액 {transaction.remain}</Remain>
            </AmountAndRemain>
          </TransactionItem>
        </div>
      ))}
      {isRadishSelected && <SelectButton onClick={handleSelectButton}>선택하기</SelectButton>}
    </ListContainer>
  );
};

export default TransactionList;
