import SmileRadish from "../assets/radishes/smileRad.svg";
import styled from "styled-components";

const WelcomeDiv = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;

  & .text-wrapper {
    color: #348833;
    font-size: 12px;
    letter-spacing: 0;
    line-height: normal;
    text-align: center;
    font-family: 'S-CoreDream';
  }

  & .element {
    height: 20%;
    width: 30%;
    object-fit: contain;
  }

  & .userName {
    font-weight: bold;
  }
`;

const Welcome = () => {
  return (
    <WelcomeDiv>
      <img className="element" alt="Element" src={SmileRadish} />
      <p className="text-wrapper">
        <span className="userName">사용자</span>님, <br />
        환영해요!
      </p>
    </WelcomeDiv>
  );
};

export default Welcome;
