import styled from 'styled-components'
import CardPrev from '../components/CardPrev'
import '../style/Home.css'
import StyledButton from '../components/StyledButton'
import Search from '../components/Search'
import { useEffect, useState } from 'react'

const Home = ({ userCards, setUserCards }) => {
  const [searchedCards, setSearchedCards] = useState(userCards)

  useEffect(() => {
    setSearchedCards(userCards)
  }, [userCards])

  return (
    <Container>
      <HeadlineContainer>
        <ButtonsContainer>
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
        </ButtonsContainer>
        <Search
          userCards={userCards}
          searchedCards={searchedCards}
          setSearchedCards={setSearchedCards}
        />
      </HeadlineContainer>
      <CardContainer>
        {searchedCards.map((card) => {
          return <CardPrev card={card} key={card.cardId} />
        })}
      </CardContainer>
    </Container>
  )
}

const Container = styled.section`
  padding: 20px;
`

const ButtonsContainer = styled.div`
  display: flex;
`

const HeadlineContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  margin: 10px 0 20px 0;
  padding-right: 30px;
`

const CardContainer = styled.section`
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-flow: wrap;
  gap: 40px;
`

export default Home
