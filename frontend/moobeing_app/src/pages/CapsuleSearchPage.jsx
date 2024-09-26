import React, { useState, useEffect } from "react";

const AddressSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkNaverMapsLoaded = setInterval(() => {
      if (window.naver && window.naver.maps) {
        setIsLoaded(true);
        clearInterval(checkNaverMapsLoaded);
      }
    }, 500);

    return () => clearInterval(checkNaverMapsLoaded);
  }, []);

  const handleSearch = () => {
    if (!isLoaded) {
      alert(
        "Naver Maps API가 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요."
      );
      return;
    }

    if (window.naver && window.naver.maps && window.naver.maps.Service) {
      new window.naver.maps.Service.geocode(
        {
          query: query,
        },
        function (status, response) {
          if (status === window.naver.maps.Service.Status.ERROR) {
            alert("검색 중 오류가 발생했습니다!");
            return;
          }

          if (response.v2.meta.totalCount > 0) {
            setResults(response.v2.addresses);
          } else {
            alert("검색 결과가 없습니다.");
          }
        }
      );
    } else {
      alert("Naver Maps API가 로드되지 않았습니다.");
    }
  };

  return (
    <div>
      <h2>주소 검색</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="주소를 입력하세요"
      />
      <button onClick={handleSearch} disabled={!isLoaded}>
        검색
      </button>

      <div>
        <h3>검색 결과:</h3>
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              <p>도로명 주소: {result.roadAddress}</p>
              <p>지번 주소: {result.jibunAddress}</p>
              <p>영문 주소: {result.englishAddress}</p>
              <p>x 좌표: {result.x}</p>
              <p>y 좌표: {result.y}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddressSearch;
