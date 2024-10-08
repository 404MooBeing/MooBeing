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
  padding-bottom: 150px;
`;

const Toggle = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const ToggleItem = styled.span`
  font-size: 18px;
  color: ${(props) => (props.active ? "black" : "gray")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  margin: 15px;
  cursor: pointer;
`;

const MyPage = () => {
  const [showComponent, setShowComponent] = useState("info");

  const toggle = (component) => {
    setShowComponent(component);
  };

  const [userInfo, setUserInfo] = useState({
    name: "김싸피",
    birthday: "980321",
    email: "mooch@ssafy.edu",
    gender: "M",
    id: "ssafy11",
    nickname: "닉네임",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserInfo(); // 사용자 정보 가져오기
        setUserInfo(userData);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <MyInfoHeader userInfo={userInfo} />
      <Toggle>
        <ToggleItem
          active={showComponent === "info"}
          onClick={() => toggle("info")}
        >
          내 정보
        </ToggleItem>
        |
        <ToggleItem
          active={showComponent === "collection"}
          onClick={() => toggle("collection")}
        >
          무 컬렉션
        </ToggleItem>
      </Toggle>
      {showComponent === "info" ? (
        <MyInfo userInfo={userInfo} />
      ) : (
        <MyRadish />
      )}
    </Container>
  );
};

export default MyPage;
