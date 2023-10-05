import styled from 'styled-components'

const Header = () => {
  return (
    <Container>
      <InnerContainer>
        <Logo />
        <UserImg />
      </InnerContainer>
    </Container>
  )
}

const Logo = styled.img``
const UserImg = styled.img``
const InnerContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
`

const Container = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  width: 100%;
  height: 60px;
  border-bottom: 2px solid #ddd;
  font-size: 1rem;
  z-index: 10;
  background-color: #fff;

  .header__link-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-right: 3rem;
    gap: 20px;
  }
`

export default Header
