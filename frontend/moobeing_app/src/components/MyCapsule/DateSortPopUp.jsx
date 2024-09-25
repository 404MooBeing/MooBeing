import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);  // 투명도를 0.1로 크게 줄임
  backdrop-filter: blur(2px);  // 약간의 블러 효과 추가
  z-index: 10;
`;

const PopUpContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40vh; // 뷰포트 높이의 40%
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 20px;
  z-index: 20;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto; // 내용이 넘칠 경우 스크롤 가능하도록 설정
`;

const Title = styled.h2`
  text-align: left;
  margin-bottom: 20px;
  font-size: 30px; // 크기 약간 줄임
  font-weight: bold;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const YearSelector = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  margin-right: 40px;
  margin-left: -5px;
  width: 60px;
`;

const YearText = styled.div`
  margin-bottom: 10px;
`;

const YearButton = styled.span`
  cursor: pointer;
  padding: 5px 0;
  color: #888;
`;

const MonthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px 30px;
  justify-content: center;
  align-content: center;
`;

const MonthButton = styled.button`
  padding: 10px 0;
  background-color: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #333;
  text-align: center;
  width: 100%;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const DateSortPopUp = ({ onClose, onSelectMonth }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <Overlay onClick={handleOverlayClick} />
      <PopUpContainer>
        <Title>년/월 선택</Title>
        <ContentWrapper>
          <YearSelector>
            <YearButton>∧</YearButton>
            <YearText>2024</YearText>
            <YearButton>∨</YearButton>
          </YearSelector>
          <MonthGrid>
            {[...Array(12)].map((_, index) => (
              <MonthButton key={index + 1} onClick={() => onSelectMonth(index + 1)}>
                {index + 1}월
              </MonthButton>
            ))}
          </MonthGrid>
        </ContentWrapper>
      </PopUpContainer>
    </>
  );
};

export default DateSortPopUp;