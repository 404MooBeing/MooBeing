import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import HomeIcon from "../../assets/button/HomeButton.svg";
import JourneyIcon from "../../assets/button/JourneyButton.svg";
import ConsumeIcon from "../../assets/button/ConsumeButton.svg";
import MapIcon from "../../assets/button/MapButton.svg";
import AllMenuIcon from "../../assets/button/AllMenuButton.svg";

const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around; /* 아이템들이 균등하게 배치되도록 설정 */
  height: 70px; /* Footer의 기본 높이 설정 */
  width: 100%; /* 화면 전체 너비를 차지 */
  position: fixed;
  bottom: 0;
  background-color: #ffffff;
  box-shadow: 0px -1px 4px #d9d9d9;
  z-index: 1000;

  .footer-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1; /* 아이템들이 균등하게 공간을 차지하도록 설정 */
    padding: 10px 0;
    cursor: pointer;
  }

  .footer-icon {
    width: 28px; /* 아이콘 크기 설정 */
    height: 28px;
  }

  .text-wrapper {
    color: #7a7a7a;
    font-family: "NanumSquare-Bold", Helvetica;
    font-size: 13px;
    font-weight: 700;
    text-align: center;
    white-space: nowrap;
    margin-top: 4px;
  }

  @media (max-width: 768px) {
    height: 70px; /* 모바일에서 Footer 높이 조정 */

    .footer-item {
      padding: 8px 0;
    }

    .footer-icon {
      width: 24px;
      height: 24px;
    }

    .text-wrapper {
      font-size: 12px;
    }
  }

  @media (min-width: 769px) {
    max-width: 767px; /* 웹일 때 가로 길이를 화면 전체로 설정 */
    width: 100%;

    .footer-item {
      max-width: 120px; /* 각 아이템이 너무 넓어지지 않도록 최대 너비 설정 */
    }
  }
`;

const Footer = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };
  const handleJourneyClick = () => {
    navigate("/loan-journey");
  };
  const handleSpendClick = () => {
    navigate("/spend");
  };
  const handleMapClick = () => {
    navigate("/capsule-intro");
  };
  const handleAllMenuClick = () => {
    navigate("/menu");
  };

  return (
    <StyledFooter>
      <div className="footer-item" onClick={handleHomeClick}>
        <img className="footer-icon" alt="home" src={HomeIcon} />
        <div className="text-wrapper">홈</div>
      </div>
      <div className="footer-item" onClick={handleJourneyClick}>
        <img className="footer-icon" alt="journey" src={JourneyIcon} />
        <div className="text-wrapper">여정</div>
      </div>
      <div className="footer-item" onClick={handleSpendClick}>
        <img className="footer-icon" alt="consume" src={ConsumeIcon} />
        <div className="text-wrapper">소비</div>
      </div>
      <div className="footer-item" onClick={handleMapClick}>
        <img className="footer-icon" alt="map" src={MapIcon} />
        <div className="text-wrapper">지도 </div>
      </div>
      <div className="footer-item" onClick={handleAllMenuClick}>
        <img className="footer-icon" alt="radish" src={AllMenuIcon} />
        <div className="text-wrapper">전체</div>
      </div>
    </StyledFooter>
  );
};

export default Footer;