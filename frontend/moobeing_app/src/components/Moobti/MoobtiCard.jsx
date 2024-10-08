import React, { forwardRef } from 'react';
import styled from 'styled-components';
import downloadButtonImage from "../../assets/button/DownloadButton.png";

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
    font-size: 28px;
    color: #348833;
  }
`;

const Description = styled.p` 
  font-size: clamp(12px, 3vw, 16px);
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

const MoobtiCard = forwardRef(({ character, traits, onDownload }, ref) => {
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
        <CharacterImage src={character.imageUrl} alt={character.name} />
        <Description>{character.description}</Description>
      </CardHeader>
      <StatusSection>
        <StatusTitle>성향</StatusTitle>
        {traits.map((trait, index) => (
          <TraitContainer key={index}>
            <TraitTitle>{trait.category}: {trait.percentage}%</TraitTitle>
            <StatusBar color={trait.color}>
              <StatusDot percentage={trait.percentage} color={trait.color} />
            </StatusBar>
            <StatusLabel>
              <span>{trait.left}</span>
              <span>{trait.right}</span>
            </StatusLabel>
          </TraitContainer>
        ))}
      </StatusSection>
    </Card>
  );
});

export default MoobtiCard;
