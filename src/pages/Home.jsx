import styled, { css } from 'styled-components'
import CardPrev from '../components/CardPrev'
import '../style/Home.css'
import StyledButton from '../components/StyledButton'
import Search from '../components/Search'
import { useContext, useEffect, useState } from 'react'
import CardPrevAdd from '../components/CardPrevAdd'
import { TabletMin } from '../utils/responsive'
import { Link, useLocation } from 'react-router-dom'
import CardInsurance from '../components/CardInsurnace.jsx'
import { v4 as uuidv4 } from 'uuid'
import { AuthContext } from '../provider/userContext'
import { useRecoilState } from 'recoil'
import { searchedUserCardsState, userCardsState } from '../atom/userCardState'

const Home = ({ setLoading, isModalOpen }) => {
  const location = useLocation()
  const cardId = uuidv4()
  const uid = useContext(AuthContext).uid
  const [userCards, setUserCards] = useRecoilState(userCardsState)
  const [searchedUserCards, setSearchedUserCards] = useRecoilState(searchedUserCardsState)

  useEffect(() => {
    setSearchedUserCards(userCards)
  }, [userCards])

  return (
    <Container>
      <HeadlineContainer>
        <ButtonsContainer>
          <StyledButton onClickHandler={() => CardInsurance({ setLoading, uid, setUserCards })}>
            <p>내 보험 {<br />}불러오기</p>
          </StyledButton>
          <Link to={'/housing'} state={{ background: location }}>
            <StyledButton>
              <p>청약정보 {<br />} 불러오기</p>
            </StyledButton>
          </Link>
        </ButtonsContainer>
        <Search />
      </HeadlineContainer>
      <CardContainer isModalOpen={isModalOpen}>
        {searchedUserCards.map((card) => {
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
