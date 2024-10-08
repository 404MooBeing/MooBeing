import React from "react";
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
    background-color: #f5f5f5;
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

// CoinList 컴포넌트에서 lastCoinElementRef를 받아 마지막 요소에 추가
const CoinList = ({ isRadishSelected, sortCriteria, coinList, lastCoinElementRef }) => {
  let Coins = coinList;

  // sortCriteria에 따라 입금/출금 또는 전체 필터링
  if (sortCriteria.type === "적립") {
    Coins = Coins.filter((Coin) => Coin.amount > 0);
  } else if (sortCriteria.type === "사용") {
    Coins = Coins.filter((Coin) => Coin.amount < 0);
  }

  return (
    <ListContainer selected={isRadishSelected}>
      {Coins.map((Coin, index) => {
        // 마지막 코인 요소에 lastCoinElementRef를 전달
        const isLastElement = Coins.length === index + 1;

        return (
          <div key={index} ref={isLastElement ? lastCoinElementRef : null}>
            {index === 0 || Coins[index - 1].date !== Coin.date ? (
              <DateHeader>{Coin.date}</DateHeader>
            ) : null}
            <CoinItem>
              <TitleAndTime>
                <Time>{Coin.time}</Time>
                <Title>{Coin.amount > 0 ? "코인 적립" : "코인 사용"}</Title>
              </TitleAndTime>
              <AmountAndRemain>
                <Amount amount={Coin.amount}>
                  {Coin.amount.toLocaleString()} 개
                </Amount>
                <Remain>잔액 {Coin.remainBalance} 개</Remain>
              </AmountAndRemain>
            </CoinItem>
          </div>
        );
      })}
    </ListContainer>
  );
};

export default CoinList;
