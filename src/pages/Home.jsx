import styled from 'styled-components'
import CardPrev from '../components/CardPrev'
import '../style/Home.css'
import StyledButton from '../components/StyledButton'
import Search from '../components/Search'

const Home = ({ userCards, setUserCards }) => {
  return (
    <div>
      <StyledButton
        onClickHandler={() => {
          console.log('내 보험 불러오기')
        }}
      >
        <p>내 보험 {<br />} 불러오기</p>
      </StyledButton>
      <StyledButton
        onClickHandler={() => {
          console.log('청약정보 불러오기')
        }}
      >
        <p>청약정보 {<br />} 불러오기</p>
      </StyledButton>
      <Search />
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
