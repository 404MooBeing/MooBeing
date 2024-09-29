import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import potDefault from "../../assets/pot/potDefault.svg";
import pot2nd from "../../assets/pot/pot2nd.svg";
import pot3rd from "../../assets/pot/pot3rd.svg";
import pot4th from "../../assets/pot/pot4th.svg";
import pot5th from "../../assets/pot/pot5th.svg";
import pot6th from "../../assets/pot/pot6th.svg";
import GrayChatBubble from "../../assets/GrayChatBubble.svg";
import { getLoanSum } from "../../apis/LoanApi";

const RadishContainer = styled.div`
  height: 250px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  margin-bottom: 130px; // 80px + 50px
`;

const PotRadish = styled.img`
  width: auto;
  height: auto;
  max-width: 150px;
  object-fit: contain;
  margin-bottom: -30px;
`;

const ChatBubbleContainer = styled.div`
  position: absolute;
  top: 15px;
  right: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 600px) {
    top: 15px;
    right: 200px;
  }
`;

const ChatBubble = styled.img`
  width: 100px;
  height: auto;
`;

const ChatText = styled.p`
  position: absolute;
  top: 40%;
  left: 55%;
  transform: translate(-50%, -50%);
  margin: 0;
  text-align: center;
  font-size: 13px;
  color: #333;
`;

const PullRadishButton = styled.button`
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 20px;
  background-color: ${(props) =>
    props.isPullAvailable ? "#348833" : "#cccccc"};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.isPullAvailable ? "pointer" : "not-allowed")};
  font-size: 16px;
  z-index: 3;
`;

const fadeInOut = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

const Message = styled.div`
  position: absolute;
  bottom: 200px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(144, 144, 144, 0.8);
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  white-space: nowrap;
  z-index: 100000;
  animation: ${fadeInOut} 2s ease-in-out;
`;

function HiddenRadish() {
  const [paidLoanNum, setPaidLoanNum] = useState(null);
  const [totalLoanNum, setTotalLoanNum] = useState(null);
  const [isPullAvailable, setIsPullAvailable] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchLoanNum() {
      try {
        const data = await getLoanSum();
        console.log("Loan data:", data);
        setPaidLoanNum(data.completedCnt);
        setTotalLoanNum(data.allLoanCnt);
        setIsPullAvailable(data.showButton);
      } catch (error) {
        console.error("대출개수 연동실패 했어용 힝힝", error);
      }
    }
    fetchLoanNum();
  }, []);

  const getPotImage = () => {
    const images = [potDefault, pot2nd, pot3rd, pot4th, pot5th, pot6th];

    if (paidLoanNum === 0) return potDefault;
    if (paidLoanNum === totalLoanNum) return pot6th;

    let stages;
    switch (totalLoanNum) {
      case 5:
        stages = [0, 1, 2, 3, 4, 5];
        break;
      case 4:
        stages = [0, 1, 3, 4, 5];
        break;
      case 3:
        stages = [0, 1, 3, 5];
        break;
      case 2:
        stages = [0, 3, 5];
        break;
      case 1:
        stages = [0, 5];
        break;
      default:
        stages = [0, 5];
    }

    const currentStageIndex = Math.min(paidLoanNum, stages.length - 1);
    return images[stages[currentStageIndex]];
  };

  const isComplete = paidLoanNum === totalLoanNum;

  const handleGetRadish = () => {
    if (isComplete) {
      if (!isPullAvailable) {
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 2000);
      } else {
        navigate("/get-radish", { state: { source: "loan" } });
      }
    }
  };

  return (
    <RadishContainer>
      <ChatBubbleContainer>
        <ChatBubble src={GrayChatBubble} alt="Chat bubble" />
        <ChatText>
          {`${totalLoanNum} / ${paidLoanNum}`}개 <br /> 상환{" "}
        </ChatText>
      </ChatBubbleContainer>
      <PotRadish src={getPotImage()} alt="Radish pot" />
      {isComplete && (
        <PullRadishButton
          onClick={handleGetRadish}
          isPullAvailable={isPullAvailable}
        >
          무 뽑기
        </PullRadishButton>
      )}
      {showMessage && <Message>이미 뽑으셨습니다</Message>}
    </RadishContainer>
  );
}

export default HiddenRadish;
