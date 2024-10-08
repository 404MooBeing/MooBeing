import React from 'react';
import styled from 'styled-components';
import html2canvas from "html2canvas";
import saveAs from "file-saver";
import { useRef, useState } from "react";
import { useEffect } from 'react';
import MoobtiCard from '../components/Moobti/MoobtiCard';
import useUserStore from '../store/UserStore';
import dayjs from "dayjs";
import { getMoobti } from "../apis/MoobtiApi";

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

const MoobtiPage = () => {
  const divRef = useRef(null);
  const { userInfo } = useUserStore();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getMoobti();
      setData(result);
    };
    fetchData();
  }, []);

  const handleDownload = async () => {
    if (!divRef.current) return;
  
    try {
      document.fonts.ready.then(async () => {
        const canvas = await html2canvas(divRef.current, { scale: 3 });
        canvas.toBlob((blob) => {
          if (blob !== null) {
            saveAs(blob, "moobti_result.png");
          }
        });
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!data) return <div>로딩 중...</div>;

  const currentMonth = dayjs().format("MM");

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
    </Screen>
  );
};

export default MoobtiPage;