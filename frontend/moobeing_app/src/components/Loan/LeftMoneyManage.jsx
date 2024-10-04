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

function LeftMoneyManage() {
  const [accountBenefit, setAccountBenefit] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
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
    } catch (error) {
      console.error("계좌 혜택 데이터를 가져오는 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loanList = accountBenefit.LoanList || [];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <Container>
      <SubHeader>
        <SubTitle>남은 돈 관리하기</SubTitle>
      </SubHeader>

      <TextTag>
        대출잔액은 <MoneySpan>{remainingBalance?.toLocaleString()}원</MoneySpan>이며,
        <br />
        <CustomDropdownContainer>
          남은 돈 <MoneySpan>230,000원</MoneySpan>을
          <CustomDropdownHeader onClick={toggleDropdown}>
            대출 상품 선택
          </CustomDropdownHeader>
          {isDropdownOpen && (
            <CustomDropdownList>
              {loanList.map((loan) => (
                <CustomDropdownItem key={loan.loanName}>
                  {loan.loanName}
                </CustomDropdownItem>
              ))}
            </CustomDropdownList>
          )}
        </CustomDropdownContainer>{" "}
        에
        <br />
        <LastLine>
          상환하면 이자 <MoneySpan>0원</MoneySpan>을 아낄 수 있어요
        </LastLine>
      </TextTag>

      <PayButton onClick={() => navigate('/repayment')}>상환하러 가기</PayButton>
    </Container>
  );
}

export default LeftMoneyManage;