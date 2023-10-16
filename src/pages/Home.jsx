import styled, { css } from 'styled-components'
import CardPrev from '../components/CardPrev'
import '../style/Home.css'
import StyledButton from '../components/StyledButton'
import Search from '../components/Search'
import { useEffect, useState } from 'react'
import CardPrevAdd from '../components/CardPrevAdd'
import { TabletMin } from '../utils/responsive'
import { Link, useLocation } from 'react-router-dom'
import CardInsurance from '../components/CardInsurnace.jsx'
import { v4 as uuidv4 } from 'uuid'

const Home = ({
  userCards,
  setUserCards,
  searchedCards,
  setSearchedCards,
  setLoading,
  isModalOpen,
}) => {
  const location = useLocation()
  const cardId = uuidv4()

  useEffect(() => {
    setSearchedCards(userCards)
  }, [userCards])

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
      <CardContainer isModalOpen={isModalOpen}>
        {searchedCards.map((card) => {
          return (
            <Link
              key={`link${card.cardId}`}
              to={`/card/${card.cardId}`}
              className="custom-link "
              state={{ background: location, CardAdd: false, card: card }}
            >
              <CardPrev card={card} key={`prev${card.cardId}`} />
            </Link>
          )
        })}
        <Link
          to={`/card/${cardId}`}
          state={{
            background: location,
            CardAdd: true,
            card: {
              cardId: cardId,
              cardName: '',
              category: '보험',
              date: '',
              company: '',
              pdfLink: '',
              summary: ``,
              cardColor: '#DF6962',
            },
          }}
        >
          <CardPrevAdd />
        </Link>
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
  ${(props) =>
    props.isModalOpen
      ? css`
          position: fixed;
          /* 다른 필요한 스타일 */
        `
      : css`
          position: relative;
        `}
`

export default Home
