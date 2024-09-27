import styled, { keyframes } from "styled-components";
import useDateStore from "../../store/DateStore";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

// 반짝이는 애니메이션 정의
const sparkle = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const Title = styled.div`
  background-color: #f5fded;
  height: 20vh;
  width: 90%;
  margin-top: 3vh;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
`;

const AccentText = styled.span`
  font-weight: 700;
  font-size: 23px;
`;

const TitleText = styled.div`
  font-size: 20px;
  text-align: center;
`;

const Moobti = styled.div`
  border: 2px solid #348833;
  height: 8vh;
  width: 90%;
  margin-bottom: 5%;
  margin-top: 3vh;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
`;

const SpendSum = styled.span`
  font-weight: 700;
  margin-left: 8px;

  @media (min-width: 600px) {
    margin-left: 10px;
  }
`;

// 반짝이는 애니메이션 적용
const AnalyzeButton = styled.span`
  font-weight: 800;
  color: #348833;
  cursor: pointer;
  animation: ${sparkle} 1.5s infinite; /* 1.5초마다 반복 */
`;

const Toggle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const ToggleItem = styled.div`
  font-size: 16px;
  padding: 10px;
  cursor: pointer;
  font-weight: 700;
  color: ${(props) => (props.active ? "#AFAFAF" : "#24272D")};
  border-radius: 10px;
  margin: 0 5px;
  transition: all 0.3s ease;
`;

const PageTitle = ({ totalExpense, setViewMode, viewMode }) => {
  const { selectedDate } = useDateStore(); // Zustand로부터 date 가져오기
  const navigate = useNavigate();
  const dummyUserInfo = { name: "사용자" };

  const toggle = (mode) => {
    setViewMode(mode);
  };

  const goToMoobtiPage = () => {
    navigate("/moobti");
  };

  const userName = dummyUserInfo.name ? dummyUserInfo.name : "사용자";

  return (
    <>
      <Title>
        <TitleText>
          <AccentText>{userName}님</AccentText>
          의<br />
          <AccentText>{selectedDate.format("MM")}월</AccentText> 지출내역
        </TitleText>
      </Title>

      <Moobti>
        <SpendSum>소비 무비티아이 검사</SpendSum>
        <AnalyzeButton onClick={goToMoobtiPage}>시작하기</AnalyzeButton>
      </Moobti>

      <Toggle>
        <ToggleItem
          active={viewMode === "차트 보기"}
          onClick={() => toggle("차트 보기")}
        >
          차트 보기
        </ToggleItem>
        |
        <ToggleItem
          active={viewMode === "캘린더 보기"}
          onClick={() => toggle("캘린더 보기")}
        >
          캘린더 보기
        </ToggleItem>
      </Toggle>
    </>
  );
};

export default PageTitle;
