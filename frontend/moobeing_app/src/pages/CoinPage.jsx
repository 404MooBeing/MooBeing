import { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import CoinInfo from "../components/Coin/CoinInfo";
import CoinList from "../components/Coin/CoinList";
import { getCoinHistory } from "../apis/CoinApi";

const Screen = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* 전체 화면을 차지 */
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow-y: auto; /* 내부 콘텐츠만 스크롤 가능 */
  box-sizing: border-box;
  padding-bottom: 150px; /* Footer 공간 확보 */
`;

const CoinPage = () => {
  // 조회 조건 관리
  const [sortCriteria, setSortCriteria] = useState({ period: "1개월", type: "전체" });
  const [coinList, setCoinList] = useState([]);
  
  const [page, setPage] = useState(1); // 페이지 상태 추가
  const [hasMore, setHasMore] = useState(true); // 더 많은 데이터가 있는지 여부
  const observer = useRef();

  // 정렬 기준 변경 함수
  const handleSortSelect = (selectedSort) => {
    setSortCriteria(selectedSort); // 정렬 기준 업데이트
    setPage(1); // 새로운 기준으로 첫 페이지부터 다시 로드
    setCoinList([]); // 코인 리스트 초기화
    setHasMore(true); // 새로운 데이터를 로드할 수 있도록 hasMore 상태 초기화
  };

  // 데이터를 가져오는 함수
  const fetchData = async (currentPage) => {
    try {
      const requestBody = {
        months: sortCriteria.period,
        transactionType: sortCriteria.type,
        page: currentPage,
      };
      const data = await getCoinHistory(requestBody);
      
      if (data.length > 0) {
        setCoinList((prevList) => [...prevList, ...data]); // 이전 데이터에 새 데이터 추가
      } else {
        setHasMore(false); // 데이터가 더 이상 없으면 hasMore 상태 false로 설정
      }
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
    }
  };

  // 페이지가 변경될 때마다 데이터를 가져오는 useEffect
  useEffect(() => {
    fetchData(page);
  }, [page, sortCriteria]);

  // 무한 스크롤 구현: 마지막 요소에 ref를 연결하여 IntersectionObserver 사용
  const lastCoinElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1); // 페이지를 증가시켜 데이터 추가 요청
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  return (
    <Screen>
      <Container>
        <CoinInfo
          onSortSelect={handleSortSelect}
          sortCriteria={sortCriteria}
        />
        <CoinList 
          sortCriteria={sortCriteria} 
          coinList={coinList}
          lastCoinElementRef={lastCoinElementRef} // 마지막 요소에 ref를 전달
        />
      </Container>
    </Screen>
  );
};

export default CoinPage;
