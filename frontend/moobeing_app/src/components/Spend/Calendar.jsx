import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko");

const theme = createTheme({
  palette: {
    primary: { main: "#348833" },
    secondary: { main: "#FF4C4C" },
  },
});

const CalendarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  .MuiDateCalendar-root {
    width: 95%;
    max-width: 100%;
    height: auto;
    min-height: 450px;
  }
  .MuiDayCalendar-header {
    margin-top: 8px;
    margin-bottom: 8px;
  }
  .MuiDayCalendar-monthContainer {
    margin-top: 8px;
    margin-bottom: 10px;
  }
  .MuiPickersCalendarHeader-root {
    margin-top: 8px;
    margin-bottom: 8px;
    padding-left: 15px;
    padding-right: 0px;
  }
  .MuiDayCalendar-weekContainer {
    justify-content: space-around;
    margin-bottom: 15px;
  }
  .MuiDayCalendar-weekDayLabel {
    font-size: 16px;
    font-weight: 600;
    margin: 0px 10px;
  }
  .MuiPickersDay-root {
    font-size: 15px;
  }

  .MuiPickersSlideTransition-root.MuiDayCalendar-slideTransition {
    min-height: 320px;
    overflow: visible !important;
  }

  @media (min-width: 600px) {
    .MuiDateCalendar-root {
      min-height: 560px;
      height: auto;
    }
    .MuiDayCalendar-header {
      margin-top: 16px;
      margin-bottom: 16px;
    }
    .MuiDayCalendar-monthContainer {
      margin-top: 16px;
    }
    .MuiPickersCalendarHeader-root {
      margin-top: 16px;
      margin-bottom: 16px;
    }
    .MuiDayCalendar-weekContainer {
      margin-bottom: 25px;
      margin-left: 8px;
      padding-right: 8px;
    }
    .MuiDayCalendar-weekDayLabel {
      font-size: 16px;
      font-weight: 600;
      margin: 0px 29px;
    }
    .MuiPickersSlideTransition-root.MuiDayCalendar-slideTransition {
      min-height: 420px;
    }
  }
`;

const CustomPickersDay = styled(PickersDay)`
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  height: auto;
  font-size: 0.8rem;

  &.has-loan {
    background-color: #e0eed2;
  }

  .spend-amount {
    font-size: 0.5em;
    color: #ff4c4c;
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
  }

  @media (min-width: 600px) {
    font-size: 1.2rem;
    .spend-amount {
      font-size: 0.8em;
      bottom: -25px;
    }
  }
`;

function CustomDay(props) {
  const { day, monthlySpendData = [], ...other } = props;
  const spendingData = monthlySpendData.find((spend) =>
    dayjs(spend.date).isSame(day, "day")
  );

  const hasLoan =
    spendingData?.history?.some((item) => item.categoryName === "대출") ||
    false;

  return (
    <CustomPickersDay
      {...other}
      day={day}
      className={hasLoan ? "has-loan" : ""}
    >
      <span>{day.date()}</span>
      {spendingData?.totalSpend && (
        <span className="spend-amount">
          -{spendingData.totalSpend.toLocaleString()}
        </span>
      )}
    </CustomPickersDay>
  );
}

const CustomDateCalendar = ({
  selectedDate,
  onDateChange,
  monthlySpendData,
}) => {
  const handleMonthChange = (newDate) => {
    // 월이 변경될 때 호출되는 함수
    const updatedDate = selectedDate
      .set("year", newDate.year())
      .set("month", newDate.month());
    onDateChange(updatedDate);
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CalendarContainer>
          <DateCalendar
            value={selectedDate}
            onChange={(newDate) => onDateChange(newDate)}
            onMonthChange={handleMonthChange}
            slots={{ day: CustomDay }}
            slotProps={{
              day: { monthlySpendData },
            }}
          />
        </CalendarContainer>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

CustomDateCalendar.propTypes = {
  selectedDate: PropTypes.object.isRequired,
  onDateChange: PropTypes.func.isRequired,
  monthlySpendData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      totalSpend: PropTypes.number.isRequired,
      history: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          categoryName: PropTypes.string.isRequired,
          price: PropTypes.number.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default CustomDateCalendar;