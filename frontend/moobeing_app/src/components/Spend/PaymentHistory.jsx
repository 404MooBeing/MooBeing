import { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import PaymentList from "./PaymentList";

const Container = styled.div`
  background-color: #f5fded;
  width: 90%;
  margin-bottom: 5%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: 10% 7% 3% 7%;
`;

const TitleContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SelectDate = styled.div`
  font-weight: 700;
  margin-left: 8px;
  font-size: 18px;
`;

const LoanSort = styled.button`
  margin: 0;
  font-size: 12px;
  padding: 6px;
  cursor: pointer;
  border: none;
  background-color: ${(props) =>
    !props.showLoansOnly ? "#348833" : "#e0eed2"};
  color: ${(props) => (!props.showLoansOnly ? "#ffffff" : "#24272D")};
  border-radius: 10px;

  @media (min-width: 600px) {
    font-size: 14px;
    padding: 8px;
  }
`;

const PaymentHistory = ({ date, history }) => {
  const [filteredHistory, setFilteredHistory] = useState(history); // 기본적으로 전체 데이터를 설정
  const [showLoansOnly, setShowLoansOnly] = useState(false);

  useEffect(() => {
    // date가 변경될 때마다 showLoansOnly를 초기화
    setShowLoansOnly(false);
  }, [date]);

  useEffect(() => {
    // showLoansOnly 상태에 따라 필터링 적용
    if (showLoansOnly) {
      setFilteredHistory(
        history.filter((item) => item.categoryName === "대출")
      );
    } else {
      setFilteredHistory(history);
    }
  }, [history, showLoansOnly]); // history와 showLoansOnly가 변경될 때마다 실행

  const handleFilterClick = () => {
    setShowLoansOnly((prev) => !prev); // 버튼 클릭 시 필터 상태를 토글
  };

  return (
    <Container>
      <TitleContent>
        <SelectDate>선택 날짜: {date}</SelectDate>
        <LoanSort showLoansOnly={showLoansOnly} onClick={handleFilterClick}>
          {showLoansOnly ? "전체 보기" : "대출만 보기"}
        </LoanSort>
      </TitleContent>
      <PaymentList payments={filteredHistory} />
    </Container>
  );
};

PaymentHistory.propTypes = {
  date: PropTypes.string.isRequired,
  history: PropTypes.array.isRequired,
};

export default PaymentHistory;