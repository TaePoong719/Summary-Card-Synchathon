import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const CardInsurance = async ({ userCards, setUserCards, setLoading }) => {
  const getCurrentDate = () => {
    const today = new Date()
    const { getFullYear, getMonth, getDate } = today

    const year = getFullYear.call(today)
    const month = (getMonth.call(today) + 1).toString().padStart(2, '0')
    const day = getDate.call(today).toString().padStart(2, '0')

    return `${year}-${month}-${day}`
  }

  try {
    setLoading(true)
    const res = await axios.get('/api/904/insurance_list')
    const cash = []
    for (const r of res.data.result) {
      cash.push({
        cardId: uuidv4(),
        name: r.상품이름,
        category: '보험',
        date: getCurrentDate(),
        company: r.회사이름,
        pdfLink: 'https://naver.com',
        summary: `보장혜택: ${r.보장혜택명}\n회사제공혜택: ${
          r.회사제공혜택명
        }\n 계약시작일: ${r.계약시작일.slice(0, 4)}년 ${parseInt(
          r.계약시작일.slice(4, 6),
          10
        )}월 ${parseInt(r.계약시작일.slice(6, 8), 10)}일\n계약종료일: ${r.계약종료일.slice(
          0,
          4
        )}년 ${parseInt(r.계약종료일.slice(4, 6), 10)}월 ${parseInt(
          r.계약종료일.slice(6, 8),
          10
        )}일`,
        cardColor: `#${Math.floor(Math.random() * 256)
          .toString(16)
          .padStart(2, '0')}${Math.floor(Math.random() * 256)
          .toString(16)
          .padStart(2, '0')}${Math.floor(Math.random() * 256)
          .toString(16)
          .padStart(2, '0')}`,
      })
    }

    // 상태 업데이트
    const updatedUserCards = [...userCards, ...cash]
    setUserCards(updatedUserCards)
  } catch (e) {
    console.log(e)
  } finally {
    setLoading(false)
  }
}

export default CardInsurance
