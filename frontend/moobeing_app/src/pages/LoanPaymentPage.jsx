import { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import DropDownArrow from "../assets/dropdown/DropdownArrow.png";
import ConfirmingPopUp from "../components/LoanPayment/ConfirmingPopUp";
import { getAccountInfo } from "../apis/AccountApi";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
`;

const LoanTitle = styled.div`
  font-size: 30px;
  font-weight: 700;
  margin-top: 8vh;
`;

const MainContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const RepaymentComponent = styled.div`
  background-color: #f5fded;
  width: 90%;
  margin: 40px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 30px;
  box-sizing: border-box;
  border-radius: 5%;
  gap: 10px;
`;

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  width: 100%;
`;

const Label = styled.label`
  font-size: 1rem;
  margin-right: 20px;
  margin-top: 10px;
  white-space: nowrap;
`;

const CustomDropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const CustomDropdownHeader = styled.div`
  width: 100%;
  padding: 8px 0;
  font-size: 15px;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #ccc;
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${DropDownArrow});
  background-repeat: no-repeat;
  background-position: right 6px center;
  background-size: 15px 10px;
  color: #348833;

  &:focus {
    border-bottom: 2px solid #4caf50;
  }
`;

const CustomDropdownList = styled.ul`
  position: absolute;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: white;
  border: 1px solid #ccc;
  max-height: 150px;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border-radius: 10px;
`;

const CustomDropdownItem = styled.li`
  padding: 8px;
  font-size: 13px;
  cursor: pointer;
  white-space: pre-line;

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

const Balance = styled.div`
  text-align: right;
  color: gray;
  margin-top: 10px;
  font-size: 13px;
`;

const InputContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;

  &:focus-within {
    border-bottom: 2px solid #4caf50;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 30px 8px 0;
  font-size: 18px;
  color: #24272d;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  text-align: right;

  &:focus {
    border-bottom: 2px solid #4caf50;
  }
`;

const CurrencyLabel = styled.span`
  position: absolute;
  right: 10px;
  font-size: 1rem;
  color: #24272d;
  pointer-events: none;
`;

const AmountButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 10px;
  margin-top: -10px;
`;

const AmountButton = styled.button`
  padding: 6px 8px;
  font-size: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c5e1ab;
  }
