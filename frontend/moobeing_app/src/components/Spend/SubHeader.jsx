import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import useUserStore from "../../store/UserStore";

const Title = styled.div`
  background-color: #f5fded;
  height: 20vh; /* Increased height */
  width: 90%;
  margin-top: 3vh;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px; /* Added padding */
  box-sizing: border-box;
`;

const AccentText = styled.span`
  font-weight: 700;
  font-size: 23px;
`;

const TitleText = styled.div`
  font-size: 20px;
  text-align: center;
`;

const LoanSum = styled.div`
  background-color: #f5fded;
  height: 8vh;
  width: 90%;
  margin-bottom: 5%;
  margin-top: 3vh;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
`;

const SpendSum = styled.span`
  font-weight: 700;
  margin-left: 8px;

  @media (min-width: 600px) {
    margin-left: 10px;
  }
`;

const AnalyzeButton = styled.button`
  margin: 0;
  font-size: 12px;
  padding: 6px;
  cursor: pointer;
  border: none;
  background-color: ${(props) =>
    props.buttonText === "분석하기" ? "#348833" : "#e0eed2"};
  color: ${(props) =>
    props.buttonText === "분석하기" ? "#ffffff" : "#24272D"};
  border-radius: 10px;

  @media (min-width: 600px) {
    font-size: 14px;
    padding: 8px;
  }
`;

const SubHeader = ({ month = "이월", onAnalyzeClick, totalExpense = 0 }) => {
  const userInfo = useUserStore((state) => state.userInfo);
  const [buttonText, setButtonText] = useState("분석하기");

  const handleButtonClick = () => {
    setButtonText((prevText) =>
      prevText === "분석하기" ? "캘린더 보기" : "분석하기"
    );
    onAnalyzeClick();
  };

  const userName = userInfo.name ? userInfo.name : "사용자";

  return (
    <>
      <Title>
        <TitleText>
          <AccentText>{userName}님</AccentText>
          의<br />
          <AccentText>{month}</AccentText> 지출내역
        </TitleText>
      </Title>
      <LoanSum>
        <SpendSum>총 지출: {totalExpense.toLocaleString()}원</SpendSum>
        <AnalyzeButton buttonText={buttonText} onClick={handleButtonClick}>
          {buttonText}
        </AnalyzeButton>
      </LoanSum>
    </>
  );
};

SubHeader.propTypes = {
  month: PropTypes.string,
  onAnalyzeClick: PropTypes.func.isRequired,
  totalExpense: PropTypes.number,
};

SubHeader.defaultProps = {
  month: "1월",
  totalExpense: 0,
};

export default SubHeader;