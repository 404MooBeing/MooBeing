import styled, { keyframes } from "styled-components";
import useDateStore from "../../store/DateStore";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/UserStore";

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
  border: 3px solid #348833;
  width: 90%;
  margin-top: 3vh;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px;
  box-sizing: border-box;
`;

const SpendSum = styled.span`
  font-weight: 700;
`;

// 반짝이는 애니메이션 적용
const AnalyzeButton = styled.span`
  font-weight: 800;
  color: #348833;
  cursor: pointer;
  animation: ${sparkle} 1.5s infinite; /* 1.5초마다 반복 */
`;

const HorizontalText = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin-top: 5px;
`

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
  color: ${(props) => (props.active ? "#24272D" : "#AFAFAF")};
  border-radius: 10px;
  margin: 0 5px;
  transition: all 0.3s ease;
`;

const MonthText = styled.span`
  font-weight: 700;
  font-size: 18px;
  margin-right: 8px;

  @media (min-width: 600px) {
    margin-right: 10px;
  }
`;

const PageTitle = ({ totalExpense, setViewMode, viewMode }) => {
  const { selectedDate } = useDateStore(); // Zustand로부터 date 가져오기
  const navigate = useNavigate();
  const user = useUserStore();

  const toggle = (mode) => {
    setViewMode(mode);
  };

  const goToMoobtiPage = () => {
    navigate("/moobti");
  };

  const userName = user.userInfo.name ? user.userInfo.name : "사용자";

  // 현재 날짜의 월을 가져옴
  const currentMonth = dayjs().format("MM");

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
        <MonthText>{currentMonth}월의</MonthText>
        <HorizontalText>
          <SpendSum>소비 무비티아이 검사</SpendSum>
          <AnalyzeButton onClick={goToMoobtiPage}>시작하기</AnalyzeButton>
        </HorizontalText>
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
