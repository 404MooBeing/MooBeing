// Header.jsx
import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import alarm from "../../assets/button/alarmButton.svg";
import logo from "../../assets/logo/ColumnLogo.png";
import auth from "../../assets/button/AuthButton.svg";
import useAlarmStore from "../../store/AlarmStore";
import { getIsAlarm } from "../../apis/AlarmApi";

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
    position: relative;
  }

  & .alarm {
    width: 28px;
    cursor: pointer;
    margin-left: 5%;
  }

  & .auth {
    width: 30px;
    cursor: pointer;
    margin: 18px;
  }

  & .notification-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    top: -4px;
    right: -5px;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const isAlarm = useAlarmStore((state) => state.isAlarm); // 상태 구독

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleMyPageClick = () => {
    navigate("/user");
  };

  const handleAlarmClick = () => {
    useAlarmStore.getState().setIsAlarm(false); // 알림 확인 시 isAlarm을 false로 설정
    navigate("/alarm");
  };

  const fetchAlarmStatus = async () => {
    try {
      const fetchedIsAlarm = await getIsAlarm();
      useAlarmStore.getState().setIsAlarm(fetchedIsAlarm);
    } catch (error) {
      console.error("Error fetching alarm status:", error);
      useAlarmStore.getState().setIsAlarm(false);
    }
  };

  useEffect(() => {
    fetchAlarmStatus();
  }, []);

  return (
    <StyledHeader>
      <img className="logo" alt="logo" src={logo} onClick={handleHomeClick} />
      <div className="right-icons">
        <div style={{ position: "relative" }}>
          {isAlarm && <div className="notification-dot" />} {/* isAlarm이 true일 때만 빨간 점 표시 */}
          <img
            className="alarm"
            alt="alarm"
            src={alarm}
            onClick={handleAlarmClick}
          />
        </div>
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

