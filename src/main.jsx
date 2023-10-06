import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Home from './pages/Home'
import Card from './components/Card.jsx'
// import Detail from './pages/PdfDetail.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/Signup.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<Landing />}></Route>
      <Route path="/" element={<App />}>
        <Route path="home" element={<Home />}></Route>
        <Route path="card" element={<Card />}></Route>
        {/* <Route path="pdf_detail" element={<Detail />}></Route> */}
      </Route>
      <Route path="login" element={<Login />}></Route>
      <Route path="signup" element={<SignUp />}></Route>
    </Routes>
  </BrowserRouter>
)
