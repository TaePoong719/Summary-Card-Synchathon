import styled from 'styled-components'
import { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../provider/userContext'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase'

const Header = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [userData, setUserData] = useState({})

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== undefined) {
        if (pathname === '/') {
          navigate('/home')
        }
        setUserData(user)
      } else {
        navigate('/')
      }
    })
  }, [])

  return (
    <Container>
      <InnerContainer>
        <Link to={`/home`}>
          <Logo src={`${import.meta.env.BASE_URL}logo_with_finset.svg`} alt="logo" />
        </Link>
        <UserImg src={userData.photoURL} alt={userData.displayname} />
      </InnerContainer>
    </Container>
  )
}

const UserImg = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin: 0 10px 0 0;
`

const Logo = styled.img`
  width: 120px;
  height: 40px;
`

const InnerContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  align-items: center;
  position: relative;
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
