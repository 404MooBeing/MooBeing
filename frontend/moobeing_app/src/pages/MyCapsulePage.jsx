import React, { useState } from 'react';
import styled from 'styled-components';
import CapsuleCard from '../components/MyCapsule/CapsuleCard';
import DateSortPopUp from '../components/MyCapsule/DateSortPopUp';

const PageContainer = styled.div`
  background-color: #f0f8f0;
  padding: 20px;
  position: relative;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  font-size: 23.4px;
  font-weight: bold;
  cursor: pointer;
`;

const TitleText = styled.span`
  display: flex;
  align-items: center;
  
  & > span {
    margin: 0 22px;
    user-select: none;
    cursor: pointer;
    font-size: 18px;
  }
`;

const BlurOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(128, 128, 128, 0.5); // 회색으로 설정, 투명도 조절
  backdrop-filter: blur(2px); // 블러 강도를 낮춤
  z-index: 10;
`;

const DateLabel = styled.div`
  background-color: #d0d0d0;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
  display: inline-block;
  margin-bottom: 15px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;

// 더미 데이터
const dummyData = [
  {
    id: 1,
    date: '9월 12일',
    title: '참순불가마',
    amount: '30,000',
    imageUrl: 'https://github.com/user-attachments/assets/ca076534-070a-441b-b270-f65740b6c35f',
    iconUrl: 'https://github.com/user-attachments/assets/19eff918-f0cd-4f7c-b56b-ddf5069749b9', // 아이콘 URL 추가
    content: '오늘 포동포동한 소풍을 갔다.\n국밥중앙 박물관 오픈런을 하였다.'
  },
  {
    id: 2,
    date: '9월 10일',
    title: '스타벅스',
    amount: '15,000',
    imageUrl: 'https://github.com/user-attachments/assets/5e71b0fe-31ea-4e10-a7a4-39efe92edf8e',
    iconUrl: 'https://github.com/user-attachments/assets/19eff918-f0cd-4f7c-b56b-ddf5069749b9', // 아이콘 URL 추가
    content: '친구와 함께 커피를 마셨다.\n새로 나온 메뉴를 시도해 보았다.'
  },
  {
    id: 3,
    date: '9월 8일',
    title: '영화관',
    amount: '25,000',
    imageUrl: 'https://github.com/user-attachments/assets/03dd01fd-9e46-4c9f-b411-be78e72fd4e3',
    iconUrl: 'https://github.com/user-attachments/assets/19eff918-f0cd-4f7c-b56b-ddf5069749b9', // 아이콘 URL 추가
    content: '오랜만에 영화를 보러 갔다.\n팝콘과 콜라도 함께 즐겼다.'
  }
];

const MyCapsulePage = () => {
  const [isDateSortOpen, setIsDateSortOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const toggleDateSort = () => {
    setIsDateSortOpen(!isDateSortOpen);
  };

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    setIsDateSortOpen(false);
  };

  return (
    <PageContainer>
      <Title onClick={toggleDateSort}>
        <TitleText>
          <span>{'<'}</span>
          전체조회
          <span>{'>'}</span>
        </TitleText>
      </Title>
      
      {dummyData.map((item) => (
        <React.Fragment key={item.id}>
          <DateLabel>{item.date}</DateLabel>
          <CapsuleCard 
            title={item.title}
            amount={item.amount}
            imageUrl={item.imageUrl}
            iconUrl={item.iconUrl}
            content={item.content}
          />
        </React.Fragment>
      ))}
      
      {isDateSortOpen && (
        <>
          <BlurOverlay />
          <DateSortPopUp onClose={toggleDateSort} onSelectMonth={handleMonthSelect} />
        </>
      )}
    </PageContainer>
  );
};

export default MyCapsulePage;
