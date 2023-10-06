import '../style/Home.css'
import { Link, useLocation } from 'react-router-dom'

const Home = () => {
  const location = useLocation()
  return (
    <div>
      <div>Home</div>
      <div style={{ border: 'thick dotted' }}>
        <Link to={`/card`} state={{ background: location }}>
          카드
        </Link>
      </div>
    </div>
  )
}

export default Home
