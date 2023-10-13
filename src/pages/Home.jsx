import styled from 'styled-components'
import CardPrev from '../components/CardPrev'
import '../style/Home.css'
import StyledButton from '../components/StyledButton'
import Search from '../components/Search'
import { useEffect, useState } from 'react'
import CardPrevAdd from '../components/CardPrevAdd'
import { TabletMin } from '../utils/responsive'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { Link, useLocation } from 'react-router-dom'

const Home = ({ userCards, setUserCards, searchedCards, setSearchedCards }) => {
  useEffect(() => {
    setSearchedCards(userCards)
  }, [userCards])

  const location = useLocation()

  const getInsurance = async () => {
    try {
      const res = await axios.get('/api/904/insurance_list')
      const cash = []
      for (const r of res.data.result) {
        cash.push({
          cardId: uuidv4(),
          name: r.상품이름,
          category: '보험',
          date: `${r.계약시작일.substring(0, 4)}-${r.계약시작일.substring(
            4,
            6
          )}-${r.계약시작일.substring(6, 8)}`,
          company: r.회사이름,
          pdfLink: 'https://naver.com',
          summary: `${r.보장혜택명}\n${r.회사제공혜택명}\n${r.계약시작일}\n${r.계약종료일}`,
          cardColor: `#${Math.floor(Math.random() * 256)
            .toString(16)
            .padStart(2, '0')}${Math.floor(Math.random() * 256)
            .toString(16)
            .padStart(2, '0')}${Math.floor(Math.random() * 256)
            .toString(16)
            .padStart(2, '0')}`,
        })
      }

      // 상태 업데이트
      const updatedUserCards = [...userCards, ...cash]
      setUserCards(updatedUserCards)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Container>
      <HeadlineContainer>
        <ButtonsContainer>
          <StyledButton onClickHandler={getInsurance}>
            <p>내 보험 {<br />} 불러오기</p>
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
