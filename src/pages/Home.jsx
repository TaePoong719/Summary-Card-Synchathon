import styled from 'styled-components'
import CardPrev from '../components/CardPrev'
import '../style/Home.css'

import Button from '../components/Button'
import Search from '../components/Search'

const Home = ({ userCards, setUserCards }) => {
  return (
    <div>
      <Button>내 보험 {<br />} 불러오기 </Button>
      <Button>청약정보 {<br />} 불러오기 </Button>
      <Search></Search>
      <CardContainer>
        {userCards.map((card) => {
          return <CardPrev card={card} key={card.cardId} />
        })}
      </CardContainer>
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
