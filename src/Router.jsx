import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Landing from './pages/Landing'
import Home from './pages/Home'
// import Detail from './pages/PdfDetail.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/Signup.jsx'
import Container from './Containers.jsx'

const Router = () => {
  const location = useLocation()

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />}></Route>
        <Route path="/" element={<Container />}>
          <Route path="home" element={<Home />}></Route>
          {/* <Route path="pdf_detail" element={<Detail />}></Route> */}
        </Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<SignUp />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
