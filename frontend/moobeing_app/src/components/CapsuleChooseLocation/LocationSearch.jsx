import React, { useState } from "react";
import styled from "styled-components";

const SearchContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const FormContainer = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const SearchInput = styled.input`
  width: 230px;
  padding: 10px;
  font-size: 16px;
  margin: 10px;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
`;

const ResultsList = styled.ul`
  list-style-type: none;
  padding: 0;
  max-height: 200px;
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
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="주소 검색"
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
