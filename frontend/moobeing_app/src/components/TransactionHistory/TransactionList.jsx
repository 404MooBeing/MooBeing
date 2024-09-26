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

const transactions = [
  { date: "2024.09.20 (금)", title: "주식회사무신사", time: "10:55", amount: -44500, remain: "123,423,422" },
  { date: "2024.09.20 (금)", title: "주식회사무신사", time: "10:53", amount: -54500, remain: "123,423,422" },
  { date: "2024.09.19 (목)", title: "바나프레소혜", time: "10:55", amount: -1800, remain: "123,423,422" },
  { date: "2024.09.19 (목)", title: "바나프레소혜", time: "10:53", amount: -3200, remain: "123,423,422" },
  { date: "2024.09.19 (목)", title: "포인트입금", time: "10:53", amount: 3200, remain: "123,423,422" },
  { date: "2024.09.18 (수)", title: "바나프레소혜", time: "10:55", amount: -1800, remain: "123,423,422" },
  { date: "2024.09.18 (수)", title: "바나프레소혜", time: "10:53", amount: -3200, remain: "123,423,422" }
];

const SelectButton = styled.button`
  position: fixed;
  bottom: 15%;
  right: 40%;
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

const TransactionList = ({ isRadishSelected }) => {
  const navigate = useNavigate();
  const [selectedTransactionIndex, setSelectedTransactionIndex] = useState(null);

  useEffect(() => {
    if (!isRadishSelected) {
      setSelectedTransactionIndex(null);
    }
  }, [isRadishSelected]);

  const handleSelectTransaction = (index) => {
    if (isRadishSelected) {
      setSelectedTransactionIndex(index);
    };
  };

  // 무 심기에 정보 넘기는 로직
  const handleSelectButton = () => {
    if (selectedTransactionIndex !== null) {
      const selectedTransaction = transactions[selectedTransactionIndex];
      navigate('/capsule-intro', {
        state: { selectedTransaction }
      });
    } else {
      alert("내역을 선택해주세요!"); // 트랜잭션이 선택되지 않은 경우 알림
    }
  };

  return (
    <>
      {isRadishSelected && <SelectButton onClick={handleSelectButton}>선택하기</SelectButton>}

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
      </ListContainer>
    </>
  );
};

export default TransactionList;
