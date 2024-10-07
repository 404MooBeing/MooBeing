import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import DropDownArrow from "../../assets/dropdown/DropdownArrow.png";
import { getAccountBenefit } from "../../apis/AccountApi";

const Container = styled.div`
  background-color: #f5fded;
  width: 90%;
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 8% 8% 5% 8%;
  box-sizing: border-box;
  border-radius: 5%;
`;

const SubHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`;

const SubTitle = styled.div`
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  margin-right: 10px;

  @media (min-width: 600px) {
    font-size: 27px;
  }
`;

const LeftMoney = styled.span`
  font-size: 13px;
`

const PayButton = styled.button`
  background-color: #E0EED2;
  border: none;
  padding: 10px 20px;
  margin: 30px 0 10px 0;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  color: #5E5054;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
  font-family: 'mainFont';
`;

const CustomDropdownContainer = styled.div`
  position: relative;
  width: 220px;
  max-width: 300px;
  display: inline-block;
  margin: 30px 0;
`;

const CustomDropdownHeader = styled.div`
  padding: 8px 30px 8px 12px;
  font-size: 1rem;
  background-color: transparent;
  border-bottom: 1px solid #ccc;
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: center; // 중앙 정렬
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
`;

const TextTag = styled.div`
  text-align: center;
  width: 100%;
`;

const MoneySpan = styled.span`
  font-weight: 700;
`;

const LastLine = styled.div`
  margin: 20px 0px;
`;

function LeftMoneyManage() {
  const [accountBenefit, setAccountBenefit] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [loanList, setLoanList] = useState([]); // 초기값을 빈 배열로 설정
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLoan, setSelectedLoan] = useState(null); // 선택된 대출 상태 추가
  const navigate = useNavigate();

  useEffect(() => {
    fetchAccountBenefitData();
  }, []); // 컴포넌트가 마운트될 때만 실행

  const fetchAccountBenefitData = async () => {
    setIsLoading(true);
    try {
      const response = await getAccountBenefit();
      setAccountBenefit(response);
      setRemainingBalance(response.accountLeftMoney || 0);
      setLoanList(Array.isArray(response.LoanList) ? response.LoanList : []); // 배열인지 확인 후 설정
    } catch (error) {
      console.error("계좌 혜택 데이터를 가져오는 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const goToLoanPaymentPage = () => {
    if (selectedLoan) {
      navigate('/loan-payment', { state: { loanList, remainingBalance, selectedLoan } }); // loanList와 잔액을 전달
    }
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <Container>
    <SubHeader>
      <SubTitle>남은 돈 관리하기</SubTitle>
      <LeftMoney>
        잔액 <MoneySpan>{remainingBalance?.toLocaleString()}원</MoneySpan>
      </LeftMoney>
    </SubHeader>

    <CustomDropdownContainer>
      <CustomDropdownHeader onClick={toggleDropdown}>
        {selectedLoan ? selectedLoan.loanName : "대출 상품 선택"}
      </CustomDropdownHeader>
      {isDropdownOpen && (
        <CustomDropdownList>
          {loanList.map((loan) => (
            <CustomDropdownItem
              key={loan.loanName}
              onClick={() => {
                setSelectedLoan(loan);
                setIsDropdownOpen(false); 
              }}>
              {loan.loanName}
            </CustomDropdownItem>
          ))}
        </CustomDropdownList>
      )}
    </CustomDropdownContainer>

      <TextTag>
        {selectedLoan && (
          <>
            남은 돈 <MoneySpan>{remainingBalance?.toLocaleString()}원</MoneySpan>을
            <LastLine>
              상환하면 이자 <MoneySpan>{selectedLoan.interestBalance.toLocaleString()}원</MoneySpan>을 아낄 수 있어요.
            </LastLine>
            대출잔액은 <MoneySpan>{selectedLoan.loanBalance.toLocaleString()}원</MoneySpan>입니다.
            <br />
            <PayButton onClick={goToLoanPaymentPage}>상환하러 가기</PayButton>
          </>
        )}
      </TextTag>

    </Container>
  );
}

export default LeftMoneyManage;