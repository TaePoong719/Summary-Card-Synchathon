import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Home from './pages/Home'
import Detail from './pages/PDFDetail'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<Landing />}></Route>
      <Route path="/" element={<App />}>
        <Route path="home" element={<Home />}></Route>
        <Route path="pdfDetail" element={<Detail />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
)
