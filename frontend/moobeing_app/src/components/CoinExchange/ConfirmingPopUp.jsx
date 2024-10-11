import styled from "styled-components";
import { withdrawCoin } from "../../apis/CoinApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PayButton = styled.button`
  background-color: #E0EED2;
  width: 100px;
  color: #5E5054;
  border: none;
  padding: 10px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  font-family: 'mainFont';
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
`;

const PaymentPopup = styled.div`
  position: fixed;
  top: 35%;
  left: 50%;
  width: 80%;
  background-color: #F5FDED;
  transform: translateX(-50%);
  z-index: 100000;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
  text-align: center;
`;

const PopupMessage = styled.div`
  text-align: center;
  font-size: 16px; 
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
