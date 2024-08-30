import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import potDefault from "../../assets/pot/potDefault.svg";
import pot2nd from "../../assets/pot/pot2nd.svg";
import pot3rd from "../../assets/pot/pot3rd.svg";
import pot4th from "../../assets/pot/pot4th.svg";
import pot5th from "../../assets/pot/pot5th.svg";
import pot6th from "../../assets/pot/pot6th.svg";
import { getLoanNumber } from "../../apis/LoanApi";

const RadishContainer = styled.div`
  height: 250px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  position: relative;
`;

const PotRadish = styled.img`
  width: auto;
  height: auto;
  max-width: 150px;
  object-fit: contain;
  margin-bottom: -30px;
`;

const PullRadishButton = styled.button`
  position: absolute;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 20px;
  background-color: ${(props) =>
    props.isPullAvailable ? "#4caf50" : "#cccccc"};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.isPullAvailable ? "pointer" : "not-allowed")};
  font-size: 16px;
  z-index: 3;
`;

const fadeInOut = keyframes`
  0% { opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { opacity: 0; }
`;

const Message = styled.div`
  position: absolute;
  bottom: 200px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: #c41a1a;
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
        const data = await getLoanNumber();
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

  // useEffect(() => {
  //   console.log(
  //     "State updated - paidLoanNum:",
  //     paidLoanNum,
  //     "totalLoanNum:",
  //     totalLoanNum,
  //     "isPullAvailable:",
  //     isPullAvailable
  //   );
  // }, [paidLoanNum, totalLoanNum, isPullAvailable]);

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
      <PotRadish src={getPotImage()} alt="Radish pot" />
      {isComplete && (
        <PullRadishButton
          onClick={handleGetRadish}
          isPullAvailable={isPullAvailable}
        >
          무뽑기
        </PullRadishButton>
      )}
      {showMessage && <Message>이미 뽑으셨습니다</Message>}
    </RadishContainer>
  );
}

export default HiddenRadish;
