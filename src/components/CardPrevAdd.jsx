import styled from 'styled-components'

const CardPrevAdd = () => {
  return (
    <Container $color={'gray'}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
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
  justify-content: center;
  align-items: center;
  background: ${(props) => props.$color};
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.4);
  color: white;
`

export default CardPrevAdd
