import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import leftButton from "../../assets/button/leftButtonWhite.svg";
import rightButton from "../../assets/button/rightButtonWhite.svg";
import DropDownArrow from "../../assets/dropdown/DropdownArrow.png";

const GraphContainer = styled.div`
  background-color: #f5fded;
  height: 565px;
  width: 90%;
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 10px 10px 10px;
  box-sizing: border-box;
  border-radius: 5%;
  position: relative;
`;

const ChartContainer = styled.div`
  width: 87%;
  height: 390px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const TitleOfChart = styled.div`
  font-size: 28px;
  margin-top: 3vh;
  margin-bottom: 1vh;

  @media (min-width: 600px) {
    font-size: 33px;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 5px;
  right: 0;
  transform: translateY(-50%);
  width: 97%;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
`;

const Button = styled.button`
  padding: 5px;
  cursor: pointer;
  background-color: #e0eed2;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  transition: background-color 0.3s;

  &:hover {
    background-color: #348833;
  }

  img {
    width: 18px;
    height: 18px;
  }
`;

const ToggleWrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: center;
`;

const ToggleButton = styled.div`
  position: relative;
  width: 60px;
  height: 35px;
  background-color: ${(props) => (props.active ? "#c1e1c1" : "#E0EED2")};
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ToggleCircle = styled.div`
  position: absolute;
  top: 3px;
  left: ${(props) => (props.active ? "calc(100% - 33px)" : "3px")};
  width: 30px;
  height: 30px;
  background-color: #348833;
  border-radius: 50%;
  transition: left 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 9px;
  font-weight: 700;
`;

const DataCollectContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const DataCollectButton = styled.button`
  margin: 0;
  font-size: 14px;
  width: 95px;
  padding: 9px 10px;
  cursor: pointer;
  border: none;
  background-color: ${(props) => (props.isYearly ? "#348833" : "#e0eed2")};
  color: ${(props) => (props.isYearly ? "#ffffff" : "#24272D")};
  border-radius: 10px;

  @media (min-width: 600px) {
    font-size: 14px;
    padding: 8px;
  }
`;

const CustomDropdownContainer = styled.div`
  position: relative;
  width: 100px;
  max-width: 300px;
  display: inline-block;
  margin: 10px 0;
`;

const CustomDropdownHeader = styled.div`
  padding: 6px 12px;
  font-size: 15px;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: url(${DropDownArrow});
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 10px 8px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  background-color: #e0eed2;
  border-radius: 10px;

  &:focus {
    border-bottom: 2px solid #4caf50;
  }
`;

const CustomDropdownList = styled.ul`
  position: absolute;
  width: 100%;
  max-height: 150px;
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const CustomDropdownItem = styled.li`
  padding: 8px;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    background-color: #c5e1ab;
  }

  ${(props) =>
    props.selected &&
    `
    background-color: #C5E1AB;
  `}
`;

const CustomDropdown = ({ options, selectedOption, onChange, visibleData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  const currentVisibleYear =
    visibleData.length > 0 ? visibleData[0].year : selectedOption;

  return (
    <CustomDropdownContainer>
      <CustomDropdownHeader onClick={() => setIsOpen(!isOpen)}>
        {currentVisibleYear ? `${currentVisibleYear}년` : "연도 선택"}
      </CustomDropdownHeader>
      {isOpen && (
        <CustomDropdownList>
          {options.map((option) => (
            <CustomDropdownItem
              key={option}
              onClick={() => handleOptionClick(option)}
              selected={option === selectedOption}
            >
              {option}년
            </CustomDropdownItem>
          ))}
        </CustomDropdownList>
      )}
    </CustomDropdownContainer>
  );
};

const CustomTooltip = ({ active, payload, label, isYearly }) => {
  if (active && payload && payload.length) {
    const formatToKoreanWon = (value) => {
      if (value >= 100000000) {
        return `${(value / 100000000).toFixed(2)}억`;
      } else if (value >= 10000) {
        return `${(value / 10000).toFixed(2)}만`;
      } else if (value >= 1000) {
        return `${(value / 1000).toFixed(2)}천`;
      } else {
        return `${value}`;
      }
    };

    return (
      <div
        style={{
          backgroundColor: "white",
          padding: "3px 10px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <p>{isYearly ? `${label}년` : `${label}월`}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.name}: ${formatToKoreanWon(entry.value)}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const LoanJourneyGraph = ({
  data = [],
  peerData = [],
  yearData = [],
  yearPeerData = [],
  mode = "total",
  productName = ""
}) => {
  const [visibleRange, setVisibleRange] = useState([0, 4]);
  const [yAxisDomain, setYAxisDomain] = useState([0, 0]);
  const [showPeerData, setShowPeerData] = useState(false);
  const [currentYear, setCurrentYear] = useState(null);
  const [isYearly, setIsYearly] = useState(false);

  const availableYears = [...new Set(data.map((item) => item.year))];

  useEffect(() => {
    if (data.length > 0) {
      const lastYear = availableYears[availableYears.length - 1];
      setCurrentYear(lastYear);

      const lastYearIndex = data.findIndex((item) => item.year === lastYear);
      setVisibleRange([lastYearIndex, lastYearIndex + 4]);
    }
  }, [data]);

  useEffect(() => {
    updateYAxisDomain();
  }, [data, peerData, yearData, yearPeerData, visibleRange, showPeerData, isYearly]);

  const updateYAxisDomain = () => {
    const targetData = isYearly ? yearData : data;
    const visibleData = getVisibleData(targetData, visibleRange);
    let maxAmount = Math.max(
      ...visibleData.map((item) => item.loanBalance || 0)
    );
    let minAmount = Math.min(
      ...visibleData.map((item) => item.loanBalance || 0)
    );

    if (showPeerData) {
      const peerTargetData = isYearly ? yearPeerData : peerData;
      const visiblePeerData = getVisibleData(peerTargetData, visibleRange);
      maxAmount = Math.max(
        maxAmount,
        ...visiblePeerData.map((item) => item.loanBalance || 0)
      );
      minAmount = Math.min(
        minAmount,
        ...visiblePeerData.map((item) => item.loanBalance || 0)
      );
    }

    const difference = maxAmount - minAmount;
    const paddedMin = Math.max(0, minAmount - difference * 0.1);
    const paddedMax = maxAmount + difference * 0.1;

    if (paddedMin !== yAxisDomain[0] || paddedMax !== yAxisDomain[1]) {
      setYAxisDomain([paddedMin, paddedMax]);
    }
  };

  const handleScroll = (direction) => {
    setVisibleRange((prevRange) => {
      const maxLength = isYearly ? yearData.length : data.length;
      const newStart = Math.max(0, prevRange[0] + direction * 3);
      const newEnd = Math.min(maxLength, newStart + 4);

      if (newEnd >= maxLength) {
        return [maxLength - 4, maxLength];
      }

      return [newStart, newEnd];
    });
  };

  const handleYearChange = (selectedYear) => {
    setCurrentYear(selectedYear);
    const targetData = isYearly ? yearData : data;
    const newIndex = targetData.findIndex((item) => item.year === selectedYear);

    if (newIndex !== -1) {
      setVisibleRange([newIndex, newIndex + 4]);
    }
  };

  const getVisibleData = (data, range) => {
    const maxLength = data.length;
    if (range[1] > maxLength) {
      return [
        ...data.slice(range[0], maxLength),
        ...Array(range[1] - maxLength).fill({ loanBalance: null }),
      ];
    }
    return data.slice(range[0], range[1]);
  };

  const visibleData = getVisibleData(isYearly ? yearData : data, visibleRange);
  const visiblePeerData = getVisibleData(
    isYearly ? yearPeerData : peerData,
    visibleRange
  );

  const formatToKoreanWon = (value) => {
    if (value >= 100000000) {
      return `${(value / 100000000).toFixed(2)}억`;
    } else if (value >= 10000) {
      return `${(value / 10000).toFixed(2)}만`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(2)}천`;
    } else {
      return `${value}`;
    }
  };

  if (!data || data.length === 0) {
    return (
      <GraphContainer>
        <h1>데이터가 없습니다.</h1>
      </GraphContainer>
    );
  }

  return (
    <GraphContainer>
      <ToggleWrapper onClick={() => setShowPeerData(!showPeerData)}>
        <ToggleButton active={showPeerData}>
          <ToggleCircle active={showPeerData}>
            {showPeerData ? "끄기" : "또래"}
          </ToggleCircle>
        </ToggleButton>
      </ToggleWrapper>
      <TitleOfChart>
        {mode === "total" ? "전체 상환 여정" : `${productName} 상환 여정`}
      </TitleOfChart>
      <DataCollectContainer>
        <CustomDropdown
          options={availableYears}
          selectedOption={currentYear}
          onChange={handleYearChange}
          visibleData={visibleData}
        />
        <DataCollectButton
          isYearly={isYearly}
          onClick={() => {
            setIsYearly(!isYearly);
            setShowPeerData(false); // Reset peer data visibility when switching view
            setVisibleRange([0, 4]); // Reset to first data of the selected view
          }}
        >
          {isYearly ? "월별 보기" : "연도별 보기"}
        </DataCollectButton>
      </DataCollectContainer>
      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={visibleData}
            margin={{ top: 5, right: 12, left: -10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={isYearly ? "year" : "month"}
              tickFormatter={(value) =>
                isYearly ? `${value}년` : `${value}월`
              }
              tick={{ fontSize: 12 }}
            />
            <YAxis
              domain={yAxisDomain}
              tickFormatter={formatToKoreanWon}
              width={60}
              tick={{ fontSize: 10 }}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip isYearly={isYearly} />} />
            <Legend
              wrapperStyle={{ fontSize: 12, paddingTop: 20, paddingLeft: 50 }}
            />
            <Line
              type="monotone"
              dataKey="loanBalance"
              name={mode === "total" ? "내 잔액" : productName}
              stroke="#4caf50"
              strokeWidth={2}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
              isAnimationActive={true}
              animationBegin={0}
              animationDuration={500}
              animationEasing="ease-in-out"
              connectNulls={false}
            />
            {showPeerData && (
              <Line
                type="monotone"
                data={visiblePeerData}
                dataKey="loanBalance"
                name="또래 평균 잔액"
                stroke="#FF6D0C"
                strokeWidth={2}
                dot={{ r: 5 }}
                activeDot={{ r: 8 }}
                isAnimationActive={true}
                animationBegin={0}
                animationDuration={500}
                animationEasing="ease-in-out"
                connectNulls={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
      <ButtonContainer>
        <Button
          onClick={() => handleScroll(-1)}
          disabled={visibleRange[0] === 0}
        >
          <img src={leftButton} alt="이전" />
        </Button>
        <Button
          onClick={() => handleScroll(1)}
          disabled={
            visibleRange[1] >= (isYearly ? yearData.length : data.length)
          }
        >
          <img src={rightButton} alt="다음" />
        </Button>
      </ButtonContainer>
    </GraphContainer>
  );
};


export default LoanJourneyGraph;
