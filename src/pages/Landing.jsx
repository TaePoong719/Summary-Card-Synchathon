import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate()
  return (
    <div>
      Landing
      <button
        onClick={() => {
          navigate('/home')
        }}
      >
        홈으로 가기
      </button>
    </div>
  )
}

export default Landing
