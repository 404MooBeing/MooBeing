import React, { useState } from "react";
import styled from "styled-components";

const SearchContainer = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center; /* 수평 중앙 정렬 */
`;

const FormContainer = styled.form`
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 0px;

  /* gap: 4px; */
`;

const SearchInput = styled.input`
  width: 260px;
  padding: 10px;
  font-size: 16px;
  margin: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline: none;

  &:focus {
    outline: 1px solid #4caf50;
    border: 1px solid #4caf50;
  }
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
`;

const ResultsList = styled.ul`
  list-style-type: none;
  padding: 3px 20px;
  max-height: 200px;
  /* margin: 10px; */
  overflow-y: auto;
`;

const ResultItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

function LocationSearch({ onSearch, places, onSelectPlace }) {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(keyword);
  };

  const handleSelectPlace = (place) => {
    onSelectPlace(place);
  };

  return (
    <SearchContainer>
      <FormContainer onSubmit={handleSubmit}>
        <SearchInput
          type="search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="주소 검색"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // 기본 Enter 동작을 막음
              onSearch(keyword); // 검색 함수 호출
            }
          }}
        />
        <SearchButton type="submit">검색</SearchButton>
      </FormContainer>

      {places.length > 0 && (
        <ResultsList>
          {places.map((place) => (
            <ResultItem key={place.id} onClick={() => handleSelectPlace(place)}>
              {place.place_name} ({place.address_name})
            </ResultItem>
          ))}
        </ResultsList>
      )}
    </SearchContainer>
  );
}

export default LocationSearch;
