import styled from 'styled-components'
import '../style/CardPrev.css'

const CardPrev = ({ card }) => {
  return (
    <Container $color={card.cardColor}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          padding: '0 15px',
          boxSizing: 'border-box',
        }}
      >
        <CompanyImage company={card.company}></CompanyImage>
        <h3>{card.company}</h3>
      </div>
      <h1>{card.name}</h1>
      <h4>{card.date}</h4>
    </Container>
  )
}
const companies = ['교보생명', '롯데건설', '삼성물산', '삼성생명', '서울주택도시공사', '중앙건설']

const CompanyImage = ({ company }) => {
  let src = ''
  if (companies.find((com) => com === company)) {
    src = `${import.meta.env.BASE_URL}company/${company}.svg`
  } else {
    src = `${import.meta.env.BASE_URL}logo_40.svg`
  }

  return (
    <CompanyWrap>
      <CompanyPhoto $src={src} />
    </CompanyWrap>
  )
}

const CompanyPhoto = styled.div`
  width: 100%;
  height: 100%;
  background: url(${(props) => props.$src}) no-repeat;
  background-position: center;
  background-size: contain;
`

const CompanyWrap = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: white;
`

const Container = styled.div`
  height: 300px;
  width: 230px;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.$color};
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.4);
  color: white;
  text-align: center;
  line-height: 1.5;
  h1 {
    display: -webkit-box;
    width: 100%;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    padding: 0 5px;
    overflow: hidden;
    margin: 0;
    font-size: 1.5rem;
  }
  h3 {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  h4 {
    font-size: 1.1rem;
  }
`

export default CardPrev
