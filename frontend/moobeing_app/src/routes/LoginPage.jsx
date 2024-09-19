import styled from "styled-components";
import Logo from "../assets/logo/HorizontalLogo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postLogin } from "../apis/UserApi";

const ScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  margin-top: 30vh;
  position: relative;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const LogoImage = styled.img`
  height: 64px;
  object-fit: cover;
  width: 150px;
`;

const InputText = styled.input`
  border: 1px solid #348833;
  border-radius: 10px;
  font-family: "Inter-Regular", Helvetica;
  font-size: 12px;
  font-weight: 400;
  text-align: start;
  color: #24272d;
  background-color: #ffffff;
  width: 80%;
  margin: 8px 0;
  padding: 12px;
  outline-color: #e0eed2;
`;

const LoginButton = styled.button`
  height: 44px;
  width: 40%;
  border-radius: 10px;
  background-color: #e0eed2;
  color: #348833;
  font-size: 13px;
  font-weight: bold;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 20px;
  border: none;
`;

const PasswordLostContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  font-family: "Inter-Regular", Helvetica;
`;

const PasswordLost = styled.div`
  color: #348833;
  cursor: pointer;
  font-size: 12px;
  margin-bottom: 20px;
`;

const SignUpText = styled.p`
  font-family: "Inter-Regular", Helvetica;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  position: absolute;
  bottom: 5vh;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
`;

const Span = styled.span`
  color: #828282;
`;

const SignupButton = styled.button`
  background: none;
  border: none;
  color: #348833;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  padding: 0;
  margin-left: 5px;
  font-family: "Inter-Regular", Helvetica;
  text-decoration: underline;
`;

const AlertContainer = styled.div`
  position: fixed;
  top: 20vh;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  background-color: rgba(192, 221, 165, 0.8);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 500px;
  text-align: center;
  animation: fadeInOut 2s ease-in-out;
`;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // email을 위한 state
  const [password, setPassword] = useState(""); // password를 위한 state
  const [alertMessage, setAlertMessage] = useState(""); // 커스텀 경고창 메시지 상태 추가

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const showAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(""), 3000); // 3초 후 경고창 사라짐
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const loginData = {
      email: email,
      password: password,
    };

    console.log("Login data:", loginData);

    try {
      const response = await postLogin(email, password);

      if (response && response.name) {
        console.log("로그인 성공:", response);
        navigate("/");
      } else {
        // 오류 처리: response.data와 response.data.message의 존재 여부를 확인
        const errorMessage =
          response.data && response.data.message
            ? response.data.message
            : "로그인 실패";
        console.log("로그인 실패:", response.status);
        showAlert("로그인 실패: " + errorMessage); // 오류 메시지 표시
      }
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      // 오류 객체의 response 속성과 그 내부 속성을 안전하게 접근
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "로그인 중 오류가 발생했습니다.";
      showAlert(errorMessage); // 오류 메시지 표시
    }
  };

  return (
    <ScreenWrapper>
      <LogoImage alt="Logo" src={Logo} />
      <FormWrapper onSubmit={handleLogin}>
        <InputText
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // state 바꾸기
          autoComplete="email"
        />
        <InputText
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // state 바꾸기
          autoComplete="current-password"
        />
        <PasswordLostContainer>
          <PasswordLost>비밀번호를 잊으셨나요?</PasswordLost>
        </PasswordLostContainer>
        <LoginButton type="submit">로그인</LoginButton>
      </FormWrapper>
      {alertMessage && <AlertContainer>{alertMessage}</AlertContainer>}{" "}
      {/* 커스텀 경고창 */}
      <SignUpText>
        <Span>계정이 없으신가요?</Span>
        <SignupButton onClick={handleSignupClick}>가입하기</SignupButton>
      </SignUpText>
    </ScreenWrapper>
  );
};

export default Login;
