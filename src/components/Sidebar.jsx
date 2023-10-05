import styled from 'styled-components'

const Sidebar = () => {
  return <Container></Container>
}

const Container = styled.aside`
  position: fixed;
  z-index: 9;
  width: 200px;
  height: 100%;
  border-right: 3px solid #ddd;
`

export default Sidebar
