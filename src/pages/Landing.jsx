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
      <Section5>
        <div className="landing5__upper">
          <h3 className="landing5__upper__h3">부동산 청약</h3>
          <h1 className="landing5__upper__h1">내 집 마련의 꿈, {<br />} 손쉽게 현실로</h1>
        </div>
        <div className="landing5__downer">
          <div className="landing5__imgbox">
            <img className="landing5__image" src={`${import.meta.env.BASE_URL}emoji_house.svg`} />
            <h3>청약 정보 불러오기</h3>
          </div>
          <div>
            <h1 className="landing5__downer__h1_up">청약 공고를, {<br />} 한 페이지에 정리하기</h1>
            <h3 className="landing5__downer__h3_up">
              부동산 청약 정보를 검색하고, {<br />} 핀셋에 카드로 추가할 수 있어요.
            </h3>
          </div>
          <div>
            <h1 className="landing5__downer__h1_down">
              내용을 바로 확인하고{<br />}
              소중한 기회 놓치지 않게
            </h1>
            <h3 className="landing5__downer__h3_down">
              자세한 공고 내용까지 한눈에 확인하고,{<br />}청약을 신청하세요.
            </h3>
          </div>
          <div className="landing5__imgbox">
            <img
              className="landing5__image"
              src={`${import.meta.env.BASE_URL}icon_contract.svg`}
              alt="Icon Contract"
            />
            <h3>청약 공고 내용</h3>
          </div>
        </div>
      </Section5>
      <Section6>
        <Wallpaper2 $imgsrc={`${import.meta.env.BASE_URL}landing_wallpaper2.svg`}>
          <h1 className="landing6__main-text">
            그럼 이제 핀셋과{<br />}
            함께 해볼까요?
          </h1>
          <h1></h1>
          <AuthButton onClick={handleAuth}>
            <img src={googleIcon} alt="google_login" />
            지금 시작하기
          </AuthButton>
        </Wallpaper2>
      </Section6>
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
  height: 800px;
  width: 700px;
`

const Section5 = styled(Section)`
  .landing5__downer {
    display: grid;
    grid-template-rows: repeat(2, 1fr); /* 2 rows with equal height */
    grid-template-columns: repeat(2, 1fr); /* 2 columns with equal width */
    gap: 20px; /* Adjust the gap as needed */
  }
  .landing5__imgbox {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid #000; /* Set the border properties as desired */
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); /* Set the box shadow properties as desired */
    padding: 20px; /* Add padding as needed */
  }

  .landing5__image {
    height: 105px;
    width: 90px;
  }
  .landing5__upper__h3 {
    font-size: 1.5rem;
    font-weight: bold;
    color: #5289ff;
  }

  .landing5__upper__h1 {
    font-size: 2rem;
    line-height: 1.5;
    font-weight: bold;
  }
`

const Section6 = styled(Section)`
  text-align: center;
  .landing6__main-text {
    font-size: 2.5rem;
    margin: 250px 0 20px 0;
    line-height: 1.8;
    font-weight: bold;
  }
`
const Wallpaper2 = styled.div`
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  position: absolute;
  background: url(${(props) => props.$imgsrc}) center no-repeat;
  height: 800px;
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
