import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f0;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 150px; // 하단 마진 150px 추가
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
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
  const characterImageUrl = "https://example.com/radish_character.png"; // 실제 이미지 URL로 교체해주세요

  return (
    <PageContainer>
      <ContentWrapper>
        <Title>제갈파피님의<br />8월 MooBTI</Title>
        <OuterCard>
          <OuterCardContent>
            <InnerCard>
              <CharacterImage src={characterImageUrl} alt="무 캐릭터" />
              <CharacterName>소비 유형<br />플렉스 (돈많아)</CharacterName>
              <Description>주변에 배품머 친구가 많은 분입니다. 즐거운 분위기를 좋아하시겠네요!</Description>
            </InnerCard>
            <InnerCard>
              <h3>성향</h3>
              <StatusLabel>
                <span>소비형</span>
                <span>60% 존트</span>
                <span>존돈형</span>
              </StatusLabel>
              <StatusBar>
                <StatusFill percentage={60} color="#FF9999" />
              </StatusBar>
              <StatusLabel>
                <span>의욕형</span>
                <span>20% 건강</span>
                <span>아파형</span>
              </StatusLabel>
              <StatusBar>
                <StatusFill percentage={20} color="#FFFF99" />
              </StatusBar>
              <StatusLabel>
                <span>조용형</span>
                <span>90% 맛집</span>
                <span>맛집형</span>
              </StatusLabel>
              <StatusBar>
                <StatusFill percentage={90} color="#99FF99" />
              </StatusBar>
              <StatusLabel>
                <span>대출형</span>
                <span>40% 관</span>
                <span>필요형</span>
              </StatusLabel>
              <StatusBar>
                <StatusFill percentage={40} color="#99CCFF" />
              </StatusBar>
              <StatusLabel>
                <span>유흥형</span>
                <span>30% 차</span>
                <span>필방형</span>
              </StatusLabel>
              <StatusBar>
                <StatusFill percentage={30} color="#CC99FF" />
              </StatusBar>
            </InnerCard>
          </OuterCardContent>
        </OuterCard>
      </ContentWrapper>
    </PageContainer>
  );
};

export default MoobtiPage;
