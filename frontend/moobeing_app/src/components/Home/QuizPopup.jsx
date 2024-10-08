import { useState, useEffect, } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import babyRad from "../../assets/radishes/babyRad.svg";
import closeButton from "../../assets/button/closeButton.svg";
import useUserStore from "../../store/UserStore";
import { getColdQuiz, getNotStartedEconomicQuiz } from "../../apis/QuizApi";

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

const Container = styled.div`
  background-color: #f5fded;
  border-radius: 20px;
  width: 90%;
  margin: 7% 0 3% 0;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  color: #24272d;
  box-shadow: 3px 3px 3px #d9d9d9;
  animation: ${(props) =>
    props.$isclosing
      ? css`
          ${fadeOut} 0.5s ease-out forwards
        `
      : "none"};
  transition: opacity 0.5s ease-out;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 6px;
  right: 5px;
  background: none;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
`;

const CloseImg = styled.img`
  width: 15px;
`;

const SubTitle = styled.h2`
  position: absolute;
  top: 35px;
  left: 35px;
  font-size: 18px;
  font-weight: 800;
  text-align: left;

  @media (min-width: 600px) {
    top: 40px;
    left: 55px;
    font-size: 22px;
  }
`;

const Radish = styled.img`
  height: 150px; /* 적절한 크기로 설정 */
  margin-top: 55px;
`;

const QuizButton = styled.button`
  background-color: #E0EED2;
  border: none;
  padding: 10px 20px;
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  color: #5E5054;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 효과 추가 */
  transition: all 0.2s ease-in-out; /* 버튼 클릭 시 애니메이션 추가 */
  font-family: 'mainFont';

  &:active {
    background-color: #a6c08f; /* 클릭 시 더 어두운 색상 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 클릭 시 그림자 효과 줄임 */
    transform: translateY(0); /* 클릭 시 원래 위치로 돌아옴 */
  }
`;

const QuizPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [quizType, setQuizType] = useState("");
  const navigate = useNavigate();
  const quizId = null; // 실제로는 API 호출 또는 다른 방법으로 설정될 것
  const user = useUserStore();
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 500);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getColdQuiz()
        if (!data.exist){
          // 경제 퀴즈 만들기
          const quiz = await getNotStartedEconomicQuiz();
        }
        const check = await getColdQuiz()
        if (check.exist){
          setIsVisible(true)
          setQuizType(data.quizType)
        }
      } catch (error) {
        console.error("퀴즈 데이터 가져오기 실패:", error);
      }
    };  
    fetchData();
  }, []);


  

  console.log(useUserStore.getState())

  const handleQuiz = () => {
    if (quizType === "expense")
      navigate(`/quiz`);
    else 
      navigate('/economy-quiz')
  };

  if (!isVisible) return null;

  return (
    <Container $isclosing={isClosing}>
      <CloseButton onClick={handleClose}>
        <CloseImg src={closeButton} alt="닫기" />
      </CloseButton>
      <SubTitle>
        {user.userInfo.name || "사용자"}님, {quizType === "expense" ? "소비내역 맞추기" : "경제 단어 맞추기"}
        <br />
        퀴즈가 도착했어요!
      </SubTitle>
      <Radish src={babyRad} alt="Radish" />
      <QuizButton onClick={handleQuiz}>퀴즈 풀고 무 뽑으러 가기</QuizButton>
    </Container>
  );
}

export default QuizPopup;