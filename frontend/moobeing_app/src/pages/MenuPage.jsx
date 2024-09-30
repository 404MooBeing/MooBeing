import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SearchIconSvg from '../assets/button/SearchButton.svg';
import RightButton from '../assets/button/rightButtonBlack.svg';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 767px;
  margin: 0 auto;
  background-color: #ffffff;
`;

const KimpaPanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #F5FDED;
  padding: 15px 20px;
  margin: 10px 20px;
  border-radius: 20px;
`;

const KimpaText = styled.span`
  font-weight: bold;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const KimpaArrow = styled.span`
  margin-left: 8px; // 화살표와 텍스트 사이의 간격
`;

const LogoutButton = styled.button`
  background-color: #E0EED2;
  border: none;
  border-radius: 15px;
  padding: 7px 12px; // 상하 패딩을 7px로, 좌우 패딩을 12px로 증가
  font-size: 12px; // 기존 글자 크기에서 2px 줄임 (일반적으로 14px이 기본값이므로 12px로 설정)
  cursor: pointer;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 20px 10px; // 상단 마진을 20px로 유지
  height: 40px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: 1px solid #4CAF50;
  border-radius: 17px;
  padding: 0 15px;
  font-size: 16px;
  height: 100%;
  outline: none;
`;

const SearchIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: white;
  border: 1px solid #4CAF50; // 테두리 색상을 초록색으로 변경
  border-radius: 17px;
  margin-left: 10px;
`;

const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const MenuList = styled.ul`
  list-style-type: none;
  padding: 0 20px;
  margin: 20px 0 0; // 상단 마진을 20px로 설정
  flex: 1;
  overflow-y: auto;
`;

const MenuItem = styled.li`
  padding: 12px 0 10px 20px;
  border-bottom: ${props => props.isLast ? 'none' : '1px solid #E0E0E0'};
  cursor: pointer;
`;

const MenuPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const menuItems = [
    { name: '내 소비 현황', path: '/spend' },
    { name: '내 대출 현황', path: '/loan' },
    { name: '내 무 ZIP', path: '/capsule-search' },
    { name: '내 무 캡슐', path: '/my-capsule' },
    { name: '내 무비티아이', path: '/moobti' },
    { name: '챗봇', path: '/quiz' },
  ];

  // 초성 변환 함수 개선
  const getChosung = (str) => {
    const cho = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
    return str.split('').map(char => {
      const code = char.charCodeAt(0) - 44032;
      if (code > -1 && code < 11172) return cho[Math.floor(code / 588)];
      return char;
    }).join('');
  };

  // 검색 함수 개선
  const filterMenuItems = (items, term) => {
    if (!term) return items;
    const lowerTerm = term.toLowerCase();
    const chosungTerm = getChosung(term);
    return items.filter(item => {
      const lowerName = item.name.toLowerCase();
      const chosungName = getChosung(item.name);
      return lowerName.includes(lowerTerm) || 
             chosungName.includes(chosungTerm) ||
             lowerName.replace(/\s+/g, '').includes(lowerTerm.replace(/\s+/g, ''));
    });
  };

  // 실시간으로 필터링된 메뉴 아이템
  const filteredItems = filterMenuItems(menuItems, searchTerm);

  // 마이페이지로 이동하는 함수
  const goToMyPage = () => {
    navigate('/user');
  };

  return (
    <PageContainer>
      <KimpaPanel>
        <KimpaText onClick={goToMyPage}>
          김싸피님 
          <KimpaArrow>
            <img src={RightButton} alt="오른쪽 화살표" width="20" height="20" style={{ verticalAlign: 'middle' }} />
          </KimpaArrow>
        </KimpaText>
        <LogoutButton>로그아웃</LogoutButton>
      </KimpaPanel>

      <SearchContainer>
        <SearchInput 
          placeholder="검색어를 입력하세요" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchIconContainer>
          <SearchIcon src={SearchIconSvg} alt="검색" />
        </SearchIconContainer>
      </SearchContainer>

      <MenuList>
        {filteredItems.map((item, index, array) => (
          <MenuItem 
            key={index} 
            onClick={() => navigate(item.path)}
            isLast={index === array.length - 1}
          >
            {item.name}
          </MenuItem>
        ))}
      </MenuList>
    </PageContainer>
  );
};

export default MenuPage;