import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import styled from 'styled-components'
import Sidebar from './components/Sidebar'
import AuthProvider from './provider/userProvider'

const Containers = () => {
  return (
    <>
      <AuthProvider>
        <Header />
        <Container>
          <Sidebar />
          <InnerContainer>
            <Outlet />
          </InnerContainer>
        </Container>
      </AuthProvider>
    </>
  )
}

export const InnerContainer = styled.div`
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  left: 200px;
  width: calc(100% - 200px);
`

export const Container = styled.main`
  margin: 0 auto;
  box-sizing: border-box;
  max-width: 1200px;
  height: calc(100% - 60px);
  padding: 0 20px;
  position: relative;
  top: 60px;
`

export default Containers
