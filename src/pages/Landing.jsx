import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import { useContext } from 'react'
import AuthProvider from '../provider/userProvider'
import '../style/Landing.css'
import googleIcon from '../../public/googleIcon.svg'

const Landing = () => {
  const provider = new GoogleAuthProvider()
  const navigate = useNavigate()
  const user = useContext(AuthProvider)

  const handleAuth = async () => {
    try {
      console.log(user)
      if (user !== undefined) {
        localStorage.setItem('userData', JSON.stringify(user))
      } else {
        await signInWithPopup(auth, provider)
      }
      navigate('/home')
    } catch (e) {
      alert(e)
      console.log(e)
    }
  }

  return (
    <div>
      <div>Landing</div>
      <div className="authContainer">
        <button onClick={handleAuth} className="authBtn">
          <img src={googleIcon} alt="google_login" />
          Google 계정으로 로그인
        </button>
      </div>
    </div>
  )
}

export default Landing
