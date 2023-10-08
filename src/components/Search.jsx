import React from 'react'
import styled from 'styled-components'

const Search = () => {
  const handleInput = () => {
    /* 검색 로직 => 화면에 보이는 요소들을 변경*/
  }
  return (
    <span>
      <InputSearch type="text" />
      <span>
        <span>|</span>
        <SearchImg src={`${import.meta.env.BASE_URL}search_icon.svg`} alt="돋보기"></SearchImg>
      </span>
    </span>
  )
}

const InputSearch = styled.input`
  height: 30px;
`

const SearchImg = styled.img`
  display: inline;
  width: 30px;
  height: 30px;
  position: relative;
  background-color: black;
  border-radius: 50%;
  padding: 10px;

  &:after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
  }
`
export default Search
