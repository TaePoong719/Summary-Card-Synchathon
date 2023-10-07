import { Route, Routes, useLocation } from 'react-router-dom'
import Landing from './pages/Landing'
import Home from './pages/Home'
import Card from './components/Card.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/Signup.jsx'
import Containers from './Containers.jsx'
function App() {
  // 모달 배경
  const location = useLocation()
  const background = location.state && location.state.background

  return (
    <div>
      <Routes location={background || location}>
        <Route index element={<Landing />} />
        <Route path="/" element={<Containers />}>
          <Route path="home" element={<Home />}></Route>
          <Route path="card" element={<Card />}></Route>
          {/* <Route path="pdf_detail" element={<Detail />}></Route> */}
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
      {background && (
        <Routes>
          <Route path="card" element={<Card />}></Route>
          {/* <Route path="pdf_detail" element={<Detail />}></Route> */}
        </Routes>
      )}
    </div>
  )
}

export default App
