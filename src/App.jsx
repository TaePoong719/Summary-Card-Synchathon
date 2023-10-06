import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import styled from 'styled-components'
import Sidebar from './components/Sidebar'
import AuthProvider from './provider/userProvider'

const App = () => {
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

const InnerContainer = styled.main`
  padding: 20px;
  position: relative;
  left: 200px;
  width: calc(100% - 200px);
`

const Container = styled.main`
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 20px;
  position: relative;
  top: 60px;
`

export default App
