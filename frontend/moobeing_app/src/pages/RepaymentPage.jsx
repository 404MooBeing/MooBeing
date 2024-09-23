import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Fixed/Header";
import Footer from "../components/Fixed/Footer";
import DropDownArrow from "../assets/dropdown/DropdownArrow.png";
import { getAccountInfo, postAccountLoan } from "../apis/AccountApi";

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
  justify-content: center;
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

const Repayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedLoanName } = useParams();
  const { loanList, remainingBalance } = location.state || {}; // state에서 정보 가져오기

  // 계좌랑 대출의 기본 정보 저장
  const [accounts, setAccounts] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(selectedLoanName || "");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [repaymentAmount, setRepaymentAmount] = useState(0);
  const [isLoanDropdownOpen, setIsLoanDropdownOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

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
        const response = await getAccountInfo();
        const fetchedAccounts = response.getAccountDtoList.map(
          (account, index) => ({
            id: index + 1,
            name: `${account.accountName}\n(${account.accountNum})`, // Full display with newline for dropdown items
            displayName: `${account.accountName}`, // Only accountName for dropdown header
          })
        );
        setAccounts(fetchedAccounts);
      } catch (error) {
        console.error("계좌 정보를 가져오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchAccounts();
  }, []);

  const handleLoanSelect = (loanName) => {
    setSelectedLoan(loanName);
    setIsLoanDropdownOpen(false);
  };

  const handleAccountSelect = (id) => {
    setSelectedAccount(id);
    setIsAccountDropdownOpen(false);
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

  const handlePayment = async () => {
    if (!selectedLoan || !selectedAccount || repaymentAmount <= 0) {
      showAlert("입력하지 않은 정보가 있습니다.");
      return;
    }

    try {
      const selectedAccountNum = accounts
        .find((account) => account.id === parseInt(selectedAccount, 10))
        ?.name.split("\n")[1]
        .replace(/[()]/g, "");

      if (!selectedAccountNum) {
        showAlert("유효한 계좌를 선택하세요.");
        return;
      }

      const requestBody = {
        accountNum: String(selectedAccountNum),
        loanName: String(selectedLoan),
        money: Number(repaymentAmount),
      };

      const result = await postAccountLoan(requestBody);
      console.log("대출금 상환 성공:", result);
      showAlert("상환되었습니다!");

      // 딜레이 추가
      setTimeout(() => {
        navigate(`/loan-journey/${selectedLoan}`);
      }, 2000); // 2초 후 페이지 이동
    } catch (error) {
      console.error("대출금 상환 중 오류 발생:", error);
      showAlert("상환 실패! 다시 시도해 주세요.");
    }
  };
  return (
    <Container>
      <Header />
      <AlertContainer>
        {alertMessage && <AlertMessage>{alertMessage}</AlertMessage>}
      </AlertContainer>

      <MainContent>
        <h1>대출 상환</h1>
        <RepaymentComponent>
          <Row>
            <Label>대출상품</Label>
            <CustomDropdownContainer>
              <CustomDropdownHeader
                onClick={() => setIsLoanDropdownOpen(!isLoanDropdownOpen)}
              >
                {selectedLoan
                  ? selectedLoan.length > 8
                    ? `${selectedLoan.slice(0, 8)}...`
                    : selectedLoan
                  : "대출상품 선택"}
              </CustomDropdownHeader>
              {isLoanDropdownOpen && (
                <CustomDropdownList>
                  {loanList?.map((loan) => (
                    <CustomDropdownItem
                      key={loan.loanName}
                      onClick={() => handleLoanSelect(loan.loanName)}
                      selected={selectedLoan === loan.loanName}
                    >
                      {loan.loanName.length > 14
                        ? `${loan.loanName.slice(0, 14)}...`
                        : loan.loanName}
                    </CustomDropdownItem>
                  ))}
                </CustomDropdownList>
              )}
            </CustomDropdownContainer>
          </Row>

          <Row>
            <Label>출금계좌</Label>
            <CustomDropdownContainer>
              <CustomDropdownHeader
                onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
              >
                {accounts.find(
                  (account) => account.id === parseInt(selectedAccount, 10)
                )?.displayName || "출금계좌 선택"}{" "}
                {/* Display only accountName in the header */}
              </CustomDropdownHeader>
              {isAccountDropdownOpen && (
                <CustomDropdownList>
                  {accounts.map((account) => (
                    <CustomDropdownItem
                      key={account.id}
                      onClick={() => handleAccountSelect(account.id)}
                      selected={selectedAccount === account.id}
                    >
                      {account.name}{" "}
                    </CustomDropdownItem>
                  ))}
                </CustomDropdownList>
              )}
            </CustomDropdownContainer>
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
          <PayButton onClick={handlePayment}>상환하기</PayButton>
        </RepaymentComponent>
      </MainContent>
      <Footer />
    </Container>
  );
};

export default Repayment;
