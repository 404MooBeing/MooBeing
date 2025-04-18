import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
`;

const PasswordChangeButton = styled.button`
  margin-top: 10vh;
  font-size: 15px;
  padding: 10px 15px;
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

  const onPasswordChangeClick = () => {
    navigate('/password-change')
  }

  // 생년월일 형식 변환
  const formattedBirthday = formatBirthday(userInfo.birthday);

  return (
    
    <Container>
      <Contents>
        <SubTitle>개인정보</SubTitle>
        <InfoRow>
          <Label>닉네임</Label>
          <Value>{userInfo.name}</Value>
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
