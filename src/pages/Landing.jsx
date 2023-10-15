import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import { useContext } from 'react'
import AuthProvider from '../provider/userProvider'
import '../style/Landing.css'
import googleIcon from '../../public/googleIcon.svg'
import styled from 'styled-components'
import CardPrev from '../components/CardPrev'

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
            <span className="blue">핀셋</span>으로 중요한 정보만 쏙
          </h1>
          <AuthButton onClick={handleAuth}>
            <img src={googleIcon} alt="google_login" />
            지금 시작하기
          </AuthButton>
        </Wallpaper1>
      </Section1>
      <Section2>
        <h1>
          <span className="blue">Fin</span>ancial <span className="blue">S</span>ummary{' '}
          <span className="blue">E</span>asy <span className="blue">T</span>ool
        </h1>
        <h2>
          내가 가입한 모든 보험, 부동산 청약을 한 곳에서, <br></br>
          핀셋과 함께라면 누구나 쉽게 확인할 수 있어요.
        </h2>
      </Section2>
      <Section3>
        <h1>
          <span className="blue">
            <strong>보험</strong>
          </span>
        </h1>
        <h2>
          보험 약관, <br />
          깔끔하게 한 번에
        </h2>
        <p>
          핀셋에 보험을 연결해 보세요 <br />
          교보라이프플래닛은 물론, <br />
          직접 보험 약관 파일을 추가할 수 있어요
        </p>
        <CardContainer>
          <div className="card_1">
            <CardPrev
              card={{
                name: '이륜차 상해보험',
                date: '2023-10-05',
                company: '교보생명',
                cardColor: '#DF6962',
              }}
            />
          </div>
          <div className="card_2">
            <CardPrev
              card={{
                name: '치아 보험',
                date: '2023-10-13',
                company: '교보생명',
                cardColor: '#617797',
              }}
            />
          </div>
          <div className="card_3">
            <CardPrev
              card={{
                name: '암 보험',
                date: '2023-10-23',
                company: '교보생명',
                cardColor: '#B290AA',
              }}
            />
          </div>
        </CardContainer>
      </Section3>
    </Container>
  )
}

const Container = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  letter-spacing: 2px;
  .blue {
    color: var(--main-color);
  }
`
const Section = styled.section`
  margin: 0 auto;
  height: 850px;
  position: relative;
  box-sizing: border-box;
`

const Section1 = styled(Section)`
  text-align: center;
  .landing1__main-text {
    font-size: 2.5rem;
    margin: 250px 0 40px 0;
    line-height: 1.8;
    font-weight: bold;
  }
`

const Section2 = styled(Section)`
  text-align: center;
  padding-top: 100px;
  height: 700px;
  h1 {
    font-size: 2.7rem;
  }
  h2 {
    font-size: 1.5rem;
  }
`

const Section3 = styled(Section)`
  position: relative;
  margin: 40px;
  h1 {
    font-size: 1.2rem;
  }
  h2 {
    font-size: 2.5rem;
  }
  p {
    position: absolute;
    bottom: 150px;
    right: 40px;
    font-size: 1.25rem;
    font-weight: bold;
  }
`

const Wallpaper1 = styled.div`
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  position: absolute;
  background: url(${(props) => props.$imgsrc}) center no-repeat;
  background-size: contain;
  height: 700px;
  width: 700px;
`
const CardContainer = styled.section`
  letter-spacing: 0px;
  .card_1 {
    position: absolute;
    top: 50px;
    right: 50px;
  }
  .card_2 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .card_3 {
    position: absolute;
    left: 50px;
    bottom: 200px;
  }
`

const AuthButton = styled.button`
  margin: 0 auto;
  display: flex;
  align-items: center;
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
  padding: 5px 15px;
  text-align: center;
  background: white;
  img {
    margin-left: 10px;
    margin-right: 10px;
    width: 15px;
    height: 16px;
  }
`

export default Landing
