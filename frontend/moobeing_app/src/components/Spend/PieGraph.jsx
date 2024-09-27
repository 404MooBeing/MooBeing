import React from "react";
import { ResponsivePie } from "@nivo/pie";
import PropTypes from "prop-types";
  
const PieGraph = ({ data, width = "100%", height = 300 }) => {
  // 전체 합계 계산
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div style={{ width: width, height: height }}>
      <ResponsivePie
        data={data}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        startAngle={-107}
        innerRadius={0.3}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "pastel1" }}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={360}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        arcLabel={(d) => `${((d.value / total) * 100).toFixed(1)}%`}
        tooltip={({ datum }) => (
          <div
            style={{
              background: "white",
              padding: "9px 12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: datum.color,
                marginRight: "8px",
              }}
            />
            <span>
              <strong>{datum.label}</strong>:{" "}
              {((datum.value / total) * 100).toFixed(1)}%
            </span>
          </div>
        )}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

PieGraph.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      color: PropTypes.string,
    })
  ).isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default PieGraph;