import styled, { keyframes } from "styled-components";
import { withdrawCoin } from "../../apis/CoinApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
`;

const PayButton = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => (props.type === "error" ? "#f5c6cb" : "#c0dda6")};  // error 시 배경색 변경
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

const PaymentPopup = styled.div`
  position: fixed;
  top: 35%;
  left: 50%;
  width: 80%;
  height: 20%;
  background-color: ${(props) => (props.type === "error" ? "#f8d7da" : "#F5FDED")};  // error 시 배경색 변경
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



const ConfirmingPopUp = ({ selectedAccount, coinAmmount, type, closeHandler }) => {

  const [showMsg, setShowMsg] = useState("원을 송금하시겠습니까?")
  const [showBtnMsg, setShowBtnMsg] = useState("송금하기")

  const navigate = useNavigate();

  const btnHandler = () => {
    if (type == "error"){
      closeHandler();
    }else if (showBtnMsg == "확인"){
      closeHandler();
      navigate("/coin") 
    }else{
      repayMent()
    }
  }

  const repayMent = async () => {
    const requestBody = {
      accountId : selectedAccount.id,
      amount : coinAmmount
    }
    console.log(requestBody)
    await withdrawCoin(requestBody)
    setShowMsg("원을 송금했습니다!")
    setShowBtnMsg("확인")
  }

  return (
    <PaymentPopup type={type}>
      <PopupMessage>
        {type === "error" ? (  
          <>
            <p><strong>잘못된 요청입니다.</strong></p>
          </>
        ) : (
          <>
            <p><strong>{selectedAccount.displayName}</strong> 계좌에</p>
            <p><Highlight>{Number(coinAmmount).toLocaleString()}</Highlight>{showMsg}</p>
          </>
        )}
      </PopupMessage>
      <PayButton type={type} onClick={btnHandler}>
        {type === "error" ? "돌아가기" : showBtnMsg}
      </PayButton>
    </PaymentPopup>
  );
}

export default ConfirmingPopUp;
