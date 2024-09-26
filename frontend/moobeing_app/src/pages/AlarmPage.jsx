import React, { useState } from 'react';
import styled from 'styled-components';
import DownButton from '../assets/button/yearDownButton.svg';

const AlarmContainer = styled.div`
  padding: 10px 20px;
  position: relative;
  height: 100vh; // 전체 화면 높이로 설정
  display: flex;
  flex-direction: column;
`;

const AlarmHeader = styled.h1`
  font-size: 24px;
  margin-top: 0;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const DownArrow = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 6px;
`;

const AlarmList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  overflow-y: auto; // 세로 스크롤 추가
  flex-grow: 1; // 남은 공간을 모두 차지하도록 설정
`;

const AlarmListContent = styled.div`
  padding-bottom: 150px; // 맨 아래에 150px 마진 추가
`;

const AlarmItem = styled.li`
  background-color: #f0f8f0;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
`;

const AlarmTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const AlarmIcon = styled.div`
  width: 20px;
  height: 20px;
  background-color: #4CAF50;
  border-radius: 50%;
  margin-right: 10px;
  flex-shrink: 0;
`;

const AlarmTitleText = styled.h3`
  margin: 0;
  font-size: 16px;
`;

const AlarmTime = styled.span`
  font-size: 12px;
  color: #666;
  margin-left: auto;
`;

const AlarmMessage = styled.p`
  margin: 0;
  font-size: 14px;
  margin-left: 30px; // 아이콘 너비 + 마진
`;

const alarms = [
  { id: 1, title: 'MooBTI 학인', message: '이번 달 소비내역 분석을 할 수 있어요', time: '15시간 전' },
  { id: 2, title: '금융 상식 퀴즈 생성', message: '오늘의 금융 상식 퀴즈를 맞춰보세요.', time: '17일전' },
  { id: 3, title: '금융 퀴즈 생성', message: '저번 달 소비에 대한 퀴즈를 맞춰보세요.', time: '2일전' },
  { id: 4, title: '타임 무 알림', message: '김나에서 심은 타임무를 수확할 시간이에요', time: '6일전' },
  { id: 1, title: 'MooBTI 학인', message: '이번 달 소비내역 분석을 할 수 있어요', time: '15시간 전' },
  { id: 2, title: '금융 상식 퀴즈 생성', message: '오늘의 금융 상식 퀴즈를 맞춰보세요.', time: '17일전' },
  { id: 3, title: '금융 퀴즈 생성', message: '저번 달 소비에 대한 퀴즈를 맞춰보세요.', time: '2일전' },
  { id: 4, title: '타임 무 알림', message: '김나에서 심은 타임무를 수확할 시간이에요', time: '6일전' },
  { id: 1, title: 'MooBTI 학인', message: '이번 달 소비내역 분석을 할 수 있어요', time: '15시간 전' },
  { id: 2, title: '금융 상식 퀴즈 생성', message: '오늘의 금융 상식 퀴즈를 맞춰보세요.', time: '17일전' },
  { id: 3, title: '금융 퀴즈 생성', message: '저번 달 소비에 대한 퀴즈를 맞춰보세요.', time: '2일전' },
  { id: 4, title: '타임 무 알림', message: '김나에서 심은 타임무를 수확할 시간이에요', time: '6일전' },
];

const DropdownMenu = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  width: 40%;
  background-color: #E0EED2;
  border-radius: 8px;
  padding: 10px;
  margin-left: 20px;
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;

  &:hover {
    background-color: #e0f0e0;
  }
`;

const MenuText = styled.span`
  font-size: 19px;
  margin-left: 15px;
  font-weight: bold;
`;

const MenuIcon = styled.div`
  width: 24px;
  height: 24px;
  background-color: #4CAF50;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  margin-right: 15px;
`;

const AlarmPage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const menuItems = [
    { text: '전체', icon: '전' },
    { text: '퀴즈', icon: '퀴' },
    { text: '타임무', icon: '타' },
    { text: 'MooBTI', icon: 'M' },
  ];

  return (
    <AlarmContainer>
      <AlarmHeader onClick={toggleDropdown}>
        알림
        <DownArrow src={DownButton} alt="아래쪽 화살표" />
      </AlarmHeader>
      <DropdownMenu isOpen={isDropdownOpen}>
        {menuItems.map((item, index) => (
          <MenuItem key={index}>
            <MenuText>{item.text}</MenuText>
            <MenuIcon>{item.icon}</MenuIcon>
          </MenuItem>
        ))}
      </DropdownMenu>
      <AlarmList>
        <AlarmListContent>
          {alarms.map((alarm) => (
            <AlarmItem key={alarm.id}>
              <AlarmTitle>
                <AlarmIcon />
                <AlarmTitleText>{alarm.title}</AlarmTitleText>
                <AlarmTime>{alarm.time}</AlarmTime>
              </AlarmTitle>
              <AlarmMessage>{alarm.message}</AlarmMessage>
            </AlarmItem>
          ))}
        </AlarmListContent>
      </AlarmList>
    </AlarmContainer>
  );
};

export default AlarmPage;