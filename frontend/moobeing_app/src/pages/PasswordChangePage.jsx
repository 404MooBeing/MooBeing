import { useState } from "react";
import styled from "styled-components";
import { postPasswordChange } from "../apis/UserApi"; // 비밀번호 변경 함수 가져오기
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 hook 가져오기

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 15vh;
  width: 100%;
  box-sizing: border-box;
`;

const Title = styled.div`
  color: #24272d;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 30px;
`;

const InputText = styled.input`
  background-color: white;
  border: 1px solid #348833;
  border-radius: 10px;
  font-family: "Inter-Regular", Helvetica;
  font-size: 12px;
  font-weight: 400;
  text-align: start;
  width: 80%;
  margin: 8px 0;
  padding: 12px;
  outline-color: #e0eed2;
`;

const ChangeButton = styled.button`
  height: 10%;
  width: 110px;
  border-radius: 10px;
  margin-top: 15vh;
  margin-bottom: 5px;
  padding: 10px 20px;
  background-color: #e0eed2;
  color: #24272d;
  font-size: 13px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 600px) {
    width: 125px;
    font-size: 16px;
  }
`;

const PasswordMismatchMessage = styled.div`
  display: flex;
  justify-content: end;
  color: #f15e5e;
  font-family: "Inter-Regular", Helvetica;
  font-size: 9px;
  font-weight: 400;
  margin-top: 5px;
  margin-right: 8vh;
  width: 100%;
`;

const SuccessMessage = styled.div`
  display: flex;
  justify-content: center;
  color: #348833;
  font-family: "Inter-Regular", Helvetica;
  font-size: 12px;
  font-weight: 400;
  margin-top: 10px;
  width: 100%;
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  color: #f15e5e;
  font-family: "Inter-Regular", Helvetica;
  font-size: 12px;
  font-weight: 400;
  margin-top: 10px;
  width: 100%;
`;

const AlertContainer = styled.div`
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  background-color: rgba(255, 68, 58, 0.798);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  animation: fadeInOut 2s ease-in-out;
  width: 80%; /* 너비를 80%로 설정 */
  max-width: 500px; /* 최대 너비를 500px로 설정 */
`;

const PasswordChange = () => {
  const [oldPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [passwordSame, setPasswordSame] = useState(false); // 기존 비밀번호와 새 비밀번호 일치 상태 추가
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태 추가
  const [successMessage, setSuccessMessage] = useState(""); // 성공 메시지 상태 추가
  const [isPasswordChanged, setIsPasswordChanged] = useState(false); // 비밀번호 변경 성공 여부 상태 추가
  const [alertMessage, setAlertMessage] = useState(""); // 커스텀 경고창 메시지 상태 추가
  const navigate = useNavigate(); // 페이지 이동을 위한 hook 사용

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    setPasswordMismatch(false); // 새로운 비밀번호가 입력되면 mismatch 상태 리셋
    setPasswordSame(false); // 새로운 비밀번호가 입력되면 기존 비밀번호와의 일치 상태 리셋
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
    if (newPassword !== e.target.value) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
    }
  };

  const showAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(""), 2000); // 2초 후 경고창 사라짐
  };

  const handleChangePassword = async () => {
    if (passwordMismatch) {
      showAlert(`새 비밀번호와 확인 비밀번호가
        일치하지 않습니다.`);
      return;
    }

    if (oldPassword === newPassword) {
      setPasswordSame(true); // 기존 비밀번호와 새 비밀번호가 일치함을 표시
      showAlert("기존 비밀번호와 새 비밀번호가 일치합니다.");
      return;
    }

    try {
      console.log(oldPassword + " " + newPassword)
      const response = await postPasswordChange(oldPassword, newPassword); // 비밀번호 변경 요청
      setSuccessMessage("비밀번호가 성공적으로 변경되었습니다."); // 성공 메시지 설정
      setErrorMessage(""); // 에러 메시지 리셋
      setIsPasswordChanged(true); // 비밀번호 변경 성공 상태 설정
    } catch (error) {
      setErrorMessage("비밀번호 변경에 실패했습니다. 다시 시도해 주세요."); // 에러 메시지 설정
      setSuccessMessage(""); // 성공 메시지 리셋
    }
  };

  const handleGoHome = () => {
    navigate("/"); // 홈으로 이동
  };

  return (
    <Container>
      <Title>비밀번호 변경하기</Title>
      {alertMessage && <AlertContainer>{alertMessage}</AlertContainer>}{" "}
      {/* 커스텀 경고창 추가 */}
      <InputText
        type="password"
        placeholder="기존 비밀번호"
        value={oldPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <InputText
        type="password"
        placeholder="새 비밀번호"
        value={newPassword}
        onChange={handleNewPasswordChange}
      />
      <InputText
        type="password"
        placeholder="새 비밀번호 확인"
        value={confirmNewPassword}
        onChange={handleConfirmNewPasswordChange}
      />
      {passwordMismatch && (
        <PasswordMismatchMessage>
          비밀번호가 일치하지 않습니다
        </PasswordMismatchMessage>
      )}
      {passwordSame && (
        <PasswordMismatchMessage>
          기존 비밀번호와 새 비밀번호가 일치합니다
        </PasswordMismatchMessage>
      )}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      {isPasswordChanged ? (
        <ChangeButton onClick={handleGoHome}>홈으로 가기</ChangeButton>
      ) : (
        <ChangeButton onClick={handleChangePassword}>변경하기</ChangeButton>
      )}
    </Container>
  );
};

export default PasswordChange;
