import React, { useState, useEffect } from "react";
import styled from "styled-components";
import radishImage from "../../assets/radishes/basicRad.png";
import useUserStore from "../../store/UserStore";

const BarContainer = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 0px;
  padding: 30px 0;
`;

const GraphContainer = styled.div`
  width: 100%;
  background-color: #c0dda6; /* 고정된 배경색 */
  height: 30px;
  border-radius: 20px;
  overflow: visible;
  position: relative;
`;

const GraphFill = styled.div`
  background-color: #658b65; /* 배경색보다 더 진한 색 */
  height: 100%;
  border-radius: 20px;
  width: ${({ fillpercent }) => fillpercent}% ;
  transition: width 2s ease; /* 부드러운 채우기 애니메이션 */
  position: relative;
  display: flex;
  justify-content: flex-end; /* Radish가 항상 오른쪽 끝에 위치 */
  align-items: center; /* Radish를 세로로 중앙 정렬 */
`;

const Radish = styled.img`
  height: 60px; /* 그래프 밖으로 삐져나오도록 크기 설정 */
  position: absolute;
  top: -19px; /* 그래프 위쪽으로 조금 삐져나오도록 조정 */
  transform: translateX(30px); /* 오른쪽으로 약간 이동 */
  transition: left 2s ease;
`;

const Text = styled.div`
  margin-top: 5%;
  font-weight: 600;
`;

function PercentBar({ percent }) {
  const { userInfo } = useUserStore();
  const [fillPercent, setFillPercent] = useState(0); // 기본값을 0으로 설정
  const [error, setError] = useState(false); // 데이터 유무를 판단하기 위한 에러 상태

  useEffect(() => {
    // percent 값이 유효한 경우 상태 업데이트
    if (percent > 0) {
      setFillPercent(percent); // props로 넘겨받은 percent 값 사용
    } else {
      setError(true); // percent 값이 없거나 0 이하일 때 에러 상태
    }
  }, [percent]); // percent 값이 변경될 때마다 effect 실행

  // 기본 무 이미지 설정
  const radishImgUrl = userInfo?.radishImageUrl || radishImage;

  return (
    <BarContainer>
      <GraphContainer>
        <GraphFill fillpercent={fillPercent}>
          <Radish src={radishImgUrl} alt="Radish" />
        </GraphFill>
      </GraphContainer>
      {error ? (
        <Text>상환 내역이 없습니다.</Text> // 데이터가 없는 경우 표시할 텍스트
      ) : (
        <Text>{fillPercent.toFixed(2)}% 상환했습니다!</Text> // 데이터가 있는 경우 표시할 텍스트
      )}
    </BarContainer>
  );
}

export default PercentBar;
