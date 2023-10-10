import React from 'react'
import styled, { css } from 'styled-components'

const StyledButton = ({ children, onClickHandler }) => {
  return <Button onClick={onClickHandler}>{children}</Button>
}

const Button = styled.button`
  border-radius: 5px;
  height: 50px;
  width: 110px;
  margin: 0 10px;
  cursor: pointer;
  p {
    margin: 0 auto;
    font-weight: bold;
  }
  color: var(--main-color);
  border: 2px solid var(--main-color);
  background-color: white;
`
export default StyledButton
