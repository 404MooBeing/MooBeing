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


const CoinList = ({ isRadishSelected, sortCriteria, coinList }) => {
  const navigate = useNavigate();
  let Coins = coinList;

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
              <Remain>잔액 {Coin.remainBalance} 개</Remain>
            </AmountAndRemain>
          </CoinItem>
        </div>
      ))}
    </ListContainer>
  );
};

export default CoinList;
