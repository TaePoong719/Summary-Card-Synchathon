import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Home from './pages/Home'
import Card from './components/Card.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/Signup.jsx'
import Containers from './Containers.jsx'
function App() {
  return (
    <div>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/" element={<Containers />}>
          <Route path="home" element={<Home />}></Route>
          <Route path="card" element={<Card />}></Route>
          {/* <Route path="pdf_detail" element={<Detail />}></Route> */}
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default App
