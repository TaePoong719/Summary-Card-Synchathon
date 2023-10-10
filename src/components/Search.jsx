import React from 'react'
import styled from 'styled-components'

const Search = () => {
  const handleInput = () => {
    /* 검색 로직 => 화면에 보이는 요소들을 변경*/
  }
  return (
    <SearchBar>
      <input type="text" placeholder="찾고 싶은 카드를 검색하세요" />
    </SearchBar>
  )
}

const SearchBar = styled.div`
  & {
    height: 40px;
    position: relative;
    width: 100%;
    max-width: 400px;
    border-radius: 5px;
    input {
      width: 100%;
      height: 100%;
      border: 2px solid rgb(82, 137, 255);
      border-radius: 4px;
      padding: 0 40px 0 10px;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56.966 56.966' fill='rgb(82, 137, 255)'%3e%3cpath d='M55.146 51.887L41.588 37.786A22.926 22.926 0 0046.984 23c0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837a3.004 3.004 0 00.083-4.242zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z'/%3e%3c/svg%3e");
      background-size: 14px;
      background-repeat: no-repeat;
      background-position: right 10px bottom 50%;
      &::placeholder {
        color: rgba(82, 137, 255, 0.5);
      }
      &:focus {
        outline: none;
      }
    }
  }
`

export default Search
