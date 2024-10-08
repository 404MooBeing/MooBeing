import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import goToJourney from "../../assets/button/goToJourney.svg";
import leftButton from "../../assets/button/leftButton.svg";
import rightButton from "../../assets/button/rightButton.svg";
import leftButtonBlack from "../../assets/button/leftButtonBlack.svg";
import rightButtonBlack from "../../assets/button/rightButtonBlack.svg";

const BankLogo = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;

  @media (min-width: 600px) {
    width: 45px;
    height: 45px;
    margin-right: 15px;
  }
`;

const LoanInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LoanName = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 13px;

  @media (min-width: 600px) {
    font-size: 18px;
  }
`;

const LoanItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
`;

const NavigateButton = styled.button`
  margin: 2px 4px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  font-weight: 800;
  font-size: 5px;
`;

const NavigateImage = styled.img`
  width: 14px;
  height: 14px;

  @media (min-width: 600px) {
    width: 16px;
    height: 16px;
  }
`;

const InterestRate = styled.div`
  margin-left: auto;
  font-size: 10px;
  font-weight: bold;
  background-color: #e0eed2;
  padding: 5px 8px;
  border-radius: 10px;
  color: white;
  border: 2px solid transparent;

  @media (min-width: 600px) {
    font-size: 12px;
    padding: 8px 10px;
  }
`;

const LoanListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 260px;
  overflow: hidden;
  margin-top: 20px;
`;

const LoanListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  width: 100%;
`;

const ScrollButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DownImage = styled.img`
  width: 20px;
  height: 20px;
`;

const PageInfo = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin: 0 10px;
  color: #858585;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 260px;
  font-size: 18px;
  color: #858585;
`;

function LoanList({ loans }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loanData, setLoanData] = useState([]);
  const loansPerPage = 3;
  const navigate = useNavigate();

  useEffect(() => {
    if (loans && loans.length > 0) {
      setLoanData(loans);
      setIsLoading(false);
    }
  }, [loans]);

  if (isLoading) {
    return <LoadingContainer>대출 정보를 불러오는 중...</LoadingContainer>;
  }

  const handleScrollNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + loansPerPage;
      return nextIndex >= loans.length ? 0 : nextIndex;
    });
  };

  const handleScrollPrev = () => {
    setCurrentIndex((prevIndex) => {
      const prevIndexNew = prevIndex - loansPerPage;
      return prevIndexNew < 0 ? loans.length - loansPerPage : prevIndexNew;
    });
  };

  const handleLoanItemClick = (loanName) => {
    navigate(`/each-journey/${loanName}`);
  };

  const totalPages = Math.ceil(loanData.length / loansPerPage);
  const visibleLoans = loanData.slice(currentIndex, currentIndex + loansPerPage);
  const currentPage = Math.floor(currentIndex / loansPerPage) + 1;

  return (
    <>
      <LoanListContainer listLength={loanData.length}>
        <LoanListWrapper>
          {visibleLoans.map((loan, index) => (
            <LoanItem
              key={index}
              onClick={() => handleLoanItemClick(loan.loanProductName)}
            >
              <BankLogo src={loan.bankImageUrl} alt="로고" />
              <LoanInfo>
                <LoanName>
                  <div>{loan.loanProductName}</div>
                  <NavigateButton>
                    <NavigateImage src={goToJourney} alt="여정지도" />
                  </NavigateButton>
                </LoanName>
                <div>{loan.remainingBalance.toLocaleString()} 원</div>
              </LoanInfo>
              <InterestRate>
                {loan.interestRate.toFixed(2)}%
              </InterestRate>
            </LoanItem>
          ))}
        </LoanListWrapper>
      </LoanListContainer>
      {loanData.length > loansPerPage && (
        <ScrollButton>
          <DownImage
            src={currentPage > 1 ? leftButtonBlack : leftButton}
            alt="이전"
            onClick={handleScrollPrev}
          />
          <PageInfo>
            {currentPage} / {totalPages}
          </PageInfo>
          <DownImage
            src={currentPage < totalPages ? rightButtonBlack : rightButton}
            alt="다음"
            onClick={handleScrollNext}
          />
        </ScrollButton>
      )}
    </>
  );
}

export default LoanList;