`;

const PayButton = styled.button`
  background-color: #E0EED2;
  width: 100px;
  color: #5E5054;
  border: none;
  padding: 10px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  font-family: 'mainFont';
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const LoanPaymentPage = () => {
  const location = useLocation();
  const { loanList, remainingBalance, selectedLoan } = location.state || {}; // LeftMoneyManage에서 전달받은 데이터
  const [newSelectedLoan, setNewSelectedLoan] = useState(selectedLoan); // 초기 대출 설정
  const [isLoanDropdownOpen, setIsLoanDropdownOpen] = useState(false); // 드롭다운 열림/닫힘 상태
  const [selectedAccount, setSelectedAccount] = useState(null); // 선택된 계좌
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false); // 계좌 드롭다운 상태
  const [repaymentAmount, setRepaymentAmount] = useState(remainingBalance || 0); // 남은 돈을 상환금액으로 설정
  const [showPopup, setShowPopup] = useState(false); // 팝업 상태
  const [accounts, setAccounts] = useState([]); // 계좌 정보 상태

  // API 호출을 통한 계좌 정보 가져오기
  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const accountData = await getAccountInfo(); // API 호출
        console.log(accountData); // 데이터 구조 확인을 위한 콘솔 로그

        // accountData.getAccountDtoList를 상태에 저장
        if (accountData && Array.isArray(accountData.getAccountDtoList)) {
          const processedAccounts = accountData.getAccountDtoList.map(account => ({
            id: account.id,
            bankImageUrl: account.bankImageUrl,
            accountName: account.accountName,
            accountNum: account.accountNum,
            remainingBalance: account.remainingBalance,
          }));
          setAccounts(processedAccounts);
        } else {
          console.error("계좌 목록이 배열이 아닙니다.");
        }
      } catch (error) {
        console.error("계좌 정보 불러오기 실패:", error);
      }
    };

    fetchAccountInfo(); // 함수 실행
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  const handleLoanSelect = (loan) => {
    setNewSelectedLoan(loan); // 선택된 대출 상품 설정
    setIsLoanDropdownOpen(false); // 드롭다운 닫기
  };

  const handleAccountSelect = (account) => {
    setSelectedAccount(account); // 선택된 계좌 설정
    setIsAccountDropdownOpen(false); // 계좌 드롭다운 닫기
  };

  const handleRepaymentInputChange = (e) => {
    const value = e.target.value.replace(/,/g, "");
    const newAmount = value === "" ? 0 : parseInt(value, 10);
  
    // 상환금액이 선택된 계좌의 잔액을 초과하지 않도록 제어
    if (selectedAccount) {
      setRepaymentAmount(Math.min(newAmount, selectedAccount.remainingBalance, newSelectedLoan.loanBalance));
    } else {
      setRepaymentAmount(newAmount);
    }
  };
  
  const handleAddAmount = (amount) => {
    setRepaymentAmount((prevAmount) => {
      const newAmount = prevAmount + amount * 10000;
      // 상환금액이 선택된 계좌의 잔액과 대출 잔금을 초과하지 않도록 제어
      if (selectedAccount) {
        return Math.min(newAmount, selectedAccount.remainingBalance, newSelectedLoan.loanBalance);
      }
      return Math.min(newAmount, newSelectedLoan.loanBalance); // 대출 잔금 이상으로 상환 불가
    });
  };
  
  const formatAmount = (amount) => {
    // 표시되는 금액도 계좌 잔액을 초과하지 않도록 제어
    const formattedAmount = selectedAccount
      ? Math.min(amount, selectedAccount.remainingBalance, newSelectedLoan.loanBalance)
      : amount;
    return formattedAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  

  const handlePaymentBtn = () => {
    if (newSelectedLoan && selectedAccount) {
      // 상환 확인 팝업 띄우기
      setShowPopup(true);
    } else {
      alert("모든 정보를 입력해주세요.");
    }
  };

  return (
    <Container>
      <MainContent>
        <LoanTitle>대출 상환</LoanTitle>
        <RepaymentComponent>
          {/* 대출 상품 선택 */}
          <Row>
            <Label>대출상품</Label>
            <CustomDropdownContainer>
              <CustomDropdownHeader
                onClick={() => setIsLoanDropdownOpen(!isLoanDropdownOpen)}
              >
                {/* 선택된 대출 상품이 있을 경우 해당 이름을 보여주고, 없으면 '대출상품 선택' */}
                {newSelectedLoan ? newSelectedLoan.loanName : "대출상품 선택"}
              </CustomDropdownHeader>
              {isLoanDropdownOpen && (
                <CustomDropdownList>
                  {loanList.map((loan) => (
                    <CustomDropdownItem
                      key={loan.loanName}
                      onClick={() => handleLoanSelect(loan)}
                      selected={newSelectedLoan === loan}
                    >
                      {loan.loanName}
                    </CustomDropdownItem>
                  ))}
                </CustomDropdownList>
              )}
              <Balance>
                {/* 선택된 대출의 잔액 표시 */}
                {newSelectedLoan && `잔금 ${Number(newSelectedLoan.loanBalance).toLocaleString()}원`}
              </Balance>
            </CustomDropdownContainer>
          </Row>

          {/* 출금 계좌 선택 */}
          <Row>
            <Label>출금계좌</Label>
            <CustomDropdownContainer>
              <CustomDropdownHeader
                onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
              >
                {selectedAccount ? selectedAccount.accountName : "계좌 선택"}
              </CustomDropdownHeader>
              {isAccountDropdownOpen && (
                <CustomDropdownList>
                  {accounts.map((account) => (
                    <CustomDropdownItem
                      key={account.id}
                      onClick={() => handleAccountSelect(account)}
                      selected={selectedAccount === account}
                    >
                      {account.accountName} ({account.accountNum})
                    </CustomDropdownItem>
                  ))}
                </CustomDropdownList>
              )}
              <Balance>
                {selectedAccount && `잔액 ${Number(selectedAccount.remainingBalance).toLocaleString()}원`}
              </Balance>
            </CustomDropdownContainer>
          </Row>

          {/* 상환 금액 입력 */}
          <Row>
            <Label>상환금액</Label>
            <InputContainer>
              <Input
                type="text"
                value={formatAmount(repaymentAmount)}
                onChange={handleRepaymentInputChange}
                placeholder="0"
              />
              <CurrencyLabel>원</CurrencyLabel>
            </InputContainer>
          </Row>

          {/* 금액 추가 버튼 */}
          <AmountButtons>
            {[1, 5, 10, 100].map((amount) => (
              <AmountButton key={amount} onClick={() => handleAddAmount(amount)}>
                + {amount.toLocaleString()}만
              </AmountButton>
            ))}
            <AmountButton onClick={() => setRepaymentAmount(0)}>정정</AmountButton>
          </AmountButtons>

          {/* 다음 버튼 */}
          <PayButton onClick={handlePaymentBtn}>다음</PayButton>
        </RepaymentComponent>

        {/* 상환 확인 팝업 */}
        {showPopup && (
          <ConfirmingPopUp
            selectedLoan={newSelectedLoan}
            selectedAccount={selectedAccount}
            repaymentAmount={repaymentAmount}
            closePopup={() => setShowPopup(false)}
          />
        )}
      </MainContent>
    </Container>
  );
};

export default LoanPaymentPage;
