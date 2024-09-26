import React, { useState } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);  // 투명도를 0.1로 크게 줄임
  backdrop-filter: blur(2px);  // 약간의 블러 효과 추가+
  z-index: 10;
`;

const PopUpContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 20px 20px 40px; // 하단 패딩을 40px로 늘림
  z-index: 20;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

const AllViewButton = styled.button`
  background-color: #f0f0f0;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 100px; // 하단 마진 추가
`;

const YearMonthSelector = styled.div`
  display: flex;
`;

const YearSelector = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  margin-right: 40px;
  width: 60px;
  height: 200px; // MonthGrid의 높이와 동일하게 설정
  justify-content: space-between; // 상단, 중앙, 하단에 요소 배치
`;

const YearText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px; // 연도 텍스트를 중앙에 위치시키기 위해 높이 설정
`;

const YearButton = styled.span`
  cursor: pointer;
  padding: 5px 0;
  color: #888;
  user-select: none;
`;

const MonthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 0px 20px;
  height: 200px; // 고정 높이 설정
`;

const MonthButton = styled.button`
  width: 60px;
  height: 60px;
  border: none; // 테두리 제거
  background-color: white;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }

  &:disabled {
    background-color: #f0f0f0;
    color: #ccc;
    cursor: not-allowed;
  }

  &:focus {
    outline: none; // 포커스 시 테두리 제거
  }
`;

const DateSortPopUp = ({ onClose, onSelectMonth, initialYear, onSelectAllView }) => {
  const [year, setYear] = useState(initialYear);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const incrementYear = () => {
    setYear(prevYear => Math.min(prevYear + 1, currentYear));
  };

  const decrementYear = () => {
    setYear(prevYear => prevYear - 1);
  };

  const handleMonthSelect = (month) => {
    if (isMonthDisabled(month)) return; // 선택 불가능한 월이면 함수 종료
    onSelectMonth(year, month);
  };

  const isMonthDisabled = (month) => {
    if (year > currentYear) return true;
    if (year === currentYear && month > currentMonth) return true;
    return false;
  };

  return (
    <>
      <Overlay onClick={handleOverlayClick} />
      <PopUpContainer>
        <Header>
          <Title>년/월 선택</Title>
          <AllViewButton onClick={onSelectAllView}>전체조회</AllViewButton>
        </Header>
        <ContentWrapper>
          <YearSelector>
            <YearButton onClick={incrementYear} style={{ visibility: year === currentYear ? 'hidden' : 'visible', marginBottom: '5px' }}>∧</YearButton>
            <YearText>{year}</YearText>
            <YearButton onClick={decrementYear} style={{ marginTop: '5px' }}>∨</YearButton>
          </YearSelector>
          <MonthGrid>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <MonthButton
                key={month}
                onClick={() => handleMonthSelect(month)}
                disabled={isMonthDisabled(month)}
              >
                {month}월
              </MonthButton>
            ))}
          </MonthGrid>
        </ContentWrapper>
      </PopUpContainer>
    </>
  );
};

export default DateSortPopUp;