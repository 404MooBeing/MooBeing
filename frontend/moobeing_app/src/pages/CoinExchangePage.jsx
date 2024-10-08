import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import DropDownArrow from "../assets/dropdown/DropdownArrow.png";
import ConfirmingPopUp from "../components/CoinExchange/ConfirmingPopUp";
import {getAccountInfo} from "../apis/AccountApi"
import { getCoin } from "../apis/CoinApi";

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
  margin-bottom: 15px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
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
  font-size: 18px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #ccc;
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

const Balance = styled.div`
  width : 100%;
  text-align: right;
  color: gray;
  font-size: 12px;
  margin-top: -25px;
  margin-right : 4px;
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
   background-color: #E0EED2;
  border: none;
  padding: 10px 20px;
  margin: 20px 0;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  color: #5E5054;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 효과 추가 /
  transition: all 0.2s ease-in-out; / 버튼 클릭 시 애니메이션 추가 */
  font-family: 'mainFont';
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
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99999;
`;

const AlertContainer = styled.div`
  position: fixed;
  top: 80px;
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

const CoinExchangePage = () => {
  const [accounts, setAccounts] = useState([]);
  const [accountList, setAccountList] = useState([
    {id : 1 ,accountName: "계좌1", accountNum: "123-456-789", balance: 1000000 },
    {id : 2 , accountName: "계좌2", accountNum: "123-456-790", balance: 2000000 },
    {id : 3 , accountName: "계좌3", accountNum: "123-456-791", balance: 3000000 },
    {id : 4 , accountName: "계좌4", accountNum: "123-456-792", balance: 4000000 },
    {id : 5 , accountName: "계좌5", accountNum: "123-456-793", balance: 5000000 },
  ])
  const [popupType, setPopupType] = useState("");
  const [selectedAccount, setSelectedAccount] = useState({});
  const [repaymentAmount, setRepaymentAmount] = useState(0);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [coinCount, setCoinCount] = useState(0);
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await getAccountInfo();
        setAccountList(data.getAccountDtoList);
  
        // data.getAccountDtoList가 배열인지 확인
        if (Array.isArray(data.getAccountDtoList)) {
          const fetchedAccounts = data.getAccountDtoList.map((account, index) => ({
            id: index + 1,
            name: `${account.accountName}\n(${account.accountNum})`,
            displayName: `${account.accountName}`,
            balance: `${account.remainingBalance}`,
          }));
  
          setAccounts(fetchedAccounts);  // 필요한 경우 계좌 정보 설정
        } else {
          console.log("Data is not an array");
        }
      } catch (error) {
        console.error("계좌 정보를 가져오는 중 오류가 발생했습니다:", error);
      }
    };

    const fetchCoin = async () => {
      try {
        const data = await getCoin();
        setCoinCount(data);
      } catch (error) {
        
      }
    }
    fetchCoin();
    fetchAccounts();
  }, []);  // 빈 배열을 의존성 배열로 설정
  
  
  const handleAccountSelect = (account) => {
    setSelectedAccount(account);
    setIsAccountDropdownOpen(false);
  };

  const handleRepaymentInputChange = (e) => {
    const value = e.target.value.replace(/,/g, "");
    setRepaymentAmount(value === "" ? 0 : parseInt(value, 10));
  };

  const handleAddAmount = (amount) => {
    setRepaymentAmount((prevAmount) => coinCount >= parseInt(prevAmount) + amount ?  parseInt(prevAmount) + amount : coinCount);
  };

  const formatAmount = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handlePaymentBtn = () => {
    if (repaymentAmount <= coinCount && repaymentAmount > 0){
      setPopupType("")
    }
    else{
      setPopupType("error")
      setRepaymentAmount(0)
    }
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false)
    setPopupType("")
  }

  return (
    <Container>
      <AlertContainer>{alertMessage && <AlertMessage>{alertMessage}</AlertMessage>}</AlertContainer>
      {showPopup && (
        <>
          <Backdrop onClick={() => setShowPopup(false)} />
          <ConfirmingPopUp selectedAccount={selectedAccount} coinAmmount={repaymentAmount} type={popupType} closeHandler={closePopup}/>
        </>
      )}
      <MainContent>
        <h1>코인 송금</h1>
        <RepaymentComponent>
          <Row>
            <Label>입금계좌</Label>
            <CustomDropdownContainer>
              <CustomDropdownHeader onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}>
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
                      {account.name}
                    </CustomDropdownItem>
                  ))}
                </CustomDropdownList>
              )}
            </CustomDropdownContainer>
          </Row>
          <Balance>잔액 {Number(selectedAccount.balance || 0).toLocaleString()}원</Balance>
          <Row>
            <Label>송금개수</Label>
            <InputContainer>
              <Input
                type="text"
                value={formatAmount(repaymentAmount)}
                onChange={handleRepaymentInputChange}
                placeholder="0"
              />
              <CurrencyLabel>개</CurrencyLabel>
            </InputContainer>
          </Row>
          <Balance>보유 {Number(coinCount || 0).toLocaleString()}개</Balance>
          <AmountButtons>
            {[100, 1000, 10000, 50000].map((amount) => (
              <AmountButton key={amount} onClick={() => handleAddAmount(amount)}>
                + {amount.toLocaleString()}
              </AmountButton>
            ))}
            <AmountButton onClick={() => setRepaymentAmount(coinCount)}>전액</AmountButton>
          </AmountButtons>
          <PayButton onClick={handlePaymentBtn}>다음</PayButton>
        </RepaymentComponent>
      </MainContent>
    </Container>
  );
};

export default CoinExchangePage;
