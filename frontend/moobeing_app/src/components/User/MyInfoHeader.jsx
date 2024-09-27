import PropTypes from "prop-types";
import styled from "styled-components";
import RadishCoinImg from "../../assets/coin/RadishCoin.png";
import RightArrowBtn from "../../assets/button/rightButtonBlack.svg"
import { useNavigate } from "react-router-dom";


const SubHeader = styled.div`
  background-color: #f5fded;
  height: 14vh;
  width: 90%;
  margin-bottom: 5%;
  margin-top: 40px;
  border-radius: 20px;
  justify-content: space-between;
  align-items: center;
  padding: 30px 15px 20px 25px;
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

    return (
    <SubHeader>
    <div>{userInfo.name || "사용자"} 님</div>
    <RadishCoin >
        <img src={RadishCoinImg}></img>
        <Label>무 코인</Label>
        <Value>{userInfo.coin}개</Value>
        <img src={RightArrowBtn} height="20px" onClick={radishCoinClickHandler}/>
        <RadishCoinBtn onClick={() => {navigate('/coin-exchange')}}>송금하기</RadishCoinBtn>
    </RadishCoin>
  </SubHeader>);
};

export default MyInfoHeader;