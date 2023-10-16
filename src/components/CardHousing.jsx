import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import '../style/Card.css'
import axios from 'axios'
import '../style/CardHousing.css'
import { v4 as uuidv4 } from 'uuid'
import ModalHousing from './ModalHousing.jsx'
import useOnClickOutside from '../hooks/useOnClickOutside.js'

const CardHousing = ({ userCards, setUserCards, setLoading, setIsModalOpen }) => {
  const navigate = useNavigate()
  const getHousing = async () => {
    try {
      setLoading(true)
      const res = await axios.get('/api/904/get_subscription_detail')
      return res.data.result
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  // 모달 열고 닫는 함수
  const modalRef = useRef(null)

  // 모달 닫기 함수
  const closeModal = () => {
    navigate('/home')
  }

  // 모달 바깥을 클릭했을 때 모달을 닫도록 설정
  useOnClickOutside(modalRef, closeModal)

  const getCurrentDate = () => {
    const today = new Date()
    const { getFullYear, getMonth, getDate } = today

    const year = getFullYear.call(today)
    const month = (getMonth.call(today) + 1).toString().padStart(2, '0')
    const day = getDate.call(today).toString().padStart(2, '0')

    return `${year}-${month}-${day}`
  }

  const [region, setRegion] = useState('서울')
  const [name, setName] = useState('')
  const [colors, setColors] = useState('')

  const CardColorList = [
    '#DF6961',
    '#B290A9',
    '#495A73',
    '#3A71B0',
    '#8C86C3',
    '#CC938D',
    '#BDACF0',
    '#2F4666',
    '#6CB07F',
    '#D9D9D9',
  ]

  useEffect(() => {
    setColors(CardColorList[Math.floor(Math.random() * 10)])
  }, [])

  useEffect(() => {
    let firstOptionValue
    switch (region) {
      case '서울':
        firstOptionValue = '래미안 라그란데'
        break
      case '인천':
        firstOptionValue = '검단신도시롯데캐슬넥스티엘'
        break
      case '광명':
        firstOptionValue = '트리우스광명'
        break
      case '충주':
        firstOptionValue = 'SH 항동 공공주택지구 2단지 공공분양'
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
          const isAddressMatch = apartment.주소.includes(region)
          const isNameMatch =
            apartment['분양아파트명'].replace(/\s+/g, '') === name.replace(/\s+/g, '')

          return isAddressMatch && isNameMatch
        })

        const cash = {
          cardId: uuidv4(),
          cardName: filtered[0].분양아파트명,
          category: '청약',
          date: getCurrentDate(),
          company: filtered[0].건설업체명,
          pdfLink: 'https://naver.com',
          summary: `주소:${filtered[0].주소}\n지역:${filtered[0].지역}\n청약가능통장:${
            filtered[0].청약가능통장
          }\n총세대수:${filtered[0].총세대수}\n건설업체명:${
            filtered[0].건설업체명
          }\n최대공급면적평:${filtered[0].최대공급면적평}\n최소공급면적평:${
            filtered[0].최소공급면적평
          }\n최대전용면적평:${filtered[0].최대전용면적평}\n최소전용면적평:${
            filtered[0].최소전용면적평
          }\n분양정보특이시항내용:${filtered[0].분양정보특이시항내용.replace(
            /[-\\n]/g,
            '|'
          )}\n입주자모집공고:${filtered[0].분양일정.입주자모집공고}\n계약기간:${
            filtered[0].분양일정.계약기간
          }\n입주시기:${filtered[0].분양일정.입주시기}\n당첨자발표:${
            filtered[0].분양일정.당첨자발표
          }\n1순위 청약접수년월일:${
            filtered[0].분양일정.ARRAY수1[0].청약접수년월일
          }\n1순위 청약지역:${filtered[0].분양일정.ARRAY수1[0].청약지역}\n2순위 청약접수년월일:${
            filtered[0].분양일정.ARRAY수1[1].청약접수년월일
          }\n2순위 청약지역:${filtered[0].분양일정.ARRAY수1[1].청약지역}
`,
          cardColor: colors,
        }

        const updatedUserCards = [...userCards, cash]
        setUserCards(updatedUserCards)
        navigate('/home')
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <ModalHousing setIsModalOpen={setIsModalOpen} ref={modalRef}>
        <h1 style={{ fontWeight: 'bolder', marginTop: '-3%', fontSize: '33px' }}>
          {' '}
          청약정보 가져오기{' '}
        </h1>
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
                <option value="SH 항동 공공주택지구 2단지 공공분양">
                  SH 항동 공공주택지구 2단지 공공분양
                </option>
              </select>
            </div>
          )}
        </div>
        <div className="BtnContainer">
          <button onClick={HousingtoCards} className="housingCardBtn">
            불러오기
          </button>
        </div>
      </ModalHousing>
    </div>
  )
}

export default CardHousing
