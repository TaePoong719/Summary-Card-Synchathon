import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import { useContext } from 'react'
import AuthProvider from '../provider/userProvider'
import '../style/Landing.css'
import googleIcon from '../../public/googleIcon.svg'
import styled from 'styled-components'

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
        const res = await signInWithPopup(auth, provider)
        /* userCredential을 받아서 uid를 db로 보내면, 이미 db에 있으면 무시, db에 없다면 유저 등록  */
      }
      navigate('/home')
    } catch (e) {
      alert(e)
      console.log(e)
    }
  }

  return (
    <Container>
      <Section1>
        <Wallpaper1 $imgsrc={`${import.meta.env.BASE_URL}landing_wallpaper1.svg`}>
          <h1 className="landing1__main-text">
            어려운 보험과 부동산,{<br />}
            핀셋으로 중요한 정보만 쏙
          </h1>
          <h1></h1>
          <AuthButton onClick={handleAuth}>
            <img src={googleIcon} alt="google_login" />
            지금 시작하기
          </AuthButton>
        </Wallpaper1>
      </Section1>
      <Section2></Section2>
    </Container>
  )
}

const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
`
const Section = styled.section`
  margin: 0 auto;
  height: 900px;
  position: relative;
`

const Section1 = styled(Section)`
  text-align: center;
  .landing1__main-text {
    font-size: 2.5rem;
    margin: 150px 0 20px 0;
    line-height: 1.8;
    font-weight: bold;
  }
`

const Section2 = styled(Section)``
const Wallpaper1 = styled.div`
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  position: absolute;
  background: url(${(props) => props.$imgsrc}) center no-repeat;
  height: 700px;
  width: 700px;
`

const AuthButton = styled.button`
  margin: 0 auto;
  display: flex;
  align-items: center; /* 아이템들을 수평으로 중앙에 정렬 */
  justify-content: space-between;
  border: none;
  font-weight: bold;
  font-size: 16px;
  box-shadow: 15px 10px 10px -2px rgba(0, 0, 0, 0.33);
  -webkit-box-shadow: 15px 10px 10px -2px rgba(0, 0, 0, 0.33);
  -moz-box-shadow: 15px 10px 10px -2px rgba(0, 0, 0, 0.33);
  cursor: pointer;
  height: 55px;
  border-radius: 20px;
  padding: 5px 15px; /* 양쪽 패딩을 조금 늘려서 버튼이 넓어지도록 조절합니다. */
  text-align: center;
  background: white;
  img {
    margin-left: 10px;
    margin-right: 10px; /* 이미지와 텍스트 사이의 간격 조절 */
    width: 15px; /* 이미지의 너비 */
    height: 16px; /* 이미지의 높이 */
  }
`

export default Landing
