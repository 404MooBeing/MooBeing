import React, { forwardRef } from 'react';
import styled from 'styled-components';
import downloadButtonImage from "../../assets/button/DownloadButton.png";

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
const isAndroid = /Android/.test(navigator.userAgent);

const Card = styled.div`
  background-color: #e8f5e9;
  border-radius: 20px;
  padding: 15px 20px 20px 20px;
  width: 90%;
  max-width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
  text-align: center;
`;

const CharacterImage = styled.img`
  width: 180px;
  height: 180px;
  object-fit: contain;
`;

const CharacterName = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;

  span {
    font-size: 26px;
    color: #348833;
  }
`;

const Description = styled.div`
  font-size: ${isAndroid ? '10px' : '15px'};
  font-weight: bold;
  line-height: 160%;
  color: #333;
  margin-bottom: 0;
  font-family: 'sans-serif';
`;

const StatusSection = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 5px 20px 5px 20px;
`;

const StatusTitle = styled.h3`
  font-size: 22px;
  margin-bottom: 20px;
  text-align: left;
`;

const TraitContainer = styled.div`
  margin-bottom: 12px;
`;

const TraitTitle = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
`

const StatusBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${props => props.color};
  border-radius: 4px;
  position: relative;
  margin-bottom: 5px;
`;

const StatusDot = styled.span`
  position: absolute;
  top: 50%;
  left: ${props => props.percentage}%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  background-color: white;
  border: 2px solid ${props => props.color};
  border-radius: 50%;
`;

const StatusLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
  margin-top: 10px;
`;

const Buttondiv = styled.div`
  display: flex;
  justify-content: flex-end;
`

const StyledDownloadButton = styled.img`
  width: 30px;
  height: 30px;
  background-size: cover;
  cursor: pointer;
  margin-bottom: 10px;
`;

const MoobtiCard = forwardRef(({ onDownload, categories, character }, ref) => {
  return (
    <Card ref={ref}>
      <Buttondiv>
        <StyledDownloadButton onClick={onDownload} src={downloadButtonImage} />
      </Buttondiv>
      <CardHeader>
        <CharacterName>
          {character.type}<br />
          <span>{character.name}</span>
        </CharacterName>
        <CharacterImage src={character.imageUrl} alt={character.name === "FlexRad" ? "FlexRad" : character.name} />
        <Description>{character.description}</Description>
      </CardHeader>
      <StatusSection>
        <StatusTitle>성향</StatusTitle>
        {[ 
          { category: "식비", left: "소식형", middle: "든든형", right: "든든형", percentage: categories[0].percent, color: "#FF9999" },
          { category: "의료", left: "건강형", middle: "건강형", right: "아파형", percentage: categories[1].percent, color: "#FFFF99" },
          { category: "문화", left: "조용형", middle: "멋쟁형", right: "멋쟁형", percentage: categories[2].percent, color: "#99FF99" },
          { category: "대출", left: "괜찮형", middle: "괜찮형", right: "필요형", percentage: categories[3].percent, color: "#99CCFF" },
          { category: "유흥", left: "차분형", middle: "활발형", right: "활발형", percentage: categories[4].percent, color: "#CC99FF" }
        ].map((trait, index) => {
          const isLeftCloser = trait.percentage <= 50; 
          return (
            <TraitContainer key={index}>
              <TraitTitle>
                {trait.percentage}%
              </TraitTitle>
              <StatusBar color={trait.color}>
                <StatusDot percentage={trait.percentage} color={trait.color} />
              </StatusBar>
              <StatusLabel>
                <span style={{ fontWeight: isLeftCloser ? 'bold' : 'normal' }}>{trait.left}</span>
                <span style={{ fontWeight: !isLeftCloser ? 'bold' : 'normal' }}>{trait.right}</span>
              </StatusLabel>
            </TraitContainer>
          );
        })}
      </StatusSection>
    </Card>
  );
});

export default MoobtiCard;
