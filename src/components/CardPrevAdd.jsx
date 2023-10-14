import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

const CardPrevAdd = () => {
  const location = useLocation()
  const cardId = uuidv4()
  return (
    <Link
      to={`/card/${cardId}`}
      state={{
        background: location,
        CardAdd: true,
        card: {
          cardId: cardId,
          name: '',
          category: '보험',
          date: '',
          company: '',
          pdfLink: 'https://naver.com',
          summary: ``,
          cardColor: '#DF6962',
        },
      }}
    >
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
    </Link>
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
