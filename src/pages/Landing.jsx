import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import { useContext } from 'react'
import AuthProvider from '../provider/userProvider'

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
      Landing
      <button onClick={handleAuth}>서비스 이용하기 위해 로그인(구글)</button>
    </div>
  )
}

export default Landing
