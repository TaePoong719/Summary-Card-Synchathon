import ReactDOM from 'react-dom/client'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import AuthProvider from './provider/userProvider.jsx'
import { RecoilRoot } from 'recoil'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <Router>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </Router>
  </AuthProvider>
)
