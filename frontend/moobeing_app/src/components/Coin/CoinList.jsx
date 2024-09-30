import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ListContainer = styled.div`
  padding: 20px;
  width: 90%;
  transition: opacity 0.3s ease;
`;

const CoinItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
  border-bottom: 1px solid #E3E3E3;
  transition: background-color 0.3s ease, opacity 0.3s ease;

  &:hover {
    background-color: "transparent"
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

const Coins = [
  // 하나은행 일반 계좌
  {date: "2024.09.20 (금)", title: "무 뽑기", time: "12:30", amount: 4000, remain: "8000" },
  {date: "2024.09.20 (금)", title: "출석체크", time: "10:55", amount: 1000, remain: "9000" },
  {date: "2024.09.19 (목)", title: "출석체크", time: "18:15", amount: 1000, remain: "4000" },
  {date: "2024.09.19 (목)", title: "무 뽑기", time: "14:45", amount: 2000, remain: "3000" },
  {date: "2024.09.18 (수)", title: "출석체크", time: "08:25", amount: 1000, remain: "1000" },
  {date: "2024.09.18 (수)", title: "환전", time: "20:10", amount: -21500, remain: "0" },
];


const CoinList = ({ isRadishSelected, sortCriteria }) => {
  const navigate = useNavigate();


  // sortCriteria에 따라 입금/출금 또는 전체 필터링
  if (sortCriteria.type === '적립') {
    Coins = Coins.filter(Coin => Coin.amount > 0);
  } else if (sortCriteria.type === '사용') {
    Coins = Coins.filter(Coin => Coin.amount < 0);
  }

  return (
    <ListContainer selected={isRadishSelected}>
      {Coins.map((Coin, index) => (
        <div key={index}>
          {index === 0 || Coins[index - 1].date !== Coin.date ? (
            <DateHeader>{Coin.date}</DateHeader>
          ) : null}
          <CoinItem>
            <TitleAndTime>
              <Time>{Coin.time}</Time>
              <Title>{Coin.title}</Title>
            </TitleAndTime>
            <AmountAndRemain>
              <Amount amount={Coin.amount}>
                {Coin.amount.toLocaleString()} 개
              </Amount>
              <Remain>잔액 {Coin.remain}</Remain>
            </AmountAndRemain>
          </CoinItem>
        </div>
      ))}
    </ListContainer>
  );
};

export default CoinList;
