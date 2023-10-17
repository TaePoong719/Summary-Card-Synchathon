import { Route, Routes, useLocation } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Home from './pages/Home.jsx'
import Card from './pages/Card.jsx'
import Layout from './Layout.jsx'
import { useContext, useEffect, useState } from 'react'
import AuthProvider from './provider/userProvider'
import CardHousing from './components/CardHousing.jsx'
import Loading from './components/Loading.jsx'
import { AuthContext } from './provider/userContext'
import axios from 'axios'
import { auth } from '../firebase.js'
import { onAuthStateChanged } from 'firebase/auth'

function App() {
  /* userCards는 유저의 카드, searchedCards는 유저가 카테고리를 클릭하거나, 검색을 했을 경우 화면에 보여지는 카드  */
  const [userCards, setUserCards] = useState([])
  const [searchedCards, setSearchedCards] = useState(userCards)
  // 모달 배경
  const location = useLocation()
  const background = location.state && location.state.background
  // 모달 창 열렸나 닫혔나
  const [isModalOpen, setIsModalOpen] = useState(false)
  // 로딩바 위한 전역상태
  const [loading, setLoading] = useState(false)
  const user = useContext(AuthContext)

  return (
    <div>
      {loading && <Loading />}

      <Routes location={background || location}>
        <Route index element={<Landing setLoading={setLoading} setUserCards={setUserCards} />} />
        <Route
          path="/"
          element={
            <Layout
              userCards={userCards}
              setUserCards={setUserCards}
              searchedCards={searchedCards}
              setSearchedCards={setSearchedCards}
            />
          }
        >
          <Route
            path="home"
            element={
              <Home
                userCards={userCards}
                setUserCards={setUserCards}
                searchedCards={searchedCards}
                setSearchedCards={setSearchedCards}
                setLoading={setLoading}
                isModalOpen={isModalOpen}
              />
            }
          />
          <Route
            path="card/:cardId"
            element={
              <Card
                setLoading={setLoading}
                userCards={userCards}
                setUserCards={setUserCards}
                setIsModalOpen={setIsModalOpen}
              />
            }
          />
          <Route
            path="housing"
            element={
              <CardHousing
                userCards={userCards}
                setUserCards={setUserCards}
                setLoading={setLoading}
                setIsModalOpen={setIsModalOpen}
              />
            }
          />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path="home"
            element={
              <Home
                userCards={userCards}
                setUserCards={setUserCards}
                searchedCards={searchedCards}
                setSearchedCards={setSearchedCards}
                setLoading={setLoading}
                isModalOpen={isModalOpen}
              />
            }
          />
          <Route
            path="card/:cardId"
            element={
              <Card
                userCards={userCards}
                setLoading={setLoading}
                setUserCards={setUserCards}
                setIsModalOpen={setIsModalOpen}
              />
            }
          ></Route>
          <Route
            path="housing"
            element={
              <CardHousing
                userCards={userCards}
                setUserCards={setUserCards}
                setLoading={setLoading}
                setIsModalOpen={setIsModalOpen}
              />
            }
          />
        </Routes>
      )}
    </div>
  )
}

export default App
