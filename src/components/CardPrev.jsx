import styled from 'styled-components'

const CardPrev = ({ card }) => {
  console.log(card)
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
        <CompanyImage src={`${import.meta.env.BASE_URL}company/${card.company}.svg`}></CompanyImage>
        <h3>{card.company}</h3>
      </div>
      <h1>{card.name}</h1>
      <h4>{card.date}</h4>
    </Container>
  )
}

const CompanyImage = ({ src }) => {
  return (
    <CompanyWrap>
      <CompanyPhoto $src={src} />
    </CompanyWrap>
  )
}

const CompanyPhoto = styled.div`
  width: 100%;
  height: 100%;
  background: url(${(props) => props.$src});
  background-position: center;
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
`

export default CardPrev
