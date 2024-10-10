import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useCapsuleStore from "../store/CapsuleStore";
import AddImgIcon from "../assets/capsules/AddImgIcon.png";

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 80%;
  max-width: 500px;
  margin: 0 auto;
  margin-top: -10%;
  height: 80vh;
`;

const TransactionBox = styled.div`
  border: 1px solid #ccc;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const TransactionInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TransactionName = styled.p`
  font-weight: bold;
  margin: 0 0 5px 0;
`;

const TransactionAmount = styled.p`
  margin: 0;
`;

const TransactionTime = styled.p`
  margin: 0;
  align-self: flex-end;
`;

const ImgForm = styled.div`
  background-color: #f5fded;
  height: 20vh;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-top: none;
  position: relative;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;

const ImageInput = styled.input`
  display: none;
`;

const ImageLabel = styled.label`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  background-image: url(${AddImgIcon});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const ReselectionButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const TextForm = styled.div`
  background-color: #f5fded;
  height: 23vh;
  padding: 20px;
  border: 1px solid #ccc;
  border-top: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  position: relative;

  /* Flexbox 설정 */
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
`;

const TextArea = styled.textarea`
  width: 100%;
  height: calc(100% - 20px);
  border: none;
  background-color: transparent;
  resize: none;
  font-size: 17px;
  font-family: "EarlyFontDiary";
  outline: none;

  &:focus {
    outline: 1px solid darkgreen;
  }
`;

const CharCount = styled.span`
  position: absolute;
  bottom: 5px;
  right: 10px;
  font-size: 12px;
  color: #666;
`;

const NextButton = styled.button`
  width: 80%;
  max-width: 500px;
  background-color: ${(props) => (props.disabled ? "#cccccc" : "#e0eed2")};
  color: black;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  position: absolute;
  bottom: 12%;
  left: 50%;
  transform: translateX(-50%);
`;

function CapsuleMessage() {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const {
    transactionName,
    transactionAmount,
    transactionDate,
    updateImgAndDescription,
  } = useCapsuleStore();

  const handleNext = () => {
    updateImgAndDescription(imageFile, text);
    navigate("/choose-character");
  };

  const handleTextChange = (e) => {
    if (e.target.value.length <= 200) {
      setText(e.target.value);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file); // 진짜 이미지 파일
      setImagePreview(URL.createObjectURL(file)); // 미리보기용 이미지
    }
  };

  const handleImageSelection = () => {
    fileInputRef.current.click();
  };

  return (
    <Container>
      <TransactionBox>
        <TransactionInfo>
          <TransactionName>{transactionName}</TransactionName>
          <TransactionAmount>{transactionAmount}원</TransactionAmount>
        </TransactionInfo>
        <TransactionTime>{transactionDate}</TransactionTime>
      </TransactionBox>
      <ImgForm>
        {imagePreview ? (
          <>
            <ImagePreview src={imagePreview} alt="Preview" />
            <ReselectionButton onClick={handleImageSelection}>
              다시 선택
            </ReselectionButton>
          </>
        ) : (
          <ImageLabel onClick={handleImageSelection}></ImageLabel>
        )}
        <ImageInput
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          ref={fileInputRef}
        />
      </ImgForm>
      <TextForm>
        <TextArea
          value={text}
          onChange={handleTextChange}
          placeholder="메시지를 입력하세요..."
        />
        <CharCount>{text.length} / 200</CharCount>
      </TextForm>
      <NextButton onClick={handleNext} disabled={text.trim() === ""}>
        다음
      </NextButton>{" "}
    </Container>
  );
}

export default CapsuleMessage;
