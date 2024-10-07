// Header.jsx
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import alarm from "../../assets/button/alarmButton.svg";
import logo from "../../assets/logo/ColumnLogo.png";
import auth from "../../assets/button/AuthButton.svg";

// StyledHeader 컴포넌트 정의
const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 77px;
  position: relative;
  width: 100%;
  box-shadow: 0px -2px 6px #d9d9d9;
  padding: 0 1vh;

  & .logo {
    width: 80px;
    cursor: pointer;
  }

  & .right-icons {
    display: flex;
    align-items: center;
    margin-right: 15px;
  }

  & .alarm {
    width: 26px;
    cursor: pointer;
    margin-left: 5%;
    // visibility: ${(props) => (props.$isAlarmVisible ? "visible" : "hidden")};
  }

  & .auth {
    width: 28px;
    cursor: pointer;
    margin: 18px;
  }
`;

const Header = ({ isAlarmVisible }) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleMyPageClick = () => {
    navigate("/user");
  };

  const handleAlarmClick = () => {
    navigate("/alarm");
  };

  return (
    <StyledHeader>
      <img className="logo" alt="logo" src={logo} onClick={handleHomeClick} />
      <div className="right-icons">
        <img
          className="alarm"
          alt="alarm"
          src={alarm}
          onClick={handleAlarmClick}
        />
        <img
          className="auth"
          alt="auth"
          src={auth}
          onClick={handleMyPageClick}
        />
      </div>
    </StyledHeader>
  );
};

export default Header;