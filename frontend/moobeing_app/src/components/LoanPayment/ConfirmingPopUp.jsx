import styled from "styled-components";
import { postAccountLoan } from "../../apis/AccountApi";
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
`;

const Highlight = styled.span`
  color: #27ae60; 
  font-weight: bold;
  margin-right: 10px;
`;

// 투명한 검정색 배경 처리 (Backdrop)
const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* 투명한 검정 배경 */
  z-index: 99999; /* 팝업 바로 뒤에 위치 */
`;

const ConfirmingPopUp = ({ selectedLoan, selectedAccount, repaymentAmount, closePopup }) => {
  const [isProcessing, setIsProcessing] = useState(false); // 상환 처리 상태
  const [popupMessage, setPopupMessage] = useState("원을 상환하시겠습니까?");
  const [buttonText, setButtonText] = useState("상환하기");
  const navigate = useNavigate();

  // 상환 처리 함수
  const handleLoanRepayment = async () => {
    setIsProcessing(true); // 상환 처리 시작
    try {
      // 상환 정보 생성
      const accountData = {
        accountNum: selectedAccount.accountNum,  // 선택한 계좌의 번호
        loanName: selectedLoan.loanName,  // 선택한 대출 이름
        money: repaymentAmount,  // 상환 금액
      };

      // API 호출로 상환 처리
      const result = await postAccountLoan(accountData);
      console.log("상환 성공:", result);
      setPopupMessage("원을 성공적으로 상환했습니다!");
      setButtonText("확인");

    } catch (error) {
      console.error("상환 실패:", error);
      setPopupMessage("상환 중 오류가 발생했습니다. 다시 시도해주세요.");
      setButtonText("돌아가기");
    } finally {
      setIsProcessing(false); // 상환 처리 종료
    }
  };

  // 버튼 클릭 핸들러
  const btnHandler = () => {
    if (buttonText === "확인" || buttonText === "돌아가기") {
      closePopup();
      navigate("/"); // "/" 경로로 리다이렉트
    } else {
      handleLoanRepayment(); // 상환 처리 실행
    }
  };

  return (
    <>
      <Backdrop onClick={closePopup} />
      <PaymentPopup>
        <PopupMessage>
          <p><strong>{selectedLoan.loanName}</strong> 의 대출금</p>
          <p><Highlight>{Number(repaymentAmount).toLocaleString()}</Highlight>{popupMessage}</p>
        </PopupMessage>
        {/* 상환 API 호출 버튼 */}
        <PayButton onClick={btnHandler} disabled={isProcessing}>
          {isProcessing ? "상환 중..." : buttonText}
        </PayButton>
      </PaymentPopup>
    </>
  );
};

export default ConfirmingPopUp;
