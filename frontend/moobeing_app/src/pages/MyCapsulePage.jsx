import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import CapsuleCard from "../components/MyCapsule/CapsuleCard";
import DateSortPopUp from "../components/MyCapsule/DateSortPopUp";
import LeftButton from "../assets/button/leftButtonBlack.svg";
import RightButton from "../assets/button/rightButtonBlack.svg";
import { getCapsulesByYearMonth, getAllCapsules } from "../apis/MyCapsuleApi";
import { useLocation } from "react-router-dom";

const Screen = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  background-color: #f0f8f0;
`;

const ContentWrapper = styled.div`
  padding: 20px;
  margin-bottom: 150px; /* 아래에 150px 공간 추가 */
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
`;

const TitleText = styled.span`
  display: flex;
  align-items: center;

  & > img {
    margin: 0 22px;
    user-select: none;
    cursor: pointer;
    width: 20px;
    height: 20px;
  }

  & > span {
    font-size: 25px;
    margin: 0 22px;
    user-select: none;
    cursor: pointer;

    // 가로 가이즈가 350px 보다 작으면 글자 크기 2px 줄이기
    @media (max-width: 350px) {
      font-size: 23px; // 2px 줄임
    }
  }
`;

const DateLabelContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 15px;
`;

const DateLabel = styled.div`
  background-color: #d0d0d0;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
  display: inline-block;
`;

const BlurOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(128, 128, 128, 0.2);
  backdrop-filter: blur(1px);
  z-index: 10;
`;

const MyCapsulePage = () => {
  const [isDateSortOpen, setIsDateSortOpen] = useState(false);
  const params = new URLSearchParams(window.location.search);
  const dateParam = params.get("date");
  const initialYear = dateParam ? parseInt(dateParam.split("-")[0], 10) : new Date().getFullYear();
  const initialMonth = dateParam ? parseInt(dateParam.split("-")[1], 10) : new Date().getMonth() + 1;

  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [isAllView, setIsAllView] = useState(!dateParam); // dateParam이 없으면 전체 조회로 설정

  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const loadingRef = useRef(false);
  const containerRef = useRef(null);
  const location = useLocation();

  const fetchCapsules = useCallback(
    async (resetPage = false) => {
      if (loadingRef.current || (!hasMore && !resetPage)) return;
      loadingRef.current = true;
      setLoading(true);
      setError(null);
      try {
        const currentPage = resetPage ? 1 : page;
        let data;
        if (isAllView) {
          data = await getAllCapsules(currentPage);
        } else {
          data = await getCapsulesByYearMonth(
            selectedYear,
            selectedMonth,
            currentPage
          );
        }
        if (data.length === 0) {
          setHasMore(false);
          setIsAtBottom(true);
        } else {
          setCapsules((prevCapsules) => {
            const newCapsules = resetPage ? data : [...prevCapsules, ...data];
            // 스크롤 위치 유지를 위해 setTimeout 사용
            setTimeout(() => {
              if (containerRef.current) {
                containerRef.current.scrollTop = isAtBottom
                  ? containerRef.current.scrollHeight
                  : scrollPosition;
              }
            }, 0);
            return newCapsules;
          });
          setPage((prevPage) => (resetPage ? 2 : prevPage + 1));
        }
      } catch (err) {
        setError("캡슐을 불러오는 데 실패했습니다.");
        console.error("Error fetching capsules:", err);
      } finally {
        setLoading(false);
        loadingRef.current = false;
      }
    },
    [
      isAllView,
      selectedYear,
      selectedMonth,
      page,
      hasMore,
      scrollPosition,
      isAtBottom,
    ]
  );

  useEffect(() => {
    setHasMore(true);
    fetchCapsules(true);
  }, [selectedYear, selectedMonth, isAllView]);

  const handleScroll = useCallback(() => {
    if (!containerRef.current || loadingRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    setScrollPosition(scrollTop);
    setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 20);
    if (isAtBottom) {
      fetchCapsules();
    }
  }, [fetchCapsules]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  // 수현쓰
  // 페이지 로드 시 쿼리 파라미터에서 date 값을 가져와 해당 날짜로 이동
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dateParam = params.get("date");

    if (dateParam) {
      const [year, month] = dateParam.split("-");
      setSelectedYear(parseInt(year, 10));
      setSelectedMonth(parseInt(month, 10));
      setIsAllView(false);
      handleMonthSelect(year, month);
    } else {
      setSelectedYear(new Date().getFullYear());
      setSelectedMonth(new Date().getMonth() + 1);
    }

    setHasMore(true);
    fetchCapsules(true);
  }, []);

  ///

  const toggleDateSort = () => {
    setIsDateSortOpen(!isDateSortOpen);
  };

  const handleMonthSelect = (year, month) => {
    setSelectedYear(year);
    setSelectedMonth(month);
    setIsAllView(false);
    setIsDateSortOpen(false);
    setPage(1);
    setCapsules([]);
    setHasMore(true);
  };

  const handleSelectAllView = () => {
    setIsAllView(true);
    setIsDateSortOpen(false);
    setPage(1);
    setCapsules([]);
    setHasMore(true);
  };

  const changeMonth = (increment) => {
    if(isAllView) {
      handleMonthSelect(selectedYear, selectedMonth);
      return
    }

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    let newMonth = selectedMonth + increment;
    let newYear = selectedYear;

    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    } else if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    }

    // 현재 날짜보다 미래인 경우 변경하지 않음
    if (
      newYear > currentYear ||
      (newYear === currentYear && newMonth > currentMonth)
    ) {
      return;
    }

    handleMonthSelect(newYear, newMonth);
  };

  const getTitleText = () => {
    if (isAllView) {
      return "전체조회";
    }
    return `${selectedYear}년 ${selectedMonth}월`;
  };

  return (
    <Screen>
      <Container ref={containerRef}>
        <ContentWrapper>
          <Title>
            <TitleText>
              <img
                src={LeftButton}
                alt="이전 달"
                onClick={() => changeMonth(-1)}
              />
              <span onClick={toggleDateSort}>{getTitleText()}</span>
              <img
                src={RightButton}
                alt="다음 달"
                onClick={() => changeMonth(1)}
              />
            </TitleText>
          </Title>

          {loading && <p>로딩 중...</p>}
          {error && <p>{error}</p>}
          {!loading &&
            !error &&
            capsules.map((item) => (
              <React.Fragment key={item.id}>
                <DateLabelContainer>
                  <DateLabel>{item.date}</DateLabel>
                </DateLabelContainer>
                <CapsuleCard
                  title={item.title}
                  amount={String(item.amount).slice(1)}
                  imageUrl={item.imageUrl}
                  iconUrl={item.iconUrl}
                  content={item.content}
                />
              </React.Fragment>
            ))}
          {!hasMore && <p>더 이상 캡슐이 없습니다.</p>}
        </ContentWrapper>

        {isDateSortOpen && (
          <>
            <BlurOverlay />
            <DateSortPopUp
              onClose={toggleDateSort}
              onSelectMonth={handleMonthSelect}
              initialYear={selectedYear}
              onSelectAllView={handleSelectAllView}
            />
          </>
        )}
      </Container>
    </Screen>
  );
};

export default MyCapsulePage;
