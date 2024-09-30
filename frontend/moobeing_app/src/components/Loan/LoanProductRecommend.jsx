import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import babyRad from "../../assets/radishes/babyRad.svg";
import closeButton from "../../assets/button/closeButton.svg";

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
  margin: 8% 0 3% 0;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
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

const Title = styled.h2`
  font-size: 18px;
  font-weight: 800;
  text-align: left;
  margin-bottom: 15px;
  align-self: flex-start;
`;

const ProductList = styled.div`
  width: 100%;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 12px;
  background: none;
  border: none;
  font-size: 1.5rem;
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
  margin-top: 35px;
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 효과 추가 */
  transition: all 0.2s ease-in-out; /* 버튼 클릭 시 애니메이션 추가 */
  font-family: 'mainFont';

  &:active {
    background-color: #a6c08f; /* 클릭 시 더 어두운 색상 */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 클릭 시 그림자 효과 줄임 */
    transform: translateY(0); /* 클릭 시 원래 위치로 돌아옴 */
  }
`;

const ProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: white;
  border-radius: 10px;
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ProductLogo = styled.div`
  width: 30px;
  height: 30px;
  background-color: #3182f6;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  margin-right: 10px;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.span`
  font-weight: bold;
`;

const InterestRate = styled.span`
  color: #666;
`;

const ApplyButton = styled.button`
  background-color: #f2f4f6;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  color: #333;
  font-weight: bold;
  cursor: pointer;
`;

const LoanProductRecommend = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate();
  const quizId = null; // 실제로는 API 호출 또는 다른 방법으로 설정될 것
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 500);
  };

  const handleQuiz = () => {
    navigate(`/quiz/result/${quizId}`);
  };

  const dummyProducts = [
    { name: "참대출", rate: "금리 3.1%" },
    { name: "대출고민바이", rate: "금리 2.9%" },
  ];

  if (!isVisible) return null;

  return (
    <Container $isclosing={isClosing}>
      <CloseButton onClick={handleClose}>
        <CloseImg src={closeButton} alt="닫기" />
      </CloseButton>
      <Title>싸피님 추천 대출 상품</Title>
      <ProductList>
        {dummyProducts.map((product, index) => (
          <ProductItem key={index}>
            <ProductInfo>
              <ProductLogo>S</ProductLogo>
              <ProductDetails>
                <ProductName>{product.name}</ProductName>
                <InterestRate>{product.rate}</InterestRate>
              </ProductDetails>
            </ProductInfo>
            <ApplyButton>가입하기</ApplyButton>
          </ProductItem>
        ))}
      </ProductList>
      <QuizButton onClick={handleQuiz}>퀴즈 풀고 무 뽑으러 가기</QuizButton>
    </Container>
  );
}

export default LoanProductRecommend;