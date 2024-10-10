import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SearchIconSvg from '../assets/button/SearchButton.svg';
import RightButton from '../assets/button/rightButtonBlack.svg';
import useUserStore from '../store/UserStore';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0 auto;
  background-color: #ffffff;
`;

const KimpaPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #F5FDED;
  padding: 25px 0;
  margin-bottom: 10px;
`;

const KimpaInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 88%;
  margin-bottom: 15px;
`;

const KimpaText = styled.span`
  font-weight: bold;
  display: flex;
  align-items: center; 
  cursor: pointer;
`;

const KimpaArrow = styled.span`
  margin-left: 7px; /* 화살표와 텍스트 사이의 간격 */
`;

const LogoutButton = styled.button`
  font-size: 13px;
  padding: 8px 10px;
  cursor: pointer;
  border: none;
  font-weight: 900;
  font-family: 'mainFont';
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  background-color: ${(props) =>
    props.isactive === "true" ? "#348833" : "#e0eed2"};
  color: ${(props) => (props.isactive === "true" ? "#ffffff" : "#5E5054")};
  border-radius: 10px;

  @media (min-width: 600px) {
    font-size: 15px;
    padding: 10px;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 88%;
  height: 40px;
  box-sizing: border-box;
  overflow: hidden;
  margin: 10px 0;
`;

const SearchInput = styled.input`
  flex: 1;
  border: 2px solid #e0eed2;
  border-radius: 17px;
  font-size: 16px;
  height: 100%;
  outline: none;
  padding: 0 15px;
  font-family: 'mainFont';
  box-sizing: border-box;

  
  @media (max-width: 350px) {
    width: 200px;/* 모바일 화면에서 너비 조정 */
  }
`;

const SearchIcon = styled.img`
  position: absolute;
  right: 3%;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const MenuTitle = styled.div`
  margin-left: 4px;
  margin-bottom: 10px;
  color: #a2a2a2;
`

const MenuList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 20px auto 0;  /* 상단에 20px, 좌우는 자동으로 중앙 정렬 */
  width: 85%;           /* 화면 너비의 85%로 설정 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: auto;
`;

const MenuItem = styled.li`
  padding: 12px 0 10px 5px;
  border-bottom: ${(props) => (props.isLast ? 'none' : '1px solid #E0E0E0')};
  cursor: pointer;
  text-align: left;
  font-weight: 600;
`;

const MenuPage = () => {
  const navigate = useNavigate();
  const { userInfo, logout } = useUserStore();
  const [searchTerm, setSearchTerm] = useState('');

  const menuItems = [
    { name: '내 소비 현황', path: '/spend' },
    { name: '내 대출 현황', path: '/loan' },
    { name: '내 무 ZIP', path: '/user?tab=collection' },
    { name: '내 무 캡슐', path: '/my-capsule' },
    { name: '내 무비티아이', path: '/moobti' },
    { name: '소비 퀴즈', path: '/quiz' },
    { name: '챗봇', path: '/chatbot' },
  ];

  const getChosung = (str) => {
    const cho = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
    return str.split('').map(char => {
      const code = char.charCodeAt(0) - 44032;
      if (code > -1 && code < 11172) return cho[Math.floor(code / 588)];
      return char;
    }).join('');
  };

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

  const filteredItems = filterMenuItems(menuItems, searchTerm);

  const goToMyPage = () => {
    navigate('/user?tab=info');
  };

  const handleLogout = () => {
    logout(); // Zustand의 logout 액션 호출
    navigate('/login'); // 로그아웃 후 로그인 페이지로 리디렉션
  };

  return (
    <PageContainer>
      <KimpaPanel>
        <KimpaInfo>
          <KimpaText onClick={goToMyPage}>
            {userInfo.name || "사용자"} 님
            <KimpaArrow>
              <img src={RightButton} alt="오른쪽 화살표" width="20" height="20" style={{ verticalAlign: 'middle' }} />
            </KimpaArrow>
          </KimpaText>
          <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
        </KimpaInfo>
        <SearchContainer>
          <SearchInput 
            placeholder="검색어를 입력하세요" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon src={SearchIconSvg} alt="검색"/>
        </SearchContainer>
      </KimpaPanel>

      <MenuList>
        <MenuTitle>
          전체 메뉴
        </MenuTitle>
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
