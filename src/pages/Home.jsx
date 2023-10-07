import styled from 'styled-components'
import CardPrev from '../components/CardPrev'
import '../style/Home.css'
import { Link, useLocation } from 'react-router-dom'

const Home = ({ userCards, setUserCards }) => {
  const location = useLocation()

  return (
    <div>
      <CardContainer>
        {userCards.map((card) => {
          return <CardPrev card={card} key={card.cardId} />
        })}
      </CardContainer>
      <div style={{ border: 'thick dotted' }}>
        <Link to={`/card`} state={{ background: location }}>
          카드
        </Link>
      </div>
    </div>
  )
}

const CardContainer = styled.section`
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-flow: wrap;
  gap: 40px;
`

export default Home
