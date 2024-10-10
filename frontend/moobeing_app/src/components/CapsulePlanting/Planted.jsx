import styled from "styled-components";
import useCapsuleStore from "../../store/CapsuleStore";
import { useNavigate } from "react-router-dom";
const Title = styled.h1`
  font-size: 40px;
  text-align: center;
  margin-top: 30%;
`;

const Button = styled.button`
  position: absolute;
  color: white;
  left: 68%;
  bottom: 20vh;
  background: none; /* 배경 없앰 */
  border: none; /* 박스형식 제거 */
  font-size: 16px; /* 버튼 글 씨 크기 조정 */
  cursor: pointer; /* 버튼에 커서 스타일 적용 */
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.5); /* 버튼 글자에도 그림자 적용 */
  z-index: 100;
`;

const Date = styled.p`
  margin-top: 0%;
`;

function Planted({ response }) {
  const navigate = useNavigate();
  const { harvestAt } = useCapsuleStore();
  const handleClick = () => {
    console.log("방금심긴무 위치값 전달할 response", response);
    navigate("/my-map", { state: { justPlantedLocation: response } });
  };

  return (
    <>
      <Title>
        무캡슐이 <br /> 심어졌습니다.
      </Title>
      <Date> {harvestAt} 에 만나요!</Date>
      <Button onClick={handleClick}> 확인하러가기 </Button>
    </>
  );
}

export default Planted;
