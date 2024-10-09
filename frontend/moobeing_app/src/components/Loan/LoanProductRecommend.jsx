import { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import closeButton from "../../assets/button/closeButton.svg";
import shinHan from "../../assets/banks/금융아이콘_SVG_신한.svg";
import hana from "../../assets/banks/금융아이콘_SVG_하나.svg";

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
  border: 3.5px solid #348833;
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
  animation: ${(props) =>
    props.$isclosing
      ? css`
          ${fadeOut} 0.5s ease-out forwards
        `
      : "none"};
  transition: opacity 0.5s ease-out;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 800;
  text-align: left;
  margin-bottom: 15px;
  align-self: center;
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

const ProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: white;
  border-radius: 10px;
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ProductLogo = styled.img`
  width: 38px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  margin-right: 15px;
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
  background-color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  color: #333;
  font-weight: bold;
  cursor: pointer;
  font-size: 16px;
  font-family: 'mainFont';
  text-decoration: underline;
  text-underline-position : under;
  text-decoration-thickness: 1.5px;
`;

const LoanProductRecommend = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 500);
  };

  const dummyProducts = [
    { image: shinHan, name: "참신한", rate: "금리 11.9%", url: "https://www.shinhansavings.com/PD_0139" },
    { image: hana, name: "BEST 신용대출", rate: "금리 6.5%", url: "https://www.kebhana.com/cont/mall/mall08/mall0802/mall080204/1431602_115200.jsp" },
  ];

  if (!isVisible) return null;

  return (
    <Container $isclosing={isClosing}>
      <CloseButton onClick={handleClose}>
        <CloseImg src={closeButton} alt="닫기" />
      </CloseButton>
      <Title>싸피님 추천 대출 상품</Title>
        {dummyProducts.map((product, index) => (
          <ProductItem key={index}>
            <ProductInfo>
              <ProductLogo src={product.image} alt="은행 로고"/>
              <ProductDetails>
                <ProductName>{product.name}</ProductName>
                <InterestRate>{product.rate}</InterestRate>
              </ProductDetails>
            </ProductInfo>
            <ApplyButton onClick={() => window.open(product.url, "_blank")}>가입하기</ApplyButton>
          </ProductItem>
        ))}
    </Container>
  );
}

export default LoanProductRecommend;