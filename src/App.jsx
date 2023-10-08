import { Route, Routes, useLocation } from 'react-router-dom'
import Landing from './pages/Landing'
import Home from './pages/Home'
import Card from './components/Card.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/Signup.jsx'
import Containers from './Containers.jsx'
import { useState } from 'react'
// import { AuthContext } from '../provider/userContext'

function App() {
  // 모달 배경
  const location = useLocation()
  const background = location.state && location.state.background
  const [userCards, setUserCards] = useState(testUserCard)
  // const user = useContext(AuthContext)

  // 서버에서 유저 카드 정보 가져오기 데모 코드 : 실제론 fetch 말고 axios 사용하는게 좋을 듯
  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (user) {
  //       const res = await fetch('https://naver.com')
  //       setUserCards(res.body)
  //     }
  //   }
  //   fetchData()
  // }, [user])

  return (
    <div>
      <Routes location={background || location}>
        <Route index element={<Landing />} />
        <Route path="/" element={<Containers />}>
          <Route
            path="home"
            element={<Home userCards={userCards} setUserCards={setUserCards} />}
          ></Route>
          <Route path="card/:id" element={<Card setUserCards={setUserCards} />}></Route>
          {/* <Route path="pdf_detail" element={<Detail />}></Route> */}
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="card/:cardId"
            element={<Card userCards={userCards} setUserCards={setUserCards} />}
          ></Route>
          {/* <Route path="pdf_detail" element={<Detail />}></Route> */}
        </Routes>
      )}
    </div>
  )
}

const testUserCard = [
  {
    cardId: 'abasascnk21ms',
    name: '이륜차 상해보험',
    category: '보험',
    date: '2023-10-07',
    company: '교보생명',
    pdfLink: 'https://naver.com',
    summary: `
      교보생명 이륜차보험은 이륜차 소유자들을 위한 보험 상품입니다. 
      이륜차 사고로 인한 재물 손해 및 대인/대인책임 상해에 대한 보상을 제공하는 것이 주요한 목적입니다. 이 보험은 이륜차 소유자의 안전을 보호하기 위해 필수적입니다.
      이 보험은 이륜차 소유자의 안전을 보호하기 위해 필수적입니다.
      사고로 인한 금전적인 손실을 방지하여 안심하고 차량을 이용할 수 있도록 도와줍니다.
      교보생명 이륜차보험은 이륜차 소유자들을 위한 보험 상품입니다.
      이륜차 사고로 인한 재물 손해 및 대인/대인책임 상해에 대한 보상을 제공하는 것이 주요한 목적입니다.
      이 보험은 이륜차 소유자의 안전을 보호하기 위해 필수적입니다.
      사고로 인한 금전적인 손실을 방지하여 안심하고 차량을 이용할 수 있도록 도와줍니다.
      `,
    cardColor: '#DF6962',
  },
  {
    cardId: 'ammskmksm1ms',
    name: '손해 보험',
    category: '보험',
    date: '2023-10-05',
    company: '교보생명',
    pdfLink: 'https://naver.com',
    summary: `
      교보생명 이륜차보험은 이륜차 소유자들을 위한 보험 상품입니다. 
      이륜차 사고로 인한 재물 손해 및 대인/대인책임 상해에 대한 보상을 제공하는 것이 주요한 목적입니다. 이 보험은 이륜차 소유자의 안전을 보호하기 위해 필수적입니다.
      이 보험은 이륜차 소유자의 안전을 보호하기 위해 필수적입니다.
      사고로 인한 금전적인 손실을 방지하여 안심하고 차량을 이용할 수 있도록 도와줍니다.
      교보생명 이륜차보험은 이륜차 소유자들을 위한 보험 상품입니다.
      이륜차 사고로 인한 재물 손해 및 대인/대인책임 상해에 대한 보상을 제공하는 것이 주요한 목적입니다.
      이 보험은 이륜차 소유자의 안전을 보호하기 위해 필수적입니다.
      사고로 인한 금전적인 손실을 방지하여 안심하고 차량을 이용할 수 있도록 도와줍니다.
      `,
    cardColor: '#B290AA',
  },
  {
    cardId: 'a719cmkhoksams',
    name: '암 보험',
    category: '보험',
    date: '2023-10-08',
    company: '교보생명',
    pdfLink: 'https://naver.com',
    summary: `
      교보생명 이륜차보험은 이륜차 소유자들을 위한 보험 상품입니다. 
      이륜차 사고로 인한 재물 손해 및 대인/대인책임 상해에 대한 보상을 제공하는 것이 주요한 목적입니다. 이 보험은 이륜차 소유자의 안전을 보호하기 위해 필수적입니다.
      이 보험은 이륜차 소유자의 안전을 보호하기 위해 필수적입니다.
      사고로 인한 금전적인 손실을 방지하여 안심하고 차량을 이용할 수 있도록 도와줍니다.
      교보생명 이륜차보험은 이륜차 소유자들을 위한 보험 상품입니다.
      이륜차 사고로 인한 재물 손해 및 대인/대인책임 상해에 대한 보상을 제공하는 것이 주요한 목적입니다.
      이 보험은 이륜차 소유자의 안전을 보호하기 위해 필수적입니다.
      사고로 인한 금전적인 손실을 방지하여 안심하고 차량을 이용할 수 있도록 도와줍니다.
    `,
    cardColor: '#617797',
  },
  {
    cardId: 'a719cmkhoks9ks',
    name: '암 보험',
    category: '보험',
    date: '2023-10-08',
    company: '교보생명',
    pdfLink: 'https://naver.com',
    summary: `
      교보생명 이륜차보험은 이륜차 소유자들을 위한 보험 상품입니다. 
      이륜차 사고로 인한 재물 손해 및 대인/대인책임 상해에 대한 보상을 제공하는 것이 주요한 목적입니다. 이 보험은 이륜차 소유자의 안전을 보호하기 위해 필수적입니다.
      이 보험은 이륜차 소유자의 안전을 보호하기 위해 필수적입니다.
      사고로 인한 금전적인 손실을 방지하여 안심하고 차량을 이용할 수 있도록 도와줍니다.
      교보생명 이륜차보험은 이륜차 소유자들을 위한 보험 상품입니다.
      이륜차 사고로 인한 재물 손해 및 대인/대인책임 상해에 대한 보상을 제공하는 것이 주요한 목적입니다.
      이 보험은 이륜차 소유자의 안전을 보호하기 위해 필수적입니다.
      사고로 인한 금전적인 손실을 방지하여 안심하고 차량을 이용할 수 있도록 도와줍니다.
    `,
    cardColor: '#617797',
  },
]
export default App
