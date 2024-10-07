import { useEffect, useState } from "react";
import styled from "styled-components";
import DropDownArrow from "../../assets/dropdown/DropdownArrow.png";
import SortCoin from "./SortCoin";
import { useNavigate } from "react-router-dom";
import RadishCoinImg from "../../assets/coin/RadishCoin.png"
import RightArrowBtn from "../../assets/button/rightButtonBlack.svg"
import { getCoin } from "../../apis/CoinApi";

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
    font-size: 24px;
    height : 50%;
`;

const RadishCoinBtn = styled.button`
    margin-left:40px;
    height: 50px;
    margin-right: 35px;
    margin-top: 20px;
    width: 85px;
    background-color: #e0eed2;
    color: #24272d;
    border-radius: 10px;
    font-size: 13px;
    font-weight: bold;
    justify-content: center;
      border: none;
  cursor: pointer;
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
  margin-left: 10px;
`;

const Value = styled.div`
  text-align: right;
  margin-left : 100px
`;

const CoinRemain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 30px;
  font-weight: 600;
  margin-top: 30px;
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

  // const  coinCount = 10000;
  const [coinCount, setCoinCount] = useState(12000);
  const toggleSortPopup = () => {
    setIsSortPopupOpen(!isSortPopupOpen);
  };

  const handleSortSelect = (selectedSort) => {
    onSortSelect(selectedSort);  // 상위 컴포넌트로 정렬 기준 전달
    setIsSortPopupOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
         // Zustand 스토어에 저장
         const data = await getCoin(); // 무 코인 가져오기
         setCoinCount(data)

      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };
    fetchData();
  }, [setCoinCount]);
  return (
    <CoinHeader>
      <CoinBox>
        <RadishCoin>
            <img src={RadishCoinImg}></img>
            <Label>무 코인</Label>
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
