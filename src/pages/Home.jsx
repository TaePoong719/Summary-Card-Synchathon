import styled from 'styled-components'
import CardPrev from '../components/CardPrev'
import '../style/Home.css'
import StyledButton from '../components/StyledButton'
import Search from '../components/Search'
import { useEffect, useState } from 'react'
import CardPrevAdd from '../components/CardPrevAdd'
import { TabletMin } from '../utils/responsive'
import { Link, useLocation } from 'react-router-dom'
import CardInsurance from '../components/CardInsurnace.jsx'

const Home = ({ userCards, setUserCards, searchedCards, setSearchedCards, setLoading }) => {
  useEffect(() => {
    setSearchedCards(userCards)
  }, [userCards])

  const location = useLocation()

  return (
    <Container>
      <HeadlineContainer>
        <ButtonsContainer>
          <StyledButton
            onClickHandler={() => CardInsurance({ userCards, setUserCards, setLoading })}
          >
            <p>내 보험 {<br />}불러오기</p>
          </StyledButton>

          <Link to={'/housing'} state={{ background: location }}>
            <StyledButton>
              <p>청약정보 {<br />} 불러오기</p>
            </StyledButton>
          </Link>
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
        <CardPrevAdd />
      </CardContainer>
    </Container>
  )
}

const Container = styled.section`
  padding: 20px;
  @media (max-width: ${TabletMin}) {
    padding: 0;
  }
`

const ButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
`

const HeadlineContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  margin: 10px 0 20px 0;
  padding-right: 30px;
  flex-wrap: wrap;
`

const CardContainer = styled.section`
  padding-top: 20px;
  box-sizing: border-box;
  display: flex;
  flex-flow: wrap;
  gap: 40px;
`

export default Home
