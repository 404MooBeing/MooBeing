import { useState } from "react";
import styled from "styled-components";
import DropDownArrow from "../../assets/dropdown/DropdownArrow.png";
import SortCoin from "./SortCoin";
import { useNavigate } from "react-router-dom";
import RadishCoinImg from "../../assets/coin/RadishCoin.png";

const CoinHeader = styled.div`
  background-color: #F5F8F3;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px 0px;
  position: relative;
`;

const RadishCoin = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 25px;
`;

const RadishCoinText = styled.div`
  display: flex;
  align-items: center;
`;

const RadishCoinImage = styled.div`
  background-image: url(${RadishCoinImg});
  background-size: cover;
  background-position: center;
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const RadishCoinBtn = styled.button`
  background-color: #E0EED2;
  color: #5E5054;
  border: none;
  padding: 8px 10px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  font-family: 'mainFont';
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CoinBox = styled.div`
  background-color: #f5fded;
  border-radius: 20px;
  width: 90%;
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 40px;
  box-sizing: border-box;
  box-shadow: 3px 3px 3px #d9d9d9;
  position: relative;
`;

const Label = styled.div`
  font-weight: bold;
  font-size: 20px;
`;

const Value = styled.div`
  font-size: 20px;
  text-align: right;
`;

const Sort = styled.div`
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

const CoinInfo = ({ 
  onSortSelect, 
  sortCriteria }) => {
  const [isSortPopupOpen, setIsSortPopupOpen] = useState(false);
  const navigate = useNavigate();

  const  coinCount = 10000;
  const toggleSortPopup = () => {
    setIsSortPopupOpen(!isSortPopupOpen);
  };

  const handleSortSelect = (selectedSort) => {
    onSortSelect(selectedSort);  // 상위 컴포넌트로 정렬 기준 전달
    setIsSortPopupOpen(false);
  };

  return (
    <CoinHeader>
      <CoinBox>
        <RadishCoin>
          <RadishCoinText>
            <RadishCoinImage />
            <Label>무 코인</Label>
          </RadishCoinText>
          <Value>{coinCount}개</Value>
        </RadishCoin>
        <RadishCoinBtn onClick={() => {navigate('/coin-exchange')}}>송금하기</RadishCoinBtn>
      </CoinBox>
      <Sort>
        <SortButton onClick={toggleSortPopup}>
          {sortCriteria.period} · {sortCriteria.type}
        </SortButton>
      </Sort>
      {isSortPopupOpen && (
        <SortCoin onClose={toggleSortPopup} onSelect={handleSortSelect} />
      )}
    </CoinHeader>
  );
};

export default CoinInfo;
