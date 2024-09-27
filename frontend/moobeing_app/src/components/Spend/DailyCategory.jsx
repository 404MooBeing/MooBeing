import { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import CategoryList from "./DailyCategoryList";
import useDateStore from "../../store/DateStore"; // Zustand의 date store 가져오기
import dayjs from "dayjs"; // 날짜 비교를 위해 dayjs 사용

const Container = styled.div`
  background-color: #f5fded;
  width: 100%;
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
  align-items: center;
`;

const SelectDate = styled.div`
  font-weight: 600;
  margin-left: 8px;
  font-size: 16px;
`;

const LoanSort = styled.button`
  margin: 0;
  font-size: 12px;
  padding: 8px;
  cursor: pointer;
  border: none;
  font-family: 'mainFont';
  background-color: ${(props) =>
    !props.showLoansOnly ? "#348833" : "#e0eed2"};
  color: ${(props) => (!props.showLoansOnly ? "#ffffff" : "#24272D")};
  border-radius: 10px;

  @media (min-width: 600px) {
    font-size: 14px;
    padding: 8px;
  }
`;

const DailyCategory = ({ spendData }) => {
  const { selectedDate } = useDateStore(); // Zustand로부터 date 가져오기
  const [filteredHistory, setFilteredHistory] = useState([]); // 기본적으로 전체 데이터를 설정
  const [showLoansOnly, setShowLoansOnly] = useState(false);

  useEffect(() => {
    // 선택된 날짜에 따라 해당하는 데이터 필터링
    const filteredByDate = spendData
      .filter((item) =>
        dayjs(item.date).isSame(selectedDate, "day") // 선택한 날짜와 데이터의 날짜 비교
      )
      .map((item) => item.history) // 각 항목의 history만 추출
      .flat(); // 다중 배열을 평탄화하여 하나의 배열로 만듦

    setFilteredHistory(filteredByDate); // 선택된 날짜에 맞는 데이터를 설정
    setShowLoansOnly(false); // 날짜가 변경될 때마다 필터링 초기화
  }, [selectedDate, spendData]); // selectedDate와 history가 변경될 때마다 실행

  useEffect(() => {
    // showLoansOnly 상태에 따라 대출만 필터링
    if (showLoansOnly) {
      setFilteredHistory((prevHistory) =>
        prevHistory.filter((item) => item.categoryName === "대출")
      );
    } else {
      // 날짜에 맞는 모든 데이터를 표시
      const filteredByDate = spendData
        .filter((item) =>
          dayjs(item.date).isSame(selectedDate, "day")
        )
        .map((item) => item.history) // 각 항목의 history만 추출
        .flat(); // 다중 배열을 평탄화하여 하나의 배열로 만듦

      setFilteredHistory(filteredByDate);
    }
  }, [showLoansOnly, selectedDate, spendData]); // showLoansOnly, selectedDate, spendData가 변경될 때마다 실행

  const handleFilterClick = () => {
    setShowLoansOnly((prev) => !prev); // 버튼 클릭 시 필터 상태를 토글
  };

  return (
    <Container>
      <TitleContent>
        <SelectDate>선택 날짜: {selectedDate.format("YYYY-MM-DD")}</SelectDate>
        <LoanSort showLoansOnly={showLoansOnly} onClick={handleFilterClick}>
          {showLoansOnly ? "전체 보기" : "대출만 보기"}
        </LoanSort>
      </TitleContent>
      <CategoryList payments={filteredHistory} />
    </Container>
  );
};

DailyCategory.propTypes = {
  spendData: PropTypes.array.isRequired,
};

export default DailyCategory;
