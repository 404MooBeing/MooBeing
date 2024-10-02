import { useState, useEffect } from "react";
import styled from "styled-components";
import DropDownArrow from "../../assets/dropdown/DropdownArrow.png";
import CopyButton from "../../assets/button/copyButton.svg";
import SortTransaction from "./SortTransaction";
import useTransactionStore from "../../store/TransactionStore";

const AccountHeader = styled.div`
  background-color: #F5F8F3;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px 0px;
  position: relative;
`;

const AccountBox = styled.div`
  background-color: #f5fded;
  border-radius: 20px;
  width: 90%;
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 30px;
  box-sizing: border-box;
  box-shadow: 3px 3px 3px #d9d9d9;
  position: relative;
`;

const CustomDropdownContainer = styled.div`
  position: relative;
  width: 200px;
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

const AccountNumContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  margin-left: 5px;
`;

const AccountNum = styled.div`
  font-size: 18px;
  margin-right: 8px;
`;

const AccountRemain = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  font-size: 20px;
  font-weight: 600;
  margin-top: 30px;
`;

const CopyImg = styled.img`
  cursor: pointer;
  width: 18px;
`;

const SortAndRadish = styled.div`
  display: flex;
  justify-content: space-between;
  width: 85%;
  padding: 10px 0;
`;

const SortButton = styled.button`
  background-color: #F5F8F3;
  color: #5E5054;
  border: 1px solid #ccc;
  padding: 10px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  font-family: 'mainFont';
  display: flex;
  align-items: center;

  &::after {
    content: '';
    width: 15px;
    height: 10px;
    background-image: url(${DropDownArrow});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin-left: 8px;
  }
`;

const RadishButton = styled.button`
  background-color: ${(props) => (props.selected ? '#357A38' : '#E0EED2')};
  color: ${(props) => (props.selected ? '#ffffff' : '#5E5054')};;
  border: none;
  padding: 10px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  font-family: 'mainFont';
`;

const TransactionInfo = () => {
  const {
    account: selectedAccount,
    accounts,
    isRadishSelected,
    toggleRadishSelection,
    setAccount,
    sortCriteria,
    setSortCriteria,
  } = useTransactionStore(); // Zustand에서 상태와 함수 가져오기

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSortPopupOpen, setIsSortPopupOpen] = useState(false);

  // 계좌 선택 함수
  const handleAccountChange = (selectedAcc) => {
    setAccount(selectedAcc); // Zustand 상태 변경 함수 호출
    setIsDropdownOpen(false);
  };

  // 계좌번호 복사 함수
  const handleCopyAccountNum = () => {
    if (selectedAccount?.accountNum) {
      navigator.clipboard.writeText(selectedAccount.accountNum)
        .then(() => alert("계좌번호가 복사되었습니다!"))
        .catch(() => alert("복사 실패! 다시 시도해주세요."));
    }
  };

  // 정렬 기준 변경 팝업 토글
  const toggleSortPopup = () => {
    setIsSortPopupOpen(!isSortPopupOpen);
  };

  // 정렬 기준 선택 함수
  const handleSortSelect = (selectedSort) => {
    setSortCriteria(selectedSort);  // Zustand 상태 변경 함수 호출
    setIsSortPopupOpen(false);
  };

  return (
    <AccountHeader>
      <AccountBox>
        <CustomDropdownContainer>
          <CustomDropdownHeader onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            {selectedAccount?.accountName || "계좌 선택"}
          </CustomDropdownHeader>
          {isDropdownOpen && (
            <CustomDropdownList>
              {accounts?.map((acc, index) => (
                <CustomDropdownItem
                  key={index}
                  selected={acc.accountName === selectedAccount?.accountName}
                  onClick={() => handleAccountChange(acc)}
                >
                  {acc.accountName}
                </CustomDropdownItem>
              ))}
            </CustomDropdownList>
          )}
        </CustomDropdownContainer>

        <AccountNumContainer>
          <AccountNum>{selectedAccount?.accountNum}</AccountNum>
          <CopyImg src={CopyButton} alt="Copy" onClick={handleCopyAccountNum} />
        </AccountNumContainer>
        <AccountRemain>
          잔액: {selectedAccount?.remainingBalance?.toLocaleString()} 원
        </AccountRemain>
      </AccountBox>

      <SortAndRadish>
        <SortButton onClick={toggleSortPopup}>
          {sortCriteria.period} · {sortCriteria.type}
        </SortButton>
        <RadishButton selected={isRadishSelected} onClick={toggleRadishSelection}>
          무 심기 선택
        </RadishButton>
      </SortAndRadish>
      {isSortPopupOpen && (
        <SortTransaction onClose={toggleSortPopup} onSelect={handleSortSelect} />
      )}
    </AccountHeader>
  );
};

export default TransactionInfo;