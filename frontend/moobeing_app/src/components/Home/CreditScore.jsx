import { useEffect, useState } from "react";
import styled from "styled-components";
import { darken } from "polished"; // polished에서 darken 가져오기
import radish from "../../assets/radishes/basicRad.svg";
import useUserStore from "../../store/UserStore";
import { getCreditRate } from "../../apis/UserApi";

// 신용등급별 색상
const GraphColors = {
  A: "#85BD85",
  B: "#C0DDA6",
  C: "#DDD1A6",
  D: "#DDBDA6",
  E: "#DDA6A6",
};

// 신용등급별 다음 등급 맵핑
const NextGrade = {
  A: null, // 다음 등급 없음
  B: "A",
  C: "B",
  D: "C",
  E: "D",
};

const Container = styled.div`
  background-color: #f5fded;
  border-radius: 20px;
  width: 90%;
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 모든 요소를 수직 중앙 정렬 */
  align-items: center; /* 모든 요소를 수평 중앙 정렬 */
  padding: 8%;
  box-sizing: border-box;
`;

const SubHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SubTitle = styled.div`
  margin: 0;
  font-size: 22px;
  font-weight: 700;

  @media (min-width: 600px) {
    font-size: 27px;
  }
`;

const CreditLevel = styled.div`
  background-color: ${({ $grade }) =>
    GraphColors[$grade]}; /* 배경색을 등급별로 설정 */
  font-size: 1rem;
  font-weight: bold;
  border-radius: 15px; /* 모서리를 약간 둥글게 */
  text-align: center;
  padding: 5px 10px;
`;

const GraphContainer = styled.div`
  width: 100%;
  background-color: ${({ $grade }) => GraphColors[$grade]};
  height: 30px;
  border-radius: 20px;
  overflow: visible;
  position: relative;
  margin: 15px 0px;
`;

const GraphFill = styled.div.attrs(({ $fillpercent }) => ({
  style: {
    width: `${$fillpercent}%`,
  },
}))`
  background-color: ${({ $grade }) => darken(0.3, GraphColors[$grade])};
  height: 100%;
  border-radius: 20px;
  transition: width 2s ease;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Radish = styled.img`
  height: 60px;
  position: absolute;
  top: -20px;
  right: -33px; // 오른쪽에 고정
  transition: right 2s ease;
`;

const CreditText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;

  @media (min-width: 600px) {
    font-size: 20px;
  }
`;

const CreditScore = () => {
  const { userInfo, creditRate, setCreditRate } = useUserStore(); // creditRate 가져오기 및 setCreditRate 추가
  const [creditInfo, setCreditInfo] = useState(creditRate); // userStore에서 가져온 기본값 사용

  // API 호출을 통한 신용등급 데이터 가져오기 및 상태 업데이트
  useEffect(() => {
    const fetchCreditRate = async () => {
      try {
        const data = await getCreditRate(); // API 호출
        // 신용등급 값이 음수일 경우 최소값 0으로 설정
        const updatedCreditInfo = {
          ratingName: data.ratingName,
          ratingPercent: Math.max(data.ratingPercent, 0),
        };
        setCreditInfo(updatedCreditInfo); // 로컬 상태 업데이트
        setCreditRate(updatedCreditInfo); // userStore 업데이트
      } catch (error) {
        console.error("신용등급 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchCreditRate(); // 컴포넌트가 마운트될 때 API 호출
  }, [setCreditRate]);

  // 다음 등급 달성 시까지 남은 퍼센트
  const remainingPercent = 100 - creditInfo.ratingPercent;

  // 다음 등급 결정
  const nextGrade = NextGrade[creditInfo.ratingName];

  // 텍스트 표시
  const displayText =
    creditInfo.ratingName === "A" && creditInfo.ratingPercent >= 100
      ? "최고 등급 달성"
      : `${nextGrade}등급까지 ${remainingPercent.toFixed(0)}점`;

  // 기본 이미지 정해두고 정보 들어오면 그걸로
  const radishImage = userInfo?.radishImageUrl || radish;

  return (
    <Container>
      <SubHeader>
        <SubTitle>나의 신용등급</SubTitle>
        <CreditLevel $grade={creditInfo.ratingName}>
          {creditInfo.ratingName}
        </CreditLevel>
      </SubHeader>
      <GraphContainer $grade={creditInfo.ratingName}>
        <GraphFill
          $grade={creditInfo.ratingName}
          $fillpercent={creditInfo.ratingPercent}
        >
          <Radish src={radishImage} alt="Radish" />
        </GraphFill>
      </GraphContainer>
      <CreditText>{displayText}</CreditText>
    </Container>
  );
};

export default CreditScore;