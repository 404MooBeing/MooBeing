import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import leftButton from "../../assets/button/leftButton.svg";
import rightButton from "../../assets/button/rightButton.svg";
import leftButtonBlack from "../../assets/button/leftButtonBlack.svg";
import rightButtonBlack from "../../assets/button/rightButtonBlack.svg";
import foodIcon from "../../assets/SpendIcons/foodIcon.png";
import healthIcon from "../../assets/SpendIcons/healthIcon.png";
import leisureIcon from "../../assets/SpendIcons/leisureIcon.png";
import loanIcon from "../../assets/SpendIcons/loanIcon.png";
import pleasureIcon from "../../assets/SpendIcons/pleasureIcon.png";
import trafficIcon from "../../assets/SpendIcons/trafficIcon.png";
import basicRad from "../../assets/radishes/basicRad.svg";

const iconMapping = {
  식비: foodIcon,
  건강: healthIcon,
  문화: leisureIcon,
  대출: loanIcon,
  유흥: pleasureIcon,
  교통: trafficIcon,
};

const Icon = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const PaymentItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
`;

const PaymentListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 97%;
  height: 260px;
  overflow: hidden;
  margin: 20px 0;
  padding-left: 10px;
  position: relative;
`;

const PaymentListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  width: 100%;
  flex-grow: 1;
`;

const ScrollButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ScrollButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavigationImage = styled.img`
  width: 20px;
  height: 20px;
`;

const PageInfo = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin: 0 10px;
`;

const PaymentInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Price = styled.div`
  font-size: 15px;
  font-weight: 600;
`;

const NoPaymentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
`;

const NoPaymentsImage = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
`;

const NoPaymentsText = styled.div`
  font-size: 16px;
  color: #555;
`;

function PaymentList({ payments }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const loansPerPage = 4;
  const totalPages = Math.ceil(payments.length / loansPerPage);

  const handleScrollNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + loansPerPage;
      return nextIndex >= payments.length ? prevIndex : nextIndex;
    });
  };

  const handleScrollPrev = () => {
    setCurrentIndex((prevIndex) => {
      const prevIndexNew = prevIndex - loansPerPage;
      return prevIndexNew < 0 ? 0 : prevIndexNew;
    });
  };

  const visiblePayments = payments.slice(
    currentIndex,
    currentIndex + loansPerPage
  );
  const currentPage = Math.floor(currentIndex / loansPerPage) + 1;

  return (
    <>
      <PaymentListContainer>
        {payments.length === 0 ? (
          <NoPaymentsContainer>
            <NoPaymentsImage src={basicRad} alt="No payments" />
            <NoPaymentsText>소비 내역이 없습니다.</NoPaymentsText>
          </NoPaymentsContainer>
        ) : (
          <PaymentListWrapper>
            {visiblePayments.map((payment) => {
              const iconSrc = iconMapping[payment.categoryName] || basicRad;
              const title = payment.title || "Unknown";
              const price = payment.price || 0;

              return (
                <PaymentItem key={payment.id}>
                  {" "}
                  {/* payment.id를 고유한 키로 사용 */}
                  <Icon src={iconSrc} alt={payment.categoryName} />
                  <PaymentInfo>
                    {title.length > 7 ? `${title.slice(0, 7)} ...` : title}
                    <Price>{price.toLocaleString()}원</Price>
                  </PaymentInfo>
                </PaymentItem>
              );
            })}
            <ScrollButtonContainer>
              <ScrollButton onClick={handleScrollPrev}>
                <NavigationImage
                  src={currentPage > 1 ? leftButtonBlack : leftButton}
                  alt="이전"
                />
              </ScrollButton>
              <PageInfo>
                {currentPage}/{totalPages}
              </PageInfo>
              <ScrollButton onClick={handleScrollNext}>
                <NavigationImage
                  src={
                    currentPage < totalPages ? rightButtonBlack : rightButton
                  }
                  alt="다음"
                />
              </ScrollButton>
            </ScrollButtonContainer>
          </PaymentListWrapper>
        )}
      </PaymentListContainer>
    </>
  );
}

PaymentList.propTypes = {
  payments: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      categoryName: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default PaymentList;