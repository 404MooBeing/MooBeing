import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import DropDownArrow from "../../assets/dropdown/DropdownArrow.png";
import { getAccountBenefit } from "../../apis/AccountApi";

const Container = styled.div`
  background-color: #f5fded;
  height: 320px;
  width: 90%;
  max-width: 1200px;
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 8%;
  box-sizing: border-box;
  border-radius: 5%;
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

const PayButton = styled.button`
  padding: 10px 20px;
  background-color: #c0dda6;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 10px;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #b5c99a;
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }

  &:active {
    background-color: #a9b98e;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(0);
  }
`;

const CustomDropdownContainer = styled.div`
  position: relative;
  width: 170px;
  max-width: 300px;
  display: inline-block;
  margin: 10px 0;
`;

const CustomDropdownHeader = styled.div`
  padding: 8px 12px;
  font-size: 1rem;
  background-color: transparent;
  border-bottom: 1px solid #ccc;
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: url(${DropDownArrow});
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 15px 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  &:focus {
    border-bottom: 2px solid #4caf50;
  }
`;

const CustomDropdownList = styled.ul`
  position: absolute;
  width: 100%;
  max-height: 150px;
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const CustomDropdownItem = styled.li`
  padding: 8px;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    background-color: #c5e1ab;
  }

  ${(props) =>
    props.selected &&
    `
    background-color: #C5E1AB;
    font-weight: bold;
  `}
`;

const TextTag = styled.div`
  text-align: center;
  width: 100%;
`;

const MoneySpan = styled.span`
  font-weight: 700;
`;

const LastLine = styled.div`
  margin: 10px 0px;
`;

const AlertContainer = styled.div`
  position: fixed;
  top: 20vh;
  left: 50%;
  width: 70%;
  transform: translateX(-50%);
  background-color: rgba(144, 144, 144, 0.8);
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  z-index: 1000;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

function LeftMoney() {
  const [accountBenefit, setAccountBenefit] = useState({});
  const [selectedLoan, setSelectedLoan] = useState(""); // 선택된 대출 상품 상태
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 열림 상태
  const [interestBalance, setInterestBalance] = useState(0);
  const [showAlert, setShowAlert] = useState(false); // 커스텀 경고창 표시 상태
  const navigate = useNavigate(); // useNavigate 훅 사용

  const [remainingBalance, setRemainingBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  // 컴포넌트가 마운트될 때 계좌 혜택 데이터를 가져오기
  useEffect(() => {
    // 계좌 혜택 데이터 가져오기
    getAccountBenefit()
      .then((response) => {
        setAccountBenefit(response); // 계좌 혜택 상태 업데이트
        setRemainingBalance(response.accountLeftMoney || 0); // 초기 잔액 설정
      })
      .catch((error) => {
        console.error("계좌 혜택 데이터를 가져오는 중 오류 발생:", error);
      });
  }, []);

  // const remainingBalance = accountBenefit.accountLeftMoney || 0;
  const loanList = accountBenefit.LoanList || []; // LoanList를 상태에서 가져오기

  // 대출 선택 시 호출되는 함수
  const handleLoanChange = (loanName) => {
    setSelectedLoan(loanName); // 선택된 대출 업데이트
    setIsDropdownOpen(false); // 드롭다운 닫기
    setIsLoading(true); // 로딩 상태 활성화

    // 선택된 대출의 이자 잔액 찾기
    const selectedInterest = loanList.find(
      (loan) => loan.loanName === loanName
    )?.interestBalance;

    if (selectedInterest !== undefined) {
      setInterestBalance(selectedInterest); // 이자 잔액 상태 업데이트
    }
  };

  // '상환하러 가기' 버튼 클릭 시 호출되는 함수
  const handlePayment = () => {
    if (selectedLoan) {
      navigate(`/repayment/${selectedLoan}`, {
        state: { loanList, remainingBalance }, // 상태로 데이터 전달
      }); // 선택된 대출과 함께 이동
    } else {
      setShowAlert(true); // 커스텀 경고창 표시
      setTimeout(() => setShowAlert(false), 2000); // 2초 후 경고창 숨기기
    }
  };

  return (
    <Container>
      <SubHeader>
        <SubTitle>이번 달 계좌 잔액 관리</SubTitle>
      </SubHeader>

      <TextTag>
        남은 돈 <MoneySpan>{remainingBalance?.toLocaleString()}원</MoneySpan>을
        <br />
        <CustomDropdownContainer>
          <CustomDropdownHeader
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedLoan.length > 8
              ? `${selectedLoan.substring(0, 8)}...`
              : selectedLoan || "대출 상품 선택"}
          </CustomDropdownHeader>
          {isDropdownOpen && (
            <CustomDropdownList>
              {loanList.map((loan) => (
                <CustomDropdownItem
                  key={loan.loanName}
                  onClick={() => handleLoanChange(loan.loanName)}
                  selected={selectedLoan === loan.loanName}
                >
                  {loan.loanName.length > 12
                    ? `${loan.loanName.substring(0, 12)}...`
                    : loan.loanName}
                </CustomDropdownItem>
              ))}
            </CustomDropdownList>
          )}
        </CustomDropdownContainer>{" "}
        에 상환하면,
        <br />
        <LastLine>
          이자 <MoneySpan>{interestBalance.toLocaleString()}원</MoneySpan>을
          아낄 수 있어요
        </LastLine>
      </TextTag>

      <PayButton onClick={handlePayment}>상환하러 가기</PayButton>
      <AlertContainer visible={showAlert}>
        대출 상품을 선택해주세요.
      </AlertContainer>
    </Container>
  );
}

export default LeftMoney;