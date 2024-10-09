import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DownButton from '../assets/button/yearDownButton.svg';
import { getAllAlarms, getAlarmsByCategory } from '../apis/AlarmApi';
import basicRadish from '../assets/radishes/basicRad.png';

const AlarmContainer = styled.div`
  padding: 30px;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const AlarmHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const AlarmTitle = styled.h1`
  font-size: 24px;
  margin: 0;
`;

const DownArrow = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 6px;
`;

const AlarmTitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const AlarmList = styled.ul`
  list-style-type: none;
  padding: 10px;
  margin: 20px 0 150px 0;
  overflow-y: auto;
  flex-grow: 1;

  /* 크롬, 사파리, 오페라 */
  &::-webkit-scrollbar {
  display: none;
  }

  /* IE와 Edge */
  -ms-overflow-style: none;

  /* Firefox */
  scrollbar-width: none;
`;

const AlarmListContent = styled.div`
  padding-bottom: 20px; // 하단 여백 추가
`;

const AlarmItem = styled.li`
  background-color: #f0f8f0;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
`;

const AlarmItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const AlarmIconTitle = styled.div`
  display: flex;
  align-items: center;
`;

const AlarmIcon = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 10px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #4CAF50;
`;

const RadishIcon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const AlarmItemTitle = styled.h3`
  margin: 0;
  font-size: 16px;
`;

const AlarmTime = styled.span`
  font-size: 12px;
  color: #666;
  white-space: nowrap;
`;

const AlarmMessage = styled.p`
  margin: 5px 0 0;
  font-size: 14px;
  padding-left: 34px; // 아이콘 너비(24px) + 오른쪽 마진(10px)
`;

const formatTimeAgo = (dateString) => {
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}초 전`;
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}분 전`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}시간 전`;
  } else if (diffInSeconds < 2592000) {
    return `${Math.floor(diffInSeconds / 86400)}일 전`;
  } else if (diffInSeconds < 31536000) {
    return `${Math.floor(diffInSeconds / 2592000)}개월 전`;
  } else {
    return `${Math.floor(diffInSeconds / 31536000)}년 전`;
  }
};

const getIconContent = (iconName) => {
  switch (iconName.toLowerCase()) {
    case 'moobtı':
      return 'M';
    case 'quız':
      return 'Q';
    default:
      return <RadishIcon src={basicRadish} alt="기본 무 아이콘" />;
  }
};


const AlarmPage = () => {
  const [alarms, setAlarms] = useState([]);

  useEffect(() => {
    fetchAlarms();
  }, []);

  const fetchAlarms = async () => {
    try {
      const fetchedAlarms = await getAllAlarms();
      setAlarms(fetchedAlarms);
    } catch (error) {
      console.error("알림을 불러오는 데 실패했습니다:", error);
    }
  };

  return (
    <AlarmContainer>
      <AlarmHeader>
        <AlarmTitleWrapper>
          <AlarmTitle>알림</AlarmTitle>
          <DownArrow src={DownButton} alt="아래 화살표" />
        </AlarmTitleWrapper>
      </AlarmHeader>
      <AlarmList>
        <AlarmListContent>
          {alarms.map((alarm) => (
            <AlarmItem key={alarm.id}>
              <AlarmItemHeader>
                <AlarmIconTitle>
                  <AlarmIcon>{getIconContent(alarm.iconName)}</AlarmIcon>
                  <AlarmItemTitle>{alarm.title}</AlarmItemTitle>
                </AlarmIconTitle>
                <AlarmTime>{formatTimeAgo(alarm.createdAt)}</AlarmTime>
              </AlarmItemHeader>
              <AlarmMessage>{alarm.message}</AlarmMessage>
            </AlarmItem>
          ))}
          <NoticeText>최대 1달 전까지의 알림을 확인할 수 있어요</NoticeText>
        </AlarmListContent>
      </AlarmList>
    </AlarmContainer>
  );
};

const NoticeText = styled.p`
  text-align: center;
  color: #333;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 0;
  margin-top: 20px; // 상단 여백 추가
  text-decoration: underline; // 밑줄 추가
`;

export default AlarmPage;