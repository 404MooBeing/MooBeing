import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background-color: #e8f5e9;
  border-radius: 20px;
  padding: 20px;
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
  width: 200px;
  height: 200px;
  object-fit: contain;
  margin-bottom: 20px;
`;

const CharacterName = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;

  .highlight {
    font-size: 28px;
    color: #4CAF50;
  }
`;

const Description = styled.p`
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-bottom: 0;
`;

const StatusSection = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 20px;
`;

const StatusTitle = styled.h3`
  font-size: 22px;
  margin-bottom: 20px;
  text-align: left;
`;

const TraitContainer = styled.div`
  margin-bottom: 20px;
`;

const TraitName = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #000000; // 검은색으로 변경
  margin-bottom: 5px;
`;

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
`;

const TraitCategory = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
`;

const PercentageDisplay = styled.span`
  margin: 0 5px;
`;

const SelectedTrait = styled.span`
  color: inherit;
`;

const TraitLabel = styled.span`
  font-weight: ${props => props.isCloser ? 'bold' : 'normal'};
  color: ${props => props.isCloser ? '#000' : '#666'};
`;

const MoobtiCard = ({ character, traits }) => {
  return (
    <Card>
      <CardHeader>
        <CharacterName>
          {character.type}<br />
          <span className="highlight">{character.name}</span>
        </CharacterName>
        <CharacterImage src={character.imageUrl} alt={character.name} />
        <Description>{character.description}</Description>
      </CardHeader>
      <StatusSection>
        <StatusTitle>성향</StatusTitle>
        {traits.map((trait, index) => (
          <TraitContainer key={index}>
            <TraitCategory>
              {trait.category}:
              <PercentageDisplay>
                {trait.percentage}%
              </PercentageDisplay>
              <SelectedTrait>
                {trait.percentage > 50 ? trait.right : trait.left}
              </SelectedTrait>
            </TraitCategory>
            <StatusBar color={trait.color}>
              <StatusDot percentage={trait.percentage} color={trait.color} />
              {/* StatusPercentage 컴포넌트 제거 */}
            </StatusBar>
            <StatusLabel>
              <TraitLabel isCloser={trait.percentage <= 50}>{trait.left}</TraitLabel>
              <TraitLabel isCloser={trait.percentage > 50}>{trait.right}</TraitLabel>
            </StatusLabel>
          </TraitContainer>
        ))}
      </StatusSection>
    </Card>
  );
};

export default MoobtiCard;