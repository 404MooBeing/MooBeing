import styled, { keyframes } from "styled-components";
import radish from "../../assets/radishes/basicRad.svg";

// 배경 색상과 회전 애니메이션 설정
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #e0eed2;
`;

const ItemContainer = styled.div`
  margin-top: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h2`
  top: 20%;
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Radish = styled.img`
  width: 100px;
  height: 100px;
  animation: ${rotate} 2s linear infinite; /* 2초 동안 회전하며 반복 */
`;

function FindingLocation() {
  return (
    <Container>
      <ItemContainer>
        <Title>현재 위치를 찾고 있습니다.</Title>
        <Radish src={radish} alt="Loading Radish" />
      </ItemContainer>
    </Container>
  );
}

export default FindingLocation;
