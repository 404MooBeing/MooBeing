import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import closeButton from "../../assets/button/closeButton.svg";
import useTransactionStore from '../../store/TransactionStore'; // Zustand import

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 60px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background-color: white;
  padding: 30px 30px 35px 30px;
  border-radius: 10px;
  width: 100%;
  position: relative;
`;

const HeadContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 18px;
  margin-bottom: 15px;
`;

const Close = styled.div`
  position: absolute;
  right: 15px;
  top: 15px;
  cursor: pointer;
`;

const CloseImg = styled.img`
  width: 18px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const SortButton = styled.button`
  background-color: #ffffff;
  color: #5E5054;
  border: 2.5px solid ${props => (props.selected ? '#348833' : '#ccc')};
  padding: 10px 15px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  flex: 1;
  margin: 0 5px;
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
`;

const SelectButton = styled.button`
  background-color: #E0EED2;
  color: #5E5054;
  border: none;
  padding: 10px 15px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 15px;
  width: 100%;
`;

const SortTransaction = ({ onClose }) => {
  const { sortCriteria, setSortCriteria } = useTransactionStore(); // Zustand에서 가져오기

  const [selectedPeriod, setSelectedPeriod] = useState(sortCriteria.period);
  const [selectedType, setSelectedType] = useState(sortCriteria.type);

  // 처음 렌더링 시 Zustand의 값으로 초기값 설정
  useEffect(() => {
    setSelectedPeriod(sortCriteria.period);
    setSelectedType(sortCriteria.type);
  }, [sortCriteria]);

  const handlePeriodClick = (period) => {
    setSelectedPeriod(period);
  };

  const handleTypeClick = (type) => {
    setSelectedType(type);
  };

  const handleClose = () => {
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // 조회 버튼 클릭 시 Zustand에 저장하고, 팝업 닫기
  const handleSelectClick = () => {
    setSortCriteria({ period: selectedPeriod, type: selectedType });
    onClose();
  };

  return (
    <PopupOverlay onClick={handleOverlayClick}>
      <PopupContent>
        <HeadContent>
          <Title>조회조건 선택</Title>
          <Close onClick={handleClose}>
            <CloseImg src={closeButton} alt="닫기" />
          </Close>
        </HeadContent>

        {/* 조회기간 */}
        <Title>조회기간</Title>
        <ButtonGroup>
          <SortButton 
            selected={selectedPeriod === '1개월'} 
            onClick={() => handlePeriodClick('1개월')}>
            1개월
          </SortButton>
          <SortButton 
            selected={selectedPeriod === '3개월'} 
            onClick={() => handlePeriodClick('3개월')}>
            3개월
          </SortButton>
          <SortButton 
            selected={selectedPeriod === '6개월'} 
            onClick={() => handlePeriodClick('6개월')}>
            6개월
          </SortButton>
          <SortButton 
            selected={selectedPeriod === '1년'} 
            onClick={() => handlePeriodClick('1년')}>
            1년
          </SortButton>
        </ButtonGroup>

        {/* 거래구분 */}
        <Title>거래구분</Title>
        <ButtonGroup>
          <SortButton 
            selected={selectedType === '전체'} 
            onClick={() => handleTypeClick('전체')}>
            전체
          </SortButton>
          <SortButton 
            selected={selectedType === '입금'} 
            onClick={() => handleTypeClick('입금')}>
            입금
          </SortButton>
          <SortButton 
            selected={selectedType === '출금'} 
            onClick={() => handleTypeClick('출금')}>
            출금
          </SortButton>
        </ButtonGroup>

        <SelectButton onClick={handleSelectClick}>조회</SelectButton>
      </PopupContent>
    </PopupOverlay>
  );
};

export default SortTransaction;
