import styled from "styled-components";
import logo from "../../assets/logo.png";
import auth from "../../assets/개인정보.svg";

const StyledHeader = styled.div`
  height: 39px;
  position: relative;
  width: 341px;

  & .logo {
    height: 26px;
    left: 306px;
    position: absolute;
    top: 7px;
    width: 28px;
  }

  & .auth {
    height: 39px;
    left: 9px;
    position: absolute;
    top: 0;
    width: 51px;
  }
`;

export const Header = () => {
  return (
    <StyledHeader>
      <img className="logo" alt="logo" src={logo} />
      <img className="auth" alt="auth" src={auth} />
    </StyledHeader>
  );
};
