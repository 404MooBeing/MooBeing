import PropTypes from "prop-types";
import styled from "styled-components";
import foodIcon from "../../assets/SpendIcons/foodIcon.png";
import healthIcon from "../../assets/SpendIcons/healthIcon.png";
import leisureIcon from "../../assets/SpendIcons/leisureIcon.png";
import loanIcon from "../../assets/SpendIcons/loanIcon.png";
import pleasureIcon from "../../assets/SpendIcons/pleasureIcon.png";
import trafficIcon from "../../assets/SpendIcons/trafficIcon.png";

const iconMapping = {
  식비: foodIcon,
  건강: healthIcon,
  문화: leisureIcon,
  대출: loanIcon,
  유흥: pleasureIcon,
  교통: trafficIcon,
};

const Category = styled.div`
  background-color: #f5fded;
  width: 100%;
  margin-top: 3vh;
  margin-bottom: 3vh;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px; 
`;

const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
  font-size: 14px;
`;

const ItemInfo = styled.span`
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  margin-bottom: 5px;
  border-radius: 10px;
`;

const LabelAccent = styled.span`
  font-weight: 700;
  margin-right: 8px;
`;

const MonthlyCategory = ({ data = [] }) => {
  return (
    <Category>
      {data.map((item, index) => {
        const iconSrc = iconMapping[item.label] || ""; // Fallback to empty string if icon not found
        const label = item.label || "기타"; // Default label to "기타" if undefined
        const percent = item.percent || 0; // Default percent to 0 if undefined
        const amount = item.amount || 0; // Default amount to 0 if undefined

        return (
          <CategoryItem key={item.id || index}>
            <ItemInfo>
              {iconSrc ? (
                <Icon src={iconSrc} alt={`${label} icon`} />
              ) : (
                <Icon src={foodIcon} alt="Default icon" /> // Show a default icon if not found
              )}
              <LabelAccent>{label}</LabelAccent> {percent.toFixed(2)}%
            </ItemInfo>
            <span>{amount.toLocaleString()}원</span>
          </CategoryItem>
        );
      })}
    </Category>
  );
};

MonthlyCategory.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string.isRequired,
      percent: PropTypes.number.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default MonthlyCategory;
