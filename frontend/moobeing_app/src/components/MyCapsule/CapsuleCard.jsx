import React, { useState } from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background-color: white;  // 카드 배경을 하얀색으로 설정
  border-radius: 10px;
  padding: 30px 30px 20px 30px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const CardTitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
`;

const CardIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 12px;
  background-image: url(${props => props.url});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const CardAmount = styled.div`
  font-weight: bold;
  font-size: 14px;
`;

const CardImageContainer = styled.div`
  width: 100%;
  padding-top: 80%;
  position: relative;
  margin: 20px auto; /* 위, 아래 16px, 양옆 자동으로 중간 정렬 */
  overflow: hidden;
  border-radius: 10px;
`;

const CardImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(${props => props.url});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const CardContent = styled.div`
  font-size: 15px;
  line-height: 1.5;
  white-space: pre-wrap;
  font-family: 'EarlyFontDiary';
  padding-left: 5px;
`;

const CapsuleCard = ({ title, amount, imageUrl, iconUrl, content }) => {
  const [imgUrl, setImgUrl] = useState(imageUrl);
  const [iconImgUrl, setIconImgUrl] = useState(iconUrl);

  const handleImageError = () => {
    setImgUrl('https://via.placeholder.com/400x320?text=Image+Not+Available');
  };

  const handleIconError = () => {
    setIconImgUrl('https://via.placeholder.com/24x24?text=Icon');
  };

  const formatContent = (text) => {
    if (typeof text !== 'string') {
      return text;
    }
    return text.split('\\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split('\\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <CardIcon url={iconImgUrl} onError={handleIconError} />
          {title}
        </CardTitle>
        <CardAmount>{amount}원</CardAmount>
      </CardHeader>
      
      <CardImageContainer>
        <CardImage 
          url={imgUrl} 
          onError={handleImageError}
        />
        <GradientOverlay />
      </CardImageContainer>
      
      <CardContent>{formatContent(content)}</CardContent>
    </Card>
  );
};

export default CapsuleCard;