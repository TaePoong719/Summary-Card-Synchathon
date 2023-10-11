import React from 'react'
import styled from 'styled-components'

const StyledButton = ({ children, onClickHandler }) => {
  return <Button children={children} onClick={onClickHandler} />
}

const Button = styled.button`
  border-radius: 5px;
  height: 50px;
  width: 110px;
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
