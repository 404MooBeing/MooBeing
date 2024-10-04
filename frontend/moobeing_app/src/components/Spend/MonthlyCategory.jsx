import PropTypes from "prop-types";
import styled from "styled-components";
import foodIcon from "../../assets/SpendIcons/foodIcon.png";
import healthIcon from "../../assets/SpendIcons/healthIcon.png";
import leisureIcon from "../../assets/SpendIcons/leisureIcon.png";
import loanIcon from "../../assets/SpendIcons/loanIcon.png";
import pleasureIcon from "../../assets/SpendIcons/pleasureIcon.png";
import trafficIcon from "../../assets/SpendIcons/trafficIcon.png";
import basicRad from "../../assets/radishes/basicRad.svg";
import useSpendStore from "../../store/SpendStore";

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
  width: 90%;
  margin-top: 2cqb;
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

const NoPaymentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 25%;
`;

const NoPaymentsImage = styled.img`
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
`;

const NoPaymentsText = styled.p`
  font-size: 14px;
  color: #999;
`;

const MonthlyCategory = () => {
  const data = useSpendStore((state) => state.pieChartData.getCategoryList || []);

  if (data.length === 0) {
    return (
      <NoPaymentsContainer>
        <NoPaymentsImage src={basicRad} alt="No payments" />
        <NoPaymentsText>소비 내역이 없습니다.</NoPaymentsText>
      </NoPaymentsContainer>
    );
  }

  return (
    <Category>
      {data.map((item, index) => {
        const iconSrc = iconMapping[item.label] || basicRad;
        const label = item.label || "기타";
        const percent = item.percent || 0;
        const amount = item.amount || 0;

        return (
          <CategoryItem key={item.id || index}>
            <ItemInfo>
              {iconSrc ? (
                <Icon src={iconSrc} alt={`${label} icon`} />
              ) : (
                <Icon src={basicRad} alt="Default icon" />
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
