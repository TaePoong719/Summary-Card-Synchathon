import Modal from './Modal'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import '../style/Card.css'
import axios from 'axios'
import '../style/CardHousing.css'
import { v4 as uuidv4 } from 'uuid'

const CardHousing = ({ userCards, setUserCards }) => {
  const getHousing = async () => {
    const res = await axios.get('/api/904/get_subscription_detail')
    return res.data.result
  }

  const [region, setRegion] = useState('서울')
  const [name, setName] = useState('')
  const [colors, setColors] = useState([])

  useEffect(() => {
    const randomHex = () =>
      Math.floor(Math.random() * 256)
        .toString(16)
        .padStart(2, '0')
    const [r, g, b] = Array(3).fill().map(randomHex)
    setColors([r, g, b])
  }, [])

  useEffect(() => {
    let firstOptionValue

    switch (region) {
      case '서울':
        firstOptionValue = ''
        break
      case '인천':
        firstOptionValue = '검단신도시롯데캐슬넥스티엘'
        break
      case '광명':
        firstOptionValue = '트리우스광명'
        break
      case '충주':
        firstOptionValue = 'SH 항동 공공주택지구 2단지'
        break
      default:
        firstOptionValue = ''
    }

    setName(firstOptionValue)
  }, [region]) // region 값이 변경될 때마다 실행

  const HousingtoCards = async () => {
    try {
      if (region !== '' && name !== '') {
        const housingList = await getHousing()
        const filtered = housingList.filter((apartment) => {
          apartment.금융결제원분양주소.includes(region) &&
            apartment['분양 아파트명'].replace(/\s+/g, '') === name.replace(/\s+/g, '')
        })
        const cash = {
          cardId: uuidv4(),
          name: r.분양아파트명,
          category: '청약',
          date: `${r.계약시작일.substring(0, 4)}-${r.계약시작일.substring(
            4,
            6
          )}-${r.계약시작일.substring(6, 8)}`,
          company: r.회사이름,
          pdfLink: 'https://naver.com',
          summary: `${r.보장혜택명}\n${r.회사제공혜택명}\n${r.계약시작일}\n${r.계약종료일}`,
          cardColor: `#${colors.join('')}`,
        }

        const updatedUserCards = [...userCards, ...cash]
        setUserCards(updatedUserCards)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <Modal housing={true}>
        <div
          className="ModalContainer"
          style={{
            backgroundColor: `#${colors.join('')}`,
            top: '3%',
            width: '100%',
            maxWidth: '400px',
            minHeight: '500px',
            borderRadius: '20px',
            position: 'relative',
            zIndex: 101,
          }}
        >
          <div className="RegionSelectdiv">
            <select
              defaultValue={'서울'}
              onChange={(e) => setRegion(e.target.value)}
              className="RegionSelect"
            >
              <option value="서울">서울</option>
              <option value="인천">인천</option>
              <option value="광명">광명</option>
              <option value="충주">충주</option>
            </select>
          </div>
          <div>
            {region === '서울' && (
              <div className="NameSelectdiv">
                <select onChange={(e) => setName(e.target.value)} className="NameSelect">
                  <option value="래미안 라그란데">래미안 라그란데</option>
                  <option value="강동중앙하이츠시티">강동중앙하이츠시티</option>
                </select>
              </div>
            )}
            {region === '인천' && (
              <div className="NameSelectdiv">
                <select onChange={(e) => setName(e.target.value)} className="NameSelect">
                  <option value="검단신도시롯데캐슬넥스티엘">검단신도시롯데캐슬넥스티엘</option>
                </select>
              </div>
            )}
            {region === '광명' && (
              <div className="NameSelectdiv">
                <select onChange={(e) => setName(e.target.value)} className="NameSelect">
                  <option value="트리우스광명">트리우스광명</option>
                </select>
              </div>
            )}
            {region === '충주' && (
              <div className="NameSelectdiv">
                <select onChange={(e) => setName(e.target.value)} className="NameSelect">
                  <option value="SH 항동 공공주택지구 2단지">SH 항동 공공주택지구 2단지</option>
                </select>
              </div>
            )}
          </div>
          <div className="BtnContainer">
            <button onClick={HousingtoCards} className="housingCardBtn">
              불러오기
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default CardHousing
