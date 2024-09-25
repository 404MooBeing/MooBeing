import React from 'react';
import styled from 'styled-components';
import CapsuleCard from '../components/MyCapsule/CapsuleCard';

const PageContainer = styled.div`
  background-color: #f0f8f0;
  min-height: calc(100vh - 120px);
  padding: 20px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
`;

const DateLabel = styled.div`
  background-color: #e0e0e0;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 14px;
  margin-bottom: 10px;
  display: inline-block;
`;

const TransactionHistoryPage = () => {
  return (
    <PageContainer>
      <Title>
        <span>{'<'}</span>
        전체조회
        <span>{'>'}</span>
      </Title>
      
      <DateLabel>9월 12일</DateLabel>
      
      <CapsuleCard 
        title="참순불가마"
        amount="30,000"
        imageSrc="/path/to/single_image.jpg"
        content="오늘 포동포동한 소풍을 갔다.\n국밥중앙 박물관 오픈런을 하였다."
      />
      
      <DateLabel>9월 10일</DateLabel>
      
      {/* 추가 CapsuleCard 컴포넌트들을 여기에 배치 */}
    </PageContainer>
  );
};

export default TransactionHistoryPage;
