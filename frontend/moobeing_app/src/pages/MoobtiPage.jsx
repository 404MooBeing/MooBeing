import React from 'react';
import styled from 'styled-components';
import html2canvas from "html2canvas";
import saveAs from "file-saver";
import { useRef } from "react";
import MoobtiCard from '../components/Moobti/MoobtiCard';
import FlexRad from "../assets/radishes/flexRadish.png";
import useUserStore from '../store/UserStore';
import dayjs from "dayjs";

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

  const currentMonth = dayjs().format("MM");
  

  const character = {
    imageUrl: FlexRad,
    type: "소비 유형",
    name: "플렉스 (돈많아)",
    description: "주변에 배풀며 친구가 많은 분입니다. 즐거운 분위기를 좋아하시겠네요!"
  };

  const traits = [
    { category: "식비", left: "소식형", middle: "든든형", right: "든든형", percentage: 60, color: "#FF9999" },
    { category: "의료", left: "건강형", middle: "건강형", right: "아파형", percentage: 20, color: "#FFFF99" },
    { category: "맛집", left: "조용형", middle: "멋쟁형", right: "멋쟁형", percentage: 90, color: "#99FF99" },
    { category: "대출", left: "괜찮형", middle: "괜찮형", right: "필요형", percentage: 40, color: "#99CCFF" },
    { category: "유흥", left: "차분형", middle: "활발형", right: "활발형", percentage: 30, color: "#CC99FF" }
  ];

  return (
    <Screen>
      <PageContainer>
        <ContentWrapper>
          <TitleBox>
            <Title>{userInfo.name || "사용자"}님의<br />{currentMonth}월 MooBTI</Title>
          </TitleBox>
          <MoobtiCard 
            character={character} 
            traits={traits} 
            ref={divRef} 
            onDownload={handleDownload}
          />
        </ContentWrapper>
      </PageContainer>
    </Screen>
  );
};

export default MoobtiPage;