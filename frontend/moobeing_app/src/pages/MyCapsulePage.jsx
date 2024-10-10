import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import CapsuleCard from "../components/MyCapsule/CapsuleCard";
import DateSortPopUp from "../components/MyCapsule/DateSortPopUp";
import LeftButton from "../assets/button/leftButtonBlack.svg";
import RightButton from "../assets/button/rightButtonBlack.svg";
import { getCapsulesByYearMonth, getAllCapsules } from "../apis/MyCapsuleApi";
import { useLocation } from "react-router-dom";
import { SyncLoader } from "react-spinners";

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
    font-size: 22px;
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
  background-color: #dedcdc;
  opacity: 80%;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 5px;
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

const NoMoreCapsule = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: inset 0 -10px 0 #E0EED2;
  padding: 5px 10px;
  font-size: 15px;
  width: fit-content; /* 텍스트 길이에 맞춰 박스 너비 설정 */
  margin: 0 auto; /* 화면 중앙 정렬 */
`;

const LoaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8); // 로딩 중일 때 배경색 약간 투명하게
  z-index: 100; // 다른 요소들 위에 나타나도록 z-index 설정
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
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
  
    let newMonth = parseInt(selectedMonth, 10) + increment;
    let newYear = parseInt(selectedYear, 10);
  
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

          {loading && <LoaderWrapper><SyncLoader color={"#348833"} size={10} /></LoaderWrapper>}
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
            {!loading && !error && capsules.length === 0 && (
              <NoMoreCapsule>캡슐이 없습니다!</NoMoreCapsule> // 캡슐이 아예 없는 경우
            )}

            {!loading && !error && capsules.length > 0 && !hasMore && (
              <NoMoreCapsule>마지막 캡슐입니다!</NoMoreCapsule> // 캡슐이 있지만 마지막 페이지인 경우
            )}
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
