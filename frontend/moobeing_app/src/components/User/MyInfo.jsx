import PropTypes from "prop-types";
import styled from "styled-components";
// import useUserStore from "../../store/UserStore";
// import { getUserInfo } from "../../apis/UserApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
`;

const PasswordChangeButton = styled.button`
  margin-top: 200px;
  font-size: 12px;
  padding: 8px 14px;
  cursor: pointer;
  border: none;
  font-weight: 900;
  font: 14px;

  background-color: ${(props) =>
    props.isactive === "true" ? "#348833" : "#e0eed2"};
  color: ${(props) => (props.isactive === "true" ? "#ffffff" : "#24272D")};
  border-radius: 10px;

  @media (min-width: 600px) {
    font-size: 14px;
    padding: 10px;
  }
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



// 생년월일을 "YYYY-MM-DD" 형식으로 변환하는 함수
const formatBirthday = (birthday) => {
  if (!birthday || birthday.length !== 6) return "";

  const yearPrefix = parseInt(birthday.slice(0, 2), 10) <= 50 ? "20" : "19"; // 50 이하일 경우 2000년대, 그 이상은 1900년대 가정
  const year = yearPrefix + birthday.slice(0, 2);
  const month = birthday.slice(2, 4);
  const day = birthday.slice(4, 6);

  return `${year}-${month}-${day}`;
};



const MyInfo = ({userInfo}) => {

  const navigate = useNavigate()

  // const logout = useUserStore((state) => state.logout); // 로그아웃 액션 가져오기
  const [passwordChange, setPasswordChange] = useState(false)
  const onPasswordChangeClick = () => {
    navigate('/password-change')
  }

  // 생년월일 형식 변환
  const formattedBirthday = formatBirthday(userInfo.birthday);

  // 성별 표시 함수
  const getGenderDisplay = (gender) => {
    if (!gender) return "";
    return gender === "M" ? "남성" : gender === "F" ? "여성" : "";
  };

  return (
    
    <Container>
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
          비밀번호 변경하기
    </PasswordChangeButton>
    </Container>
  );
};

export default MyInfo;
