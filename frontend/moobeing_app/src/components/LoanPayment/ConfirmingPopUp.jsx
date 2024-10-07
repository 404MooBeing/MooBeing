import styled, { keyframes } from "styled-components";
import { postAccountLoan } from "../../apis/AccountApi";
import { useState } from "react"; // 상태 추가

const PayButton = styled.button`
  background-color: #E0EED2;
  width: 100px;
  color: #5E5054;
  border: none;
  padding: 10px;
  font-size: 15px;
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
  font-size: 20px; 
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

  console.log(selectedAccount.accountNum);

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
      alert("상환이 성공적으로 완료되었습니다.");
      closePopup(); // 팝업 닫기
    } catch (error) {
      console.error("상환 실패:", error);
      alert("상환 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsProcessing(false); // 상환 처리 종료
    }
  };

  return (
    <>
      <Backdrop onClick={closePopup} />  {/* 검정색 투명 배경 추가 */}
      <PaymentPopup>
        <PopupMessage>
          <p><strong>{selectedLoan.loanName}</strong> 의 대출금</p>
          <p><Highlight>{Number(repaymentAmount).toLocaleString()}</Highlight>원을 상환하시겠습니까?</p>
        </PopupMessage>
        {/* 상환 API 호출 버튼 */}
        <PayButton onClick={handleLoanRepayment} disabled={isProcessing}>
          {isProcessing ? "상환 중..." : "상환하기"}
        </PayButton>
      </PaymentPopup>
    </>
  );
};

export default ConfirmingPopUp;
