import styled from 'styled-components'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../provider/userContext'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import UserInfo from './UserInfo'

const Header = () => {
  const user = useContext(AuthContext)
  const [displayUserInfo, setDisplayUserInfo] = useState(false)

  const handlerLogout = () => {
    setDisplayUserInfo(false)
    signOut(auth)
  }

  return (
    <Container>
      <InnerContainer>
        <Link to={`/home`}>
          <Logo src="public/logo_with_finset.svg" alt="logo" />
        </Link>
        {user?.displayName ? (
          <>
            <div className="header__user-name">
              <p
                onClick={() => {
                  setDisplayUserInfo((prev) => !prev)
                }}
              >
                {sliceStr(user.displayName, 7)}님
              </p>
              <div className="header__user-info">
                {displayUserInfo ? <UserInfo handlerLogout={handlerLogout} user={user} /> : <></>}
              </div>
              {displayUserInfo ? (
                <div
                  onClick={() => {
                    setDisplayUserInfo(false)
                  }}
                  className="header__user-info-block"
                >
                  {' '}
                </div>
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <Link to={`/login`}>
            <h3>로그인</h3>
          </Link>
        )}
      </InnerContainer>
    </Container>
  )
}
const sliceStr = (str, n) => {
  return str.length >= n ? str.slice(0, n) + '...' : str
}

const Logo = styled.img`
  width: 100px;
  height: 40px;
`

const InnerContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  height: 100%;
  display: flex;
  justify-content: space-between;
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
  .header__user-info {
    position: absolute;
    top: 60px;
    right: 0;
    z-index: 20;
  }
  .header__user-info-block {
    position: fixed;
    z-index: 19;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
  }
`

export default Header
