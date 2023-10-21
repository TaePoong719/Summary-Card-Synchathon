import { Outlet, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import styled from 'styled-components'
import Sidebar from './components/Sidebar'
import { MobileResponsive } from './utils/responsive'
import { useContext, useEffect } from 'react'
import { AuthContext } from './provider/userContext'

const Layout = () => {
  let isResponsiveSidebar = 'false'
  const isResponsive = MobileResponsive()
  const user = useContext(AuthContext)

  if (isResponsive) {
    isResponsiveSidebar = 'true'
  }
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  })

  return (
    <>
      <Header />
      <Container $isResponsive={isResponsiveSidebar}>
        <Sidebar />
        <InnerContainer $isResponsive={isResponsiveSidebar}>
          <Outlet />
        </InnerContainer>
      </Container>
    </>
  )
}

const InnerContainer = styled.div`
  box-sizing: border-box;
  padding: ${(props) => {
    return props.$isResponsive === 'true' ? '0px' : '20px'
  }};
  position: relative;
  left: ${(props) => {
    return props.$isResponsive === 'true' ? '0px' : '200px'
  }};
  width: calc(
    100% -
      ${(props) => {
        return props.$isResponsive === 'true' ? '0px' : '200px'
      }}
  );
`

const Container = styled.main`
  margin: 0 auto;
  box-sizing: border-box;
  max-width: 1200px;
  height: calc(100% - 60px);
  position: relative;
  top: 60px;
`
export default Layout
