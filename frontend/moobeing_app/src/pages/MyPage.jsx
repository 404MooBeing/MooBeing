import { useState, useEffect } from "react";
import styled from "styled-components";
import MyInfo from "../components/User/MyInfo";
import MyRadish from "../components/User/MyRadish";
import MyInfoHeader from "../components/User/MyInfoHeader";
import { getUserInfo } from "../apis/UserApi";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
`;

const MainContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Toggle = styled.div`
    height: 20%;
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ToggleItem = styled.span`
    font-size : 20px;
  color: ${(props) => (props.active ? 'black' : 'gray')};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  margin : 0px 14px
`;


const MyPage = () => {

  const [showComponent, setShowComponent] = useState("info");

  const toggle = (props) => {

      setShowComponent(props)
    };

  const [userInfo, setUserInfo] = useState({
    name: "김싸피",
    birthday: "980321",
    email: "mooch@ssafy.edu",
    gender: "M",
    id : "ssafy11",
    nickname : "닉네임"
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserInfo(); // 사용자 정보 가져오기
        setUserInfo(userData)
         // Zustand 스토어에 저장
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };
    fetchData();
  }, [setUserInfo]);

  

  return (
    <Container>
      <MainContent>
        <MyInfoHeader userInfo={userInfo}/>
      <Toggle>
        <ToggleItem
          active={showComponent === 'info'}
          onClick={() => toggle("info")}
        >
          내 정보
        </ToggleItem>
        |
        <ToggleItem
          active={showComponent === 'collection'}
          onClick={() => toggle("collection")}
        >
          무 컬렉션
        </ToggleItem>
      </Toggle>
      {showComponent === 'info' ? <MyInfo userInfo={userInfo}/> : <MyRadish/>}
      </MainContent>
    </Container>
  );
};

export default MyPage;
