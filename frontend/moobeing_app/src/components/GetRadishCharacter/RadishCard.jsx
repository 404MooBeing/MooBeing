import React from "react";
import styled from "styled-components";
import basicRad from "../../assets/radishes/basicRad.svg";
import nameTag from "../../assets/nameTag.svg";

const Card = styled.div`
  width: 300px;
  height: 500px;
  background-color: #f5fded;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* 세로 중앙 정렬 */
  padding: 10px; /* 내부 패딩 추가 */

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 20px;
    padding: 15px;
    background: linear-gradient(to bottom, #dddddd, #828181);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const NameTagContainer = styled.div`
  position: absolute;
  top: -22px;
  left: 9px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  z-index: 1;
`;

const NameTagImage = styled.img`
  width: 100px;
  height: 90px;
`;

const RankText = styled.span`
  position: absolute;
  left: 15px;
  top: 29px;
  color: white;
  font-size: 20px;
  font-weight: bold;
`;
const ImageContainer = styled.div`
  width: 78%;
  height: 200px;
  /* margin: 30px auto; */
  background-color: #effedf;
  border-radius: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 10px;
    padding: 5px;
    background: linear-gradient(to bottom, #f3f2f2, #828181);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`;

const CharacterImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
`;

const CharacterName = styled.h2`
  text-align: center;
  margin-top: 10px;
`;

const StarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;

const Star = ({ filled }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={filled ? "#FFD600" : "none"}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      stroke="#FFD600"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Description = styled.p`
  width: 60%;
  /* padding: 0 20px; */
  text-align: center;
`;

const getRankStars = (rank) => {
  switch (rank) {
    case "S":
      return 3;
    case "A":
      return 2;
    case "B":
      return 1;
    default:
      return 0;
  }
};

const CharacterCard = ({ name, rank, description, imageUrl }) => {
  const rankStars = getRankStars(rank);

  return (
    <>
      <Card>
        <NameTagContainer>
          <NameTagImage src={nameTag} alt="Name Tag" />
          <RankText>{rank}등급</RankText>
        </NameTagContainer>
        <ImageContainer>
          <CharacterImage src={imageUrl} alt={name} />
        </ImageContainer>
        <CharacterName>{name}</CharacterName>
        <StarContainer>
          {[...Array(3)].map((_, i) => (
            <Star key={i} filled={i < rankStars} />
          ))}
        </StarContainer>
        <Description>{description}</Description>
        {/* <Description>
          부끄러움이 상당히 많은 무. 밖에 잘 나가지 않지만 친구들이 부르면 또
          좋아한다.
        </Description> */}
      </Card>
    </>
  );
};

export default CharacterCard;