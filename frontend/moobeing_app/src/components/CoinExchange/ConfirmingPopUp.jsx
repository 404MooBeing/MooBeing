import styled, { keyframes } from "styled-components";


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
  font-size: 20px; 
  margin: 30px 0;
`

const Highlight = styled.span`
  color: #27ae60; 
  font-weight: bold;
  margin-right: 10px;
`;


const ConfirmingPopUp = ( {selectedAccount, coinAmmount}) => {
    return (

            <PaymentPopup>
                <PopupMessage>
                <p><strong>{selectedAccount}</strong> 계좌에</p>
                <p><Highlight>{Number(coinAmmount).toLocaleString()}</Highlight>원을 송금하시겠습니까?</p>
                </PopupMessage>
                {/* 상환 API 호출 버튼으로 바꾸기 */}
                <PayButton >상환하기</PayButton>
          </PaymentPopup>
    )
}

export default ConfirmingPopUp