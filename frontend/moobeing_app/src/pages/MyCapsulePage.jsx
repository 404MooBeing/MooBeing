import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CapsuleCard from '../components/MyCapsule/CapsuleCard';
import DateSortPopUp from '../components/MyCapsule/DateSortPopUp';
import { getCapsulesByYearMonth, getAllCapsules } from '../apis/MyCapsuleApi';
import LeftButton from '../assets/button/leftButtonBlack.svg';
import RightButton from '../assets/button/rightButtonBlack.svg';

const Screen = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  background-color: #f0f8f0;
`;

const ContentWrapper = styled.div`
  padding: 20px;
  margin-bottom: 150px; /* 아래에 150px 공간 추가 */
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
`;

const TitleText = styled.span`
  display: flex;
  align-items: center;
  
  & > img {
    margin: 0 22px;
    user-select: none;
    cursor: pointer;
    width: 20px;
    height: 20px;
  }

  & > span {
    font-size: 25px;
    margin: 0 22px;
    user-select: none;
    cursor: pointer;
  }
`;

const DateLabelContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 15px;
`;

const DateLabel = styled.div`
  background-color: #d0d0d0;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
  display: inline-block;
`;

const BlurOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(128, 128, 128, 0.2);
  backdrop-filter: blur(1px);
  z-index: 10;
`;

const MyCapsulePage = () => {
  const [isDateSortOpen, setIsDateSortOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [isAllView, setIsAllView] = useState(false);
  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCapsules();
  }, [selectedYear, selectedMonth, isAllView]);

  const fetchCapsules = async () => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (isAllView) {
        data = await getAllCapsules();
      } else {
        data = await getCapsulesByYearMonth(selectedYear, selectedMonth);
      }
      setCapsules(data);
    } catch (err) {
      setError('캡슐을 불러오는 데 실패했습니다.');
      console.error('Error fetching capsules:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleDateSort = () => {
    setIsDateSortOpen(!isDateSortOpen);
  };

  const handleMonthSelect = (year, month) => {
    setSelectedYear(year);
    setSelectedMonth(month);
    setIsAllView(false);
    setIsDateSortOpen(false);
  };

  const handleSelectAllView = () => {
    setIsAllView(true);
    setIsDateSortOpen(false);
  };

  const changeMonth = (increment) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    let newMonth = selectedMonth + increment;
    let newYear = selectedYear;

    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    } else if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    }

    // 현재 날짜보다 미래인 경우 변경하지 않음
    if (newYear > currentYear || (newYear === currentYear && newMonth > currentMonth)) {
      return;
    }

    handleMonthSelect(newYear, newMonth);
  };

  const getTitleText = () => {
    if (isAllView) {
      return '전체조회';
    }
    return `${selectedYear}년 ${selectedMonth}월`;
  };

  return (
    <Screen>
      <Container>
        <ContentWrapper>
          <Title>
            <TitleText>
              <img src={LeftButton} alt="이전 달" onClick={() => changeMonth(-1)} />
              <span onClick={toggleDateSort}>{getTitleText()}</span>
              <img src={RightButton} alt="다음 달" onClick={() => changeMonth(1)} />
            </TitleText>
          </Title>
          
          {loading && <p>로딩 중...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && capsules.map((item) => (
            <React.Fragment key={item.id}>
              <DateLabelContainer>
                <DateLabel>{item.date}</DateLabel>
              </DateLabelContainer>
              <CapsuleCard 
                title={item.title}
                amount={item.amount}
                imageUrl={item.imageUrl}
                iconUrl={item.iconUrl}
                content={item.content}
              />
            </React.Fragment>
          ))}
        </ContentWrapper>
        
        {isDateSortOpen && (
          <>
            <BlurOverlay />
            <DateSortPopUp 
              onClose={toggleDateSort} 
              onSelectMonth={handleMonthSelect}
              initialYear={selectedYear}
              onSelectAllView={handleSelectAllView}
            />
          </>
        )}
      </Container>
    </Screen>
  );
};

export default MyCapsulePage;
