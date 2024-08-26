import { useState } from "react";
import styled from "styled-components";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
`;

const FixedTitle = styled.div`
  color: #24272d;
  font-size: 28px;
  font-weight: 400;
  text-align: center;
  margin-bottom: 20px;
  position: fixed;
  top: 24vh;
  width: 100%;
  z-index: 1;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 93%;
  padding-top: 60px;
  overflow-y: auto;
  position: relative;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
`;

const InputGroup = styled.div`
  margin-top: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InputGroupEmail = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-bottom: 5px;
`;

const InputGroupHumanNumber = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
`;

const InputLabel = styled.div`
  color: #348833;
  font-family: "Inter-Regular", Helvetica;
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 8px;
  margin-left: 2px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 15px 20px;
  border: 1px solid #348833;
  border-radius: 10px;
  font-size: 15px;
  font-family: "Inter-Regular", Helvetica;
  outline-color: #e0eed2;
  box-sizing: border-box;
  letter-spacing: 1px;
`;


const HumanInputField = styled.input`
  width: 40px;
  padding: 15px 0px;
  border: 1px solid #348833;
  outline-color: #e0eed2;
  border-radius: 10px;
  text-align: center;
  font-size: 15px;
  font-family: "Inter-Regular", Helvetica;
  box-sizing: border-box;
  letter-spacing: 1px;
`;

const MaskedDisplay = styled.div`
  width: 80%;
  border: none;
  border-radius: 10px;
  font-size: 25px;
  font-family: "Inter-Regular", Helvetica;
  box-sizing: border-box;
  background-color: #ffffff;
  text-align: center;
  color: #000000;
  letter-spacing: 1px;
`;

const PasswordNote = styled.p`
  display: flex;
  justify-content: flex-end;
  color: #f15e5e;
  font-family: "Inter-Regular", Helvetica;
  font-size: 9px;
  font-weight: 400;
  margin-top: 5px;
  width: 100%;
`;

const PasswordMismatchMessage = styled.div`
  display: flex;
  justify-content: flex-end;
  color: #f15e5e;
  font-family: "Inter-Regular", Helvetica;
  font-size: 9px;
  font-weight: 400;
  margin-top: 5px;
  width: 100%;
`;

const PasswordConfirmGroup = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ConfirmButton = styled.button`
  height: 44px;
  width: 80px;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #e0eed2;
  border-radius: 10px;
  border: none;
`;

const ConfirmButtonText = styled.div`
  color: #348833;
  font-family: "Inter-Regular", Helvetica;
  font-size: 12px;
  font-weight: 400;
`;

const SignUpButton = styled.button`
  height: 44px;
  width: 45%;
  border-radius: 10px;
  margin-top: 5vh;
  padding: 10px 20px;
  background-color: #e0eed2;
  color: #348833;
  font-size: 13px;
  font-weight: bold;
  border: none;
  cursor: pointer;
`;

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [humanNumber, setHumanNumber] = useState({ part1: "", part2: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleEnterKeyPress = (e, nextStep) => {
    if (e.key === "Enter") {
      handleNextStep(nextStep);
    }
  };

  const handleNextStep = (nextStep) => {
    setStep(nextStep);
  };

  const handlePasswordConfirm = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMismatch(password !== e.target.value);
  };

  const handleHumanNumberPart1Change = (e) => {
    const value = e.target.value.slice(0, 6); // 6글자로 제한
    setHumanNumber({ ...humanNumber, part1: value });
  };

  const handleHumanNumberPart2Change = (e) => {
    const value = e.target.value.slice(0, 1); // 1글자로 제한
    setHumanNumber({ ...humanNumber, part2: value });
  };

  const handleSignUp = () => {
    const formattedHumanNumber = `${humanNumber.part1}${humanNumber.part2}`;
    const signUpData = {
      email,
      password,
      name,
      humanNumber: parseInt(formattedHumanNumber, 10),
    };

    console.log(signUpData); // For debugging purposes, to see the structure of data before sending the POST request.

    // Here you would perform the POST request to your server API.
    // For example:
    // fetch('YOUR_API_ENDPOINT', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(signUpData),
    // }).then(response => response.json()).then(data => console.log(data)).catch(error => console.error(error));
  };

  return (
    <PageWrapper>
      <FixedTitle>회원가입</FixedTitle>
      <Container>
        <Form>
          {step === 1 && (
            <InputGroup>
              <InputLabel>이름</InputLabel>
              <InputField
                type="text"
                placeholder="사용자 이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => handleEnterKeyPress(e, 2)}
              />
            </InputGroup>
          )}
          {step === 2 && (
            <InputGroup>
              <InputLabel>주민번호</InputLabel>
              <InputGroupHumanNumber>
                <InputField
                  type="text"
                  placeholder="앞자리"
                  maxLength={6}
                  value={humanNumber.part1}
                  onChange={handleHumanNumberPart1Change}
                  onKeyDown={(e) => handleEnterKeyPress(e, 3)}
                />
                -
                <HumanInputField
                  type="text"
                  maxLength={1}
                  value={humanNumber.part2}
                  onChange={handleHumanNumberPart2Change}
                  onKeyDown={(e) => handleEnterKeyPress(e, 3)}
                />
                <MaskedDisplay>●●●●●●</MaskedDisplay>
              </InputGroupHumanNumber>
            </InputGroup>
          )}
          {step >= 3 && (
            <InputGroup>
              <InputLabel>사용할 이메일</InputLabel>
              <InputGroupEmail>
                <InputField
                  type="email"
                  placeholder="이메일"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => handleEnterKeyPress(e, 4)}
                />
                <ConfirmButton onClick={() => handleNextStep(4)}>
                  <ConfirmButtonText>중복확인</ConfirmButtonText>
                </ConfirmButton>
              </InputGroupEmail>
            </InputGroup>
          )}
          {step >= 4 && (
            <InputGroup>
              <InputLabel>비밀번호</InputLabel>
              <InputField
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => handleEnterKeyPress(e, 5)}
              />
              <PasswordNote>
                8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요
              </PasswordNote>
            </InputGroup>
          )}
          {step >= 5 && (
            <PasswordConfirmGroup>
              <InputLabel>비밀번호 확인</InputLabel>
              <InputField
                type="password"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={handlePasswordConfirm}
                onKeyDown={(e) => handleEnterKeyPress(e, 6)}
              />
              {passwordMismatch && (
                <PasswordMismatchMessage>
                  비밀번호가 일치하지 않습니다
                </PasswordMismatchMessage>
              )}
            </PasswordConfirmGroup>
          )}
          {step >= 5 && (
            <SignUpButton onClick={handleSignUp}>회원 가입하기</SignUpButton>
          )}
        </Form>
      </Container>
    </PageWrapper>
  );
};

export default SignUp;
