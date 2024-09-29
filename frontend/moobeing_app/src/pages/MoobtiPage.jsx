import React from 'react';
import styled from 'styled-components';
import MoobtiCard from '../components/Moobti/MoobtiCard';

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
  padding-bottom: 150px; // Footer 공간 확보
  background-color: #ffffff;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 400px;
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
`;

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  padding: 20px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const CharacterImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: contain;
  margin-bottom: 10px;
`;

const CharacterName = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
`;

const StatusBar = styled.div`
  width: 100%;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 10px;
  margin-bottom: 10px;
  position: relative;
`;

const StatusFill = styled.div`
  width: ${props => props.percentage}%;
  height: 100%;
  background-color: ${props => props.color};
  border-radius: 10px;
`;

const StatusLabel = styled.span`
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const OuterCard = styled.div`
  background-color: #e8f5e9;
  border-radius: 25px;
  padding: 30px;
  width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0; // 하단 마진 150px 유지
`;

const OuterCardContent = styled.div`
  width: 100%;
  padding-bottom: 20px;
`;

const InnerCard = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  padding: 20px;
  width: calc(100% - 40px);
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const MoobtiPage = () => {
  const character = {
    imageUrl: "https://github.com/user-attachments/assets/1cdb8313-6a26-4186-8000-3acbd93903df",
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
            <Title>제갈파피님의<br />8월 MooBTI</Title>
          </TitleBox>
          <MoobtiCard character={character} traits={traits} />
        </ContentWrapper>
      </PageContainer>
    </Screen>
  );
};

export default MoobtiPage;
