import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DownButton from '../assets/button/yearDownButton.svg';
import { getAllAlarms, getAlarmsByCategory } from '../apis/AlarmApi';

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
  display: flex;
  align-items: flex-start;
`;

const AlarmIcon = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 10px;
  flex-shrink: 0;
`;

const AlarmContent = styled.div`
  flex-grow: 1;
`;

const AlarmTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
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
`;

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
  const [alarms, setAlarms] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAlarms();
  }, [selectedCategory]);

  const fetchAlarms = async () => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (selectedCategory === '전체') {
        data = await getAllAlarms();
      } else {
        data = await getAlarmsByCategory(selectedCategory);
      }
      setAlarms(data);
    } catch (err) {
      setError('알림을 불러오는 데 실패했습니다.');
      console.error('Error fetching alarms:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
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
          <MenuItem key={index} onClick={() => handleCategorySelect(item.text)}>
            <MenuText>{item.text}</MenuText>
            <MenuIcon>{item.icon}</MenuIcon>
          </MenuItem>
        ))}
      </DropdownMenu>
      <AlarmList>
        <AlarmListContent>
          {loading && <p>로딩 중...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && alarms.map((alarm) => (
            <AlarmItem key={alarm.id}>
              <AlarmIcon src={alarm.iconUrl} alt="알림 아이콘" />
              <AlarmContent>
                <AlarmTitle>
                  <AlarmTitleText>{alarm.title}</AlarmTitleText>
                  <AlarmTime>{alarm.time}</AlarmTime>
                </AlarmTitle>
                <AlarmMessage>{alarm.message}</AlarmMessage>
              </AlarmContent>
            </AlarmItem>
          ))}
        </AlarmListContent>
      </AlarmList>
    </AlarmContainer>
  );
};

export default AlarmPage;