import React from 'react';
import styled from 'styled-components';
// import html2canvas from "html2canvas";
import domtoimage from "dom-to-image";
import saveAs from "file-saver";
import { useRef, useState } from "react";
import { useEffect } from 'react';
import MoobtiCard from '../components/Moobti/MoobtiCard';
import useUserStore from '../store/UserStore';
import dayjs from "dayjs";
import { getMoobti } from "../apis/MoobtiApi";
import { SyncLoader } from "react-spinners";

const Screen = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const PageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 20px;
  padding-bottom: 150px;
  background-color: #ffffff;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleBox = styled.div`
  background-color: #e8f5e9;
  border-radius: 20px;
  padding: 20px;
  width: 90%;
  max-width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  color: #333;
  line-height: 150%;
`;

const AlertContainer = styled.div`
  position: fixed;
  top: 45%;
  left: 48%;
  width: 75%;
  transform: translateX(-50%);
  background-color: rgba(53, 53, 53, 0.7);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 60%;
  max-width: 500px;
  text-align: center;
  animation: fadeInOut 2s ease-in-out;
`;

const MoobtiPage = () => {
  const divRef = useRef(null);
  const { userInfo } = useUserStore();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(""); // 커스텀 경고창 메시지 상태 추가


  const showAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(""), 3000); // 3초 후 경고창 사라짐
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getMoobti();
      setData(result);
    };
    fetchData();
  }, []);

  // const handleDownload = async () => {
  //   if (!divRef.current) return;
  
  //   try {
  //     document.fonts.ready.then(async () => {
  //       const canvas = await html2canvas(divRef.current, { scale: 3 });
  //       canvas.toBlob((blob) => {
  //         if (blob !== null) {
  //           saveAs(blob, "moobti_result.png");
  //         }
  //       });
  //     });
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const handleDownload = async () => {
    if (!divRef.current) return;
    setIsLoading(true); // 다운로드 시작 시 로딩 표시
    try {
      document.fonts.ready.then(() => {
        domtoimage
          .toBlob(divRef.current)
          .then((blob) => {
            if (blob !== null) {
              saveAs(blob, "moobti_result.png");
              showAlert("다운로드 되었습니다!"); // 성공 시 메시지
            }
            setIsLoading(false); // 다운로드 완료 시 로딩 해제
          })
          .catch((error) => {
            console.error("Error generating image:", error);
            showAlert("다운로드에 실패했습니다!"); // 실패 시 메시지
            setIsLoading(false); // 오류 시에도 로딩 해제
          });
      });
    } catch (error) {
      console.error("Error:", error);
      showAlert("다운로드에 실패했습니다!"); // 예외 발생 시 메시지
      setIsLoading(false); // 오류 시에도 로딩 해제
    }
  };

  if (!data) 
    return (  
    <PageContainer>
      <SyncLoader color="#348833" size={8} />
    </PageContainer>
    );

  const currentMonth = dayjs().format("MM") - 1;

  return (
    <Screen>
      <PageContainer>
        <ContentWrapper>
          <TitleBox>
            <Title>{userInfo.name || "사용자"}님의<br />{currentMonth}월 MooBTI</Title>
          </TitleBox>
          <MoobtiCard 
            character={data.character} 
            categories={data.categories} 
            ref={divRef} 
            onDownload={handleDownload}
          />
        </ContentWrapper>
      </PageContainer>
      {alertMessage && (
        <AlertContainer>
          {alertMessage}
        </AlertContainer>
      )}
    </Screen>
  );
};

export default MoobtiPage;