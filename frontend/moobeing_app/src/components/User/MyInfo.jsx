import PropTypes from "prop-types";
import styled from "styled-components";
import useUserStore from "../../store/UserStore";
import RadishCoinImg from "../../assets/coin/RadishCoin.png";
// import { getUserInfo } from "../../apis/UserApi";
import { useEffect, useState } from "react";



const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
`;

const PasswordChangeButton = styled.button`
  margin: 0;
  font-size: 12px;
  padding: 8px;
  cursor: pointer;
  border: none;
  font-weight: 500;
  background-color: ${(props) =>
    props.isactive === "true" ? "#348833" : "#e0eed2"};
  color: ${(props) => (props.isactive === "true" ? "#ffffff" : "#24272D")};
  border-radius: 10px;

  @media (min-width: 600px) {
    font-size: 14px;
    padding: 10px;
  }
`;

const SubHeader = styled.div`
  background-color: #f5fded;
  height: 14vh;
  width: 90%;
  margin-bottom: 5%;
  margin-top: 40px;
  border-radius: 20px;
  justify-content: space-between;
  align-items: center;
  padding: 30px 15px 20px 25px;
  box-sizing: border-box;
  font-size : 20px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  width: 90%;
  box-sizing: border-box;
`;

const SubTitle = styled.h3`
  margin-bottom: 4vh;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 30px;
  padding: 0px 2px;
`;

const Label = styled.div`
  font-weight: bold;
`;

const Value = styled.div`
  text-align: right;
`;

const RadishCoin = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    height : 50%;
`;

const RadishCoinBtn = styled.button`
    margin-left:40px;
    height: 60%;
    margin-right: 20px;
    width: 85px;
    background-color: #e0eed2;
    color: #24272d;
    border-radius: 10px;
    font-size: 13px;
    font-weight: bold;
    justify-content: center;
      border: none;
  cursor: pointer;
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


// 생년월일을 "YYYY-MM-DD" 형식으로 변환하는 함수
const formatBirthday = (birthday) => {
  if (!birthday || birthday.length !== 6) return "";

  const yearPrefix = parseInt(birthday.slice(0, 2), 10) <= 50 ? "20" : "19"; // 50 이하일 경우 2000년대, 그 이상은 1900년대 가정
  const year = yearPrefix + birthday.slice(0, 2);
  const month = birthday.slice(2, 4);
  const day = birthday.slice(4, 6);

  return `${year}-${month}-${day}`;
};



const MyInfo = ({ onPasswordChangeClick }) => {
  // Zustand 스토어에서 필요한 상태와 함수 가져오기
  const [userInfo, setUserInfo] = useState({
    name: "김싸피",
    birthday: "980321",
    email: "mooch@ssafy.edu",
    gender: "M",
    id : "ssafy11",
    coin : 10000
  })
//   const setUserInfo = useUserStore((state) => state.setUserInfo);

    const [showComponent, setShowComponent] = useState("info");

    const toggle = () => {
        if (showComponent === "info"){
            setShowComponent("collection")
        }else{
            setShowComponent("info")
        }

      };


  const logout = useUserStore((state) => state.logout); // 로그아웃 액션 가져오기

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const userData = await getUserInfo(); // 사용자 정보 가져오기
         // Zustand 스토어에 저장
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };

    fetchData();
  }, [setUserInfo]);

  // 생년월일 형식 변환
  const formattedBirthday = formatBirthday(userInfo.birthday);

  // 성별 표시 함수
  const getGenderDisplay = (gender) => {
    if (!gender) return "";
    return gender === "M" ? "남성" : gender === "F" ? "여성" : "";
  };

  return (
    <Container>
      
      <SubHeader>
        <div>{userInfo.name || "사용자"} 님</div>
        <RadishCoin>
            <img src={RadishCoinImg}></img>
            <Label>무 코인</Label>
            <Value>{userInfo.coin}개</Value>
            <RadishCoinBtn>송금하기</RadishCoinBtn>
        </RadishCoin>
      </SubHeader>
      <Toggle onClick={toggle}>
        <ToggleItem
          active={showComponent === 'info'}
          onClick={toggle}
        >
          내 정보
        </ToggleItem>
        |
        <ToggleItem
          active={showComponent === 'collection'}
          onClick={toggle}
        >
          무 컬렉션
        </ToggleItem>
      </Toggle>
      <Contents>
        <SubTitle>개인정보</SubTitle>
        <InfoRow>
          <Label>아이디</Label>
          <Value>{userInfo.id}</Value>
        </InfoRow>
        <InfoRow>
          <Label>생년월일</Label>
          <Value>{formattedBirthday}</Value>
        </InfoRow>
        <InfoRow>
          <Label>이메일</Label>
          <Value>{userInfo.email || ""}</Value>
        </InfoRow>
      </Contents>
      <PasswordChangeButton onClick={onPasswordChangeClick}>
          비밀번호 변경
    </PasswordChangeButton>
    </Container>
  );
};

MyInfo.propTypes = {
  onPasswordChangeClick: PropTypes.func.isRequired,
};

export default MyInfo;
