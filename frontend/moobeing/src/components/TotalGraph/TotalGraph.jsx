import { useState, useEffect } from "react";
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

const GraphContainer = styled.div`
  background-color: #f5fded;
  height: 550px;
  width: 90%;
  margin-bottom: 5%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 25px 10px 10px 10px;
  box-sizing: border-box;
  border-radius: 5%;
  position: relative;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 5px 10px;
  cursor: pointer;
  background-color: #e0eed2;
  border: none;
  border-radius: 10px;
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
  width: 50px;
  height: 30px;
  background-color: ${(props) => (props.active ? "#c1e1c1" : "#E0EED2")};
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ToggleCircle = styled.div`
  position: absolute;
  top: 3px;
  left: ${(props) => (props.active ? "calc(100% - 27px)" : "3px")};
  width: 24px;
  height: 24px;
  background-color: #348833;
  border-radius: 50%;
  transition: left 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 10px;
  font-weight: 700;
`;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const formatToKoreanWon = (value) => {
      if (value >= 100000000) {
        return `${Math.floor(value / 100000000)}억`;
      } else if (value >= 10000) {
        return `${Math.floor(value / 10000)}만`;
      } else {
        return `${value}`;
      }
    };

    return (
      <div
        style={{
          backgroundColor: "white",
          padding: "5px",
          border: "1px solid #ccc",
        }}
      >
        <p>{`${label}월`}</p>
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

function TotalGraph({ data, peerData }) {
  const [visibleRange, setVisibleRange] = useState([0, 4]);
  const [yAxisDomain, setYAxisDomain] = useState([0, 0]);
  const [showPeerData, setShowPeerData] = useState(false);

  useEffect(() => {
    updateYAxisDomain();
  }, [data, peerData, visibleRange, showPeerData]);

  const updateYAxisDomain = () => {
    if (data && data.items && data.items.length > visibleRange[0]) {
      const visibleData = data.items.slice(visibleRange[0], visibleRange[1]);
      let maxAmount = Math.max(
        ...visibleData.map((item) => item.replayment_amount)
      );
      let minAmount = Math.min(
        ...visibleData.map((item) => item.replayment_amount)
      );

      if (showPeerData && peerData && peerData.items) {
        const visiblePeerData = peerData.items.slice(
          visibleRange[0],
          visibleRange[1]
        );
        maxAmount = Math.max(
          maxAmount,
          ...visiblePeerData.map((item) => item.replayment_amount)
        );
        minAmount = Math.min(
          minAmount,
          ...visiblePeerData.map((item) => item.replayment_amount)
        );
      }

      const difference = maxAmount - minAmount;
      const paddedMin = Math.max(0, minAmount - difference * 0.1);
      const paddedMax = maxAmount + difference * 0.1;

      setYAxisDomain([paddedMin, paddedMax]);
    }
  };

  const handleScroll = (direction) => {
    setVisibleRange((prevRange) => {
      const newStart = Math.max(0, prevRange[0] + direction * 3);
      const newEnd = Math.min(data.items.length, newStart + 4);
      return [newStart, newEnd];
    });
  };

  const formatToKoreanWon = (value) => {
    if (value >= 100000000) {
      return `${Math.floor(value / 100000000)}억`;
    } else if (value >= 10000) {
      return `${Math.floor(value / 10000)}만`;
    } else {
      return `${value}`;
    }
  };

  if (!data || !data.items || data.items.length === 0) {
    return (
      <GraphContainer>
        <h1>데이터가 없습니다.</h1>
      </GraphContainer>
    );
  }

  const visibleData = data.items.slice(visibleRange[0], visibleRange[1]);
  const visiblePeerData =
    peerData && peerData.items
      ? peerData.items.slice(visibleRange[0], visibleRange[1])
      : [];

  return (
    <GraphContainer>
      <ToggleWrapper onClick={() => setShowPeerData(!showPeerData)}>
        <ToggleButton active={showPeerData}>
          <ToggleCircle active={showPeerData}>
            {showPeerData ? "끄기" : "또래"}
          </ToggleCircle>
        </ToggleButton>
      </ToggleWrapper>
      <h1>전체여정</h1>
      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={visibleData}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              type="number"
              domain={["dataMin", "dataMax"]}
              ticks={visibleData.map((d) => d.month)}
            />
            <YAxis
              domain={yAxisDomain}
              tickFormatter={formatToKoreanWon}
              width={60}
              tick={{ fontSize: 10 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="replayment_amount"
              name="내 상환액"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
              isAnimationActive={true}
              animationBegin={0}
              animationDuration={500}
              animationEasing="ease-in-out"
            />
            {showPeerData && (
              <Line
                type="monotone"
                data={visiblePeerData}
                dataKey="replayment_amount"
                name="또래 평균 상환액"
                stroke="#82ca9d"
                strokeWidth={2}
                dot={{ r: 5 }}
                activeDot={{ r: 8 }}
                isAnimationActive={true}
                animationBegin={0}
                animationDuration={500}
                animationEasing="ease-in-out"
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
          &lt; 이전
        </Button>
        <Button
          onClick={() => handleScroll(1)}
          disabled={visibleRange[1] >= data.items.length}
        >
          다음 &gt;
        </Button>
      </ButtonContainer>
    </GraphContainer>
  );
}

export default TotalGraph;
