import styled from "styled-components";
import RadishCoinImgSrc from "../../assets/coin/RadishCoin.png";
import RightArrowBtn from "../../assets/button/rightButtonBlack.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {getCoin} from "../../apis/CoinApi"


const SubHeader = styled.div`
  background-color: #f5fded;
  width: 90%;
  margin-bottom: 5%;
  margin-top: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px 30px;
  box-sizing: border-box;
  font-size: 20px;
`;

const UserInfo = styled.div`
  font-weight: 700;
  margin-bottom: 20px;
`;

const Label = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-right: 8px;
`;

const Value = styled.div`
  font-size: 16px;
`;

const RadishCoinContainer = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

const RadishCoin = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
`;

const RadishCoinBtn = styled.button`
  background-color: #E0EED2;
  color: #5E5054;
  border: none;
  padding: 8px 10px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  font-family: 'mainFont';
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const RadishCoinImg = styled.div`
  background-image: url(${RadishCoinImgSrc});
  background-size: cover;
  background-position: center;
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const RightArrowButton = styled.div`
  background-image: url(${RightArrowBtn});
  background-size: cover;
  background-position: center;
  width: 20px;
  height: 20px;
  margin-left: 5px;
  cursor: pointer;
`;

const MyInfoHeader = ({ userInfo }) => {
  const navigate = useNavigate();
  const radishCoinClickHandler = () => {
    navigate("/coin");
  };
  const [coin, setCoin] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCoin();
        setCoin(data);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };
    fetchData();
  }, [setCoin]);

  return (
    <SubHeader>
      <UserInfo>{userInfo.name || "사용자"} 님</UserInfo>
      <RadishCoinContainer>
        <RadishCoin>
          <RadishCoinImg />
          <Label>무 코인</Label>
          <Value>{coin}개</Value>
          <RightArrowButton onClick={radishCoinClickHandler} />
        </RadishCoin>
        <RadishCoinBtn onClick={() => navigate("/coin-exchange")}>
          송금하기
        </RadishCoinBtn>
      </RadishCoinContainer>
    </SubHeader>
  );
};

export default MyInfoHeader;
