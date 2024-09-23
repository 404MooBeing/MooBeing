import React, { useState, useEffect } from "react";
import styled from "styled-components";
import radishImage from "../../assets/radishes/basicRad.svg";
import { getLoanPercent } from "../../apis/LoanApi";
import useUserStore from "../../store/UserStore";

const BarContainer = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 0px;
  padding: 10%;
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
  width: ${({ fillpercent }) => fillpercent}%;
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

function PercentBar() {
  const { userInfo } = useUserStore((state) => ({
    userInfo: state.userInfo,
  }));

  const [fillpercent, setFillPercent] = useState(0); // 기본값을 0으로 설정
  const [error, setError] = useState(false); // 데이터 유무를 판단하기 위한 에러 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLoanPercent();
        const remainingPercent = response.remainingPercent || 0; // 데이터를 받아오지 못할 경우 기본값을 0으로 설정

        if (remainingPercent > 0) {
          setFillPercent(remainingPercent); // 데이터를 받아올 경우 상태 업데이트
        } else {
          setError(true); // 데이터가 없는 경우 에러 상태를 true로 설정
        }
      } catch (error) {
        console.error("Failed to fetch loan percent data:", error);
        setError(true); // 오류 발생 시 에러 상태를 true로 설정
      }
    };

    fetchData();
  }, []);

  // 기본 무 이미지 설정
  const radishImgUrl = userInfo?.radishImageUrl || radishImage;

  return (
    <BarContainer>
      <GraphContainer>
        <GraphFill fillpercent={fillpercent}>
          <Radish src={radishImgUrl} alt="Radish" />
        </GraphFill>
      </GraphContainer>
      {error ? (
        <Text>상환 내역이 없습니다.</Text> // 데이터가 없을 경우 표시할 텍스트
      ) : (
        <Text>{fillpercent.toFixed(2)}% 상환했습니다!</Text> // 데이터가 있을 경우 표시할 텍스트
      )}
    </BarContainer>
  );
}

export default PercentBar;