import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import '../style/Landing.css'
import googleIcon from '../../public/googleIcon.svg'
import styled from 'styled-components'
import CardPrev from '../components/CardPrev'
import axios from 'axios'

const Landing = ({ setUserCards, setLoading }) => {
  const provider = new GoogleAuthProvider()
  const navigate = useNavigate()

  const handleAuth = async () => {
    try {
      setLoading(true)
      const { user } = await signInWithPopup(auth, provider)
      console.log('로그인된', user)
      console.log({
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        phone: '010-0000-0000',
      })
      const res = await axios.post('/api/850/login_card_info', {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        phone: '010-0000-0000',
      })
      const userCards = []
      const cardIdArr = res.data.result.split(', ')
      console.log('login_card', res.data.result)
      for (let id of cardIdArr) {
        console.log('id', id)
        const res = await axios.post('/api/246/getairtablecard', {
          cardId: +id,
        })
        const card = {
          ...res.data.result,
          category: res.data.result[`category (from category_number)`][0],
        }
        userCards.push(card)
      }
      setUserCards(userCards)
      console.log(userCards)
      navigate('/home')
    } catch (e) {
      alert(e)
      console.log(e)
    } finally {
      setLoading(false)
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
                cardName: '이륜차 상해보험',
                date: '2023-10-05',
                company: '교보생명',
                cardColor: '#DF6961',
              }}
            />
          </div>
          <div className="card_2">
            <CardPrev
              card={{
                cardName: '치아 보험',
                date: '2023-10-13',
                company: '교보생명',
                cardColor: '#B290A9',
              }}
            />
          </div>
          <div className="card_3">
            <CardPrev
              card={{
                cardName: '암 보험',
                date: '2023-10-23',
                company: '교보생명',
                cardColor: '#3A71B0',
              }}
            />
          </div>
        </CardContainer>
      </Section3>
      <Section4>
        <div className="landing4__upper">
          <h1 className="landing4__h1">핀셋의 AI기술로 읽기 쉽게</h1>
          <h3 className="landing4__h3">
            몇백 장의 보험 약관도 읽기 쉽도록 {<br />} 핀셋으로 중요한 정보만 쏙쏙 뽑아 요약해줘요.
          </h3>
        </div>
        <div
          style={{
            width: '70%',
            height: '35%',
            margin: '0',
            position: 'absolute',
            top: '45%',
            left: '15%',
            right: '0',
            bottom: '0',
            backgroundColor: '#84ABFF',
            borderRadius: '20px',
            zIndex: '-1',
          }}
        ></div>
        <div className="landing4__CardDetailDiv">
          <div className="landing4__UpperBox">
            <div className="landing4__InnerBox">
              <div className="landing4__ImgBox">
                <img
                  src={`${import.meta.env.BASE_URL}company/교보생명.svg`}
                  alt={`교보생명로고`}
                  style={{
                    backgroundColor: 'white',
                    width: '100%', // 문자열로 설정
                    height: '100%', // 문자열로 설정
                    objectFit: 'contain', // 문자열로 설정, 필요에 따라 값 변경
                  }}
                />
              </div>
              <div className="landing4__CompanySelect">
                <h1 className="landing4__upper2">교보생명</h1>
              </div>
              <div className="landing4__CardNameInput">
                <h1 className="landing4__upper2">이륜차 상해 보험</h1>
              </div>
            </div>
          </div>
          <div className="landing4__CardSummary">
            <ul className="landing4__dot-list">
              <li>교보생명 이륜차보험은 이륜차 소유자들을 위한 보험 상품입니다.</li>
              <li>
                이륜차 사고로 인한 재물손해 및 대인/대인책임 상해에 대한 보상을 제공하는 것이 주요한
                목적입니다.
              </li>
              <li>이 보험은 이륜차 소유자의 안전을 보호하기 위해 필수적입니다.</li>
              <li>
                사고로 인한 금전적인 손실을방지하여 안심하고 차량을 이용할 수 있도록 도와줍니다.
              </li>
            </ul>
          </div>
        </div>
      </Section4>
      <Section5>
        <div className="landing5__upper">
          <h3 className="landing5__upper__h3">부동산 청약</h3>
          <h1 className="landing5__upper__h1">내 집 마련의 꿈, {<br />} 손쉽게 현실로</h1>
        </div>
        <div className="landing5__downer">
          <div className="landing5__imgbox11">
            <img
              className="landing5__image_home"
              src={`${import.meta.env.BASE_URL}emoji_house.svg`}
            />
            <h3>청약 정보 불러오기</h3>
          </div>
          <div className="landing5__textbox12">
            <h1 className="landing5__downer__h1">청약 공고를, {<br />} 한 페이지에 정리하기</h1>
            <h3 className="landing5__downer__h3">
              부동산 청약 정보를 검색하고, {<br />} 핀셋에 카드로 추가할 수 있어요.
            </h3>
          </div>
          <div className="landing5__textbox21">
            <h1 className="landing5__downer__h1">
              내용을 바로 확인하고{<br />}
              소중한 기회 놓치지 않게
            </h1>
            <h3 className="landing5__downer__h3">
              자세한 공고 내용까지 한눈에 확인하고,{<br />}청약을 신청하세요.
            </h3>
          </div>
          <div className="landing5__imgbox22">
            <img
              className="landing5__image_contract"
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
  height: 800px;
  width: 700px;
`

const Section4 = styled(Section)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 40px;

  .landing4__upper {
    margin-bottom: 80px;
  }

  .landing4__h1 {
    font-size: 2.2rem;
    font-weight: bold;
  }

  .landing4__h3 {
    color: #6b7684;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .landing4__CardDetailDiv {
    width: 70%;
    display: flex;
    flex-direction: column;
    overflow: visible;
  }
  .landing4__upper {
    text-align: center;
  }
  .landing4__InnerBox {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    margin-bottom: 5%;
  }

  .landing4__ImgBox {
    width: 150px;
    height: 150px;
    overflow: hidden;
    text-align: center;
    background-color: white;
    background-size: cover;
    border: 2px transparent; /* Set the border properties as desired */
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); /* Set the box shadow properties as desired */
    position: absolute;
    margin-top: -5%;
    margin-left: 3%;
    border-radius: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .landing4__CompanySelect {
    color: white;
    justify-self: flex-end;
    align-self: flex-end;
    margin-right: 5%;
    margin-bottom: -3%;
  }

  .landing4__CardNameInput {
    color: white;
    align-self: flex-end;
    margin-right: 5%;
  }

  .landing4__CardSummary {
    margin-left: 3%;
    margin-bottom: 5%;
    font-size: 0.8rem;
  }

  .landing4__dot-list {
    text-align: left;
    padding-left: 20px; /* 점과 텍스트 사이의 간격을 조절할 수 있습니다. */
  }

  .landing4__dot-list li {
    color: white;
    margin-bottom: 10px; /* 각 목록 항목 간의 아래 여백을 늘립니다. */
    font-weight: bold;
  }
`

const Section5 = styled(Section)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 150px;
  .landing5__upper {
    width: 80%;
    margin-bottom: 8%;
  }

  .landing5__downer {
    width: 80%;
    height: 100%;
    display: grid;
    grid-template-rows: repeat(2, 1fr); /* 2 rows with equal height */
    grid-template-columns: repeat(2, 1fr); /* 2 columns with equal width */
    gap: 20px; /* Adjust the gap as needed */
    justify-items: center;
    align-items: stretch;
  }

  .landing5__textbox12 {
    margin-right: 30%;
    width: 60%;
    height: 80%;
  }

  .landing5__textbox21 {
    margin-left: 30%;
    width: 60%;
    height: 80%;
  }

  .landing5__imgbox11 {
    margin-left: 30%;
    width: 60%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    border: 2px transparent; /* Set the border properties as desired */
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); /* Set the box shadow properties as desired */
    padding: 20px; /* Add padding as needed */
  }

  .landing5__imgbox22 {
    margin-right: 30%;
    width: 60%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    border: 2px transparent; /* Set the border properties as desired */
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); /* Set the box shadow properties as desired */
    padding: 20px; /* Add padding as needed */
  }

  .landing5__image_home {
    margin-top: 5%;
    height: 105px;
    width: 90px;
  }

  .landing5__image_contract {
    margin-top: 5%;
    height: 105px;
    width: 100px;
  }

  .landing5__upper__h3 {
    font-size: 1.5rem;
    font-weight: bold;
    color: #5289ff;
  }

  .landing5__upper__h1 {
    font-size: 2.5rem;
    line-height: 1.5;
    font-weight: bold;
  }

  .landing5__downer__h1 {
    font-weight: bold;
    font-size: 1.3rem;
  }

  .landing5__downer__h3 {
    font-weight: bold;
    font-size: 1rem;
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
  background-size: contain;
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
