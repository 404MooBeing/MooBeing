import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import DropDownArrow from "../assets/dropdown/DropdownArrow.png";
// import { getAccountInfo, postAccountLoan } from "../apis/AccountApi";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
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
  height: 50vh;
  margin: 50px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 5%;
  gap: 20px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  width: 100%;
`;

const Label = styled.label`
  font-size: 1rem;
  margin-right: 20px;
  white-space: nowrap;
`;

const CustomDropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const CustomDropdownHeader = styled.div`
  width: 100%;
  padding: 8px 0;
  font-size: 14px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${DropDownArrow});
  background-repeat: no-repeat;
  background-position: right 6px center;
  background-size: 15px 10px;
  font-size: 18px;
  color: #348833;


  &:focus {
    border-bottom: 2px solid #4caf50;
  }
`;



const Wrapper = styled.div`
  width : 100%
`;

const Balance = styled.div`
  text-align: right;
  color: gray;
  margin-top: 4px;
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
  font-size: 15px;
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
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }

  &:active {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(0);
  }
`;

const fadeInOut = keyframes`
  0% { opacity: 0; }
  15% { opacity: 1; }
  85% { opacity: 1; }
  100% { opacity: 0; }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* 어두운 배경 */
  z-index: 99999; /* 팝업 바로 뒤 */
`;

const PaymentPopup = styled.div`
  position: fixed;
  top: 35%;
  left: 50%;
  width: 80%;
  height: 20%;
  background-color: #F5FDED;
  transform: translateX(-50%);
  z-index: 100000;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
  text-align: center;
`;
const PopupMessage = styled.div`
  text-align: center;
  font-size: 20px; 
  margin: 30px 0;
`

const Highlight = styled.span`
  color: #27ae60; 
  font-weight: bold;
  margin-right: 10px;
`;

const AlertContainer = styled.div`
  position: fixed;
  top: 80px; // Adjust this value based on your Header heights
  left: 50%;
  transform: translateX(-50%);
  z-index: 100000;
`;

const AlertMessage = styled.div`
  background-color: rgba(144, 144, 144, 0.8);
  color: #ffffff;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  white-space: nowrap;
  animation: ${fadeInOut} 2s ease-in-out;
