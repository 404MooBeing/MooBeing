import PropTypes from "prop-types";
import styled from "styled-components";
import RadishCoinImg from "../../assets/coin/RadishCoin.png";
import RightArrowBtn from "../../assets/button/rightButtonBlack.svg"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {getCoin} from "../../apis/UserApi"


const SubHeader = styled.div`
  background-color: #f5fded;
  height: 14vh;
  width: 90%;
  margin-bottom: 5%;
  margin-top: 20px;
  border-radius: 20px;
  justify-content: space-between;
  align-items: center;
  padding: 30px 15px 20px 30px;
  box-sizing: border-box;
  font-size : 20px;
`;

const Label = styled.div`
  font-weight: bold;
`;

const Value = styled.div`
  text-align: right;
`;

const RadishCoin = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    height : 50%;
`;

const RadishCoinBtn = styled.button`
    margin-left:40px;
    height: 60%;
    margin-right: 20px;
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




const MyInfoHeader = ({userInfo}) => {

    const navigate = useNavigate()

    const radishCoinClickHandler = () => {
        navigate('/coin')
    }

    const [coin, setCoin] = useState(0);



    useEffect(() => {
      const fetchData = async () => {
        try {
           // Zustand 스토어에 저장
           const data = await getCoin(); // 무 코인 가져오기
           setCoin(data)

        } catch (error) {
          console.error("데이터 가져오기 실패:", error);
        }
      };
      fetchData();
    }, [setCoin]);



    return (
    <SubHeader>
    <div><strong>{userInfo.name || "사용자"} 님</strong></div>
    <RadishCoin>
        <img src={RadishCoinImg}></img>
        <Label>무 코인</Label>
        <Value>{coin}개</Value>
        <img src={RightArrowBtn} height="20px" onClick={radishCoinClickHandler}/>
        <RadishCoinBtn onClick={() => {navigate('/coin-exchange')}}>송금하기</RadishCoinBtn>
    </RadishCoin>
  </SubHeader>);
};

export default MyInfoHeader;