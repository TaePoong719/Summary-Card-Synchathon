import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import '../style/CardPrev.css'

const CardPrevAdd = () => {
  return (
    <Container $color={'gray'}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          padding: '0 15px',
          boxSizing: 'border-box',
        }}
      >
        카드 추가하기
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
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.$color};
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.4);
  color: white;
`

export default CardPrevAdd
