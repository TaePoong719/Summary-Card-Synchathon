import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import styled from 'styled-components'
import Sidebar from './components/Sidebar'

const App = () => {
  return (
    <>
      <Header />
      <Container>
        <Sidebar />
        <Outlet />
      </Container>
    </>
  )
}

const Container = styled.main`
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 20px;
  position: relative;
  top: 60px;
`

export default App