`;

const LoanPaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loanList, remainingBalance } = location.state || {}; // state에서 정보 가져오기

  // 계좌랑 대출의 기본 정보 저장
  const [accounts, setAccounts] = useState([]);
  const [loans, setLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState({});
  const [selectedAccount, setSelectedAccount] = useState({});
  const [repaymentAmount, setRepaymentAmount] = useState(0);
  const [isLoanDropdownOpen, setIsLoanDropdownOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
   // 팝업 관련 상태
   const [showPopup, setShowPopup] = useState(false);

  // 남는돈 있다면 가져와서 표시
  useEffect(() => {
    if (remainingBalance) {
      setRepaymentAmount(remainingBalance);
    }
  }, [remainingBalance]);

  // 계좌 정보 가져오기 부분
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        // const response = await getAccountInfo();
        const accountList = [
              {
                "accountName": "계좌1",
                "accountNum": "123-456-789",
                "balance" : 1000000
              },
              {
                "accountName": "계좌2",
                "accountNum": "123-456-790",
                "balance" : 2000000
              },
              {
                "accountName": "계좌3",
                "accountNum": "123-456-791",
                "balance" : 3000000
              },
              {
                "accountName": "계좌4",
                "accountNum": "123-456-792",
                "balance" : 4000000
              },
              {
                "accountName": "계좌5",
                "accountNum": "123-456-793",
                "balance" : 5000000
              }
            ]
        const loanList = [
          {
            "loanProductName": "하나은행 생활안정대출",
            "bankImageUrl": "https://github.com/user-attachments/assets/c1f2b5aa-0bb9-46c6-ab08-cafcd29dba73",
            "remainingBalance": 4305555,
            "interestRate": 3.9
          },
          {
            "loanProductName": "IBK기업은행 중소기업대출",
            "bankImageUrl": "https://github.com/user-attachments/assets/a723840f-838b-4160-9e96-18daf28fe7ba",
            "remainingBalance": 2583335,
            "interestRate": 3.6999999999999997
          },
          {
            "loanProductName": "신한은행 직장인대출",
            "bankImageUrl": "https://github.com/user-attachments/assets/fa2aedb1-6886-4982-84f3-6e773fed7792",
            "remainingBalance": 1722220,
            "interestRate": 3.1
          },
          {
            "loanProductName": "신한은행 전세자금대출",
            "bankImageUrl": "https://github.com/user-attachments/assets/fa2aedb1-6886-4982-84f3-6e773fed7792",
            "remainingBalance": 332160000,
            "interestRate": 3.1
          },
          {
            "loanProductName": "KB국민은행 전세자금대출",
            "bankImageUrl": "https://github.com/user-attachments/assets/16e42300-e535-46c6-b184-2e8f1f891dc0",
            "remainingBalance": 3444445,
            "interestRate": 2.6
          },
          {
            "loanProductName": "우리은행 주택담보대출",
            "bankImageUrl": "https://github.com/user-attachments/assets/0fe19810-9646-4beb-bfc3-e3e15b69f6c1",
            "remainingBalance": 861110,
            "interestRate": 2.4
          }
        ]


        const fetchedAccounts = accountList.map(
          (account, index) => ({
            id: index + 1,
            name: `${account.accountName}\n(${account.accountNum})`, // Full display with newline for dropdown items
            displayName: `${account.accountName}`, // Only accountName for dropdown header
            balance: `${account.balance}`
          })
        );

        const fetchedLoans = loanList.map(
          (loan, index) => ({
            id: index + 1,
            name: `${loan.loanProductName}\n(${loan.loanProductName})`, // Full display with newline for dropdown items
            displayName: `${loan.loanProductName}`, // Only accountName for dropdown header
            remainingBalance: loan.remainingBalance
          })
        );

        setAccounts(fetchedAccounts);
        setLoans(fetchedLoans);
        // console.log(loans)
        // console.log(accounts)
      } catch (error) {
        console.error("계좌 정보를 가져오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchAccounts();
  }, []);
  
  const handleLoanSelect = (loan) => {
    setSelectedLoan(loan);
    setIsLoanDropdownOpen(false);
  };

  const handleAccountSelect = (account) => {
    setSelectedAccount(account);
    setIsAccountDropdownOpen(false);
  };

    // 팝업 외부 클릭 시 닫기
    const handleBackdropClick = () => {
      setShowPopup(false); // 팝업 닫기
    };
  
    // 팝업 내부 버튼 클릭 시 팝업 닫기
    const handlePopupClose = () => {
      setShowPopup(false); // 팝업 닫기
    };



  const handleRepaymentInputChange = (e) => {
    const value = e.target.value.replace(/,/g, "");
    setRepaymentAmount(value === "" ? 0 : parseInt(value, 10));
  };

  const handleAddAmount = (amount) => {
    setRepaymentAmount((prevAmount) => parseInt(prevAmount) + amount * 10000); // Adds amount in 만원
  };

  const formatAmount = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const showAlert = (message) => {
    console.log("Alert Message:", message); // 이 라인을 추가
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(""), 2000);
  };

  const handlePaymentBtn = () =>{
    setShowPopup(true)
  }

  const handlePayment = async () => {
    if (!selectedLoan || !selectedAccount || repaymentAmount <= 0) {
      showAlert("입력하지 않은 정보가 있습니다.");
      return;
    }

    try {
      if (!selectedAccount) {
        showAlert("유효한 계좌를 선택하세요.");
        return;
      }

      const requestBody = {
        accountNum: String(selectedAccount.accountNum),
        loanName: String(selectedLoan),
        money: Number(repaymentAmount),
      };

    //   const result = await postAccountLoan(requestBody);
    //   console.log("대출금 상환 성공:", result);
      showAlert("상환되었습니다!");

      // 딜레이 추가
      setTimeout(() => {
        // navigate(`/loan-journey/${selectedLoan.id}`);
      }, 2000); // 2초 후 페이지 이동
    } catch (error) {
      console.error("대출금 상환 중 오류 발생:", error);
      showAlert("상환 실패! 다시 시도해 주세요.");
    }
  };
  return (
    <Container>
      <AlertContainer>
        {alertMessage && <AlertMessage>{alertMessage}</AlertMessage>}
      </AlertContainer>
      {showPopup && (
        <>
          <Backdrop onClick={handleBackdropClick} />
          <PaymentPopup>
            <PopupMessage>
              <p><strong>{selectedLoan.displayName}</strong> 의 대출금</p>
              <p><Highlight>{Number(repaymentAmount).toLocaleString()}</Highlight>원을 상환하시겠습니까?</p>
            </PopupMessage>
            {/* 상환 API 호출 버튼으로 바꾸기 */}
            <PayButton onClick={handlePopupClose}>상환하기</PayButton>
          </PaymentPopup>
        </>
      )}
      <MainContent>
        <h1>대출 상환</h1>
        <RepaymentComponent>
          <Row>
            <Label>대출상품</Label>
          <Wrapper>
            <CustomDropdownContainer>
              <CustomDropdownHeader
                onClick={() => setIsLoanDropdownOpen(!isLoanDropdownOpen)}
              >
                {selectedLoan.displayName || "대출상품 선택"}
              </CustomDropdownHeader>
              {isLoanDropdownOpen && (
                <CustomDropdownList>
                {loans.map((loan) => (
                  <CustomDropdownItem
                    key={loan.id}
                    onClick={() => handleLoanSelect(loan)}
                    selected={selectedLoan === loan}
                  > 
                    {loan.displayName}{" "}
                  </CustomDropdownItem>
                ))}
                
              </CustomDropdownList>
              )}
            </CustomDropdownContainer>
            <Balance>
              잔금 {Number(selectedLoan.remainingBalance || 0).toLocaleString()}원
            </Balance>
           </Wrapper>
          </Row>

          <Row>
            <Label>출금계좌</Label>
            <Wrapper>
            <CustomDropdownContainer>
              <CustomDropdownHeader
                onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
              >
                {selectedAccount.displayName || "계좌 선택"}
              </CustomDropdownHeader>
              {isAccountDropdownOpen && (
                <CustomDropdownList>
                {accounts.map((account) => (
                  <CustomDropdownItem
                    key={account.id}
                    onClick={() => handleAccountSelect(account)}
                    selected={selectedAccount === account}
                  > 
                    {account.name}{" "}
                  </CustomDropdownItem>
                ))}
                
              </CustomDropdownList>
              )}
            </CustomDropdownContainer>
            
            <Balance>잔액 {Number(selectedAccount.balance || 0).toLocaleString()}원</Balance>

            </Wrapper>
          </Row>

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
          <AmountButtons>
            {[1, 5, 10, 100].map((amount) => (
              <AmountButton
                key={amount}
                onClick={() => handleAddAmount(amount)}
              >
                + {amount.toLocaleString()}만
              </AmountButton>
            ))}
            <AmountButton onClick={() => setRepaymentAmount(0)}>
              정정
            </AmountButton>
          </AmountButtons>
          <PayButton onClick={handlePaymentBtn}>상환하기</PayButton>
        </RepaymentComponent>
      </MainContent>
    </Container>
  );
};

export default LoanPaymentPage;
