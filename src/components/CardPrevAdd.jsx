import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'

const CardPrevAdd = () => {
  return (
    <Container $color={'#B0B0B0'}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          flexDirection: 'column',
          padding: '0 15px',
          boxSizing: 'border-box',
        }}
      >
        <img src={`${import.meta.env.BASE_URL}icon_plus.svg`}></img>
        <h1>카드 추가하기</h1>
      </div>
    </Container>
  )
}

const Container = styled.div`
  height: 300px;
  width: 230px;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.$color};
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.4);
  color: white;
  text-align: center;
  img {
    width: 130px;
    height: 130px;
  }

  h1 {
    width: 100%;
    padding: 0 5px;
    overflow: hidden;
    font-size: 1.5rem;
  }
`

export default CardPrevAdd
