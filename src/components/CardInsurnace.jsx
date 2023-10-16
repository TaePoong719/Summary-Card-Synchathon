import axios from 'axios'

const CardInsurance = async ({ userCards, setUserCards, setLoading, uid }) => {
  try {
    setLoading(true)
    const res = await axios.get('/api/904/insurance_list')

    for (const r of res.data.result.slice(0, 2)) {
      const temp = {
        cardName: r.상품이름,
        category: '보험',
        date: getCurrentDate(),
        company: r.회사이름,
        pdfLink: '',
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
        cardColor: CardColorList[Math.floor(Math.random() * 10)],
      }
      console.log({
        ...temp,
        uid: uid,
      })
      /* 청약정보 불러오기 카드 1개 */
      const resCard = await axios.post('/api/246/postairtablecard', {
        ...temp,
        uid: uid,
      })

      setUserCards((prev) => [...prev, { ...temp, cardId: resCard.data.result }])

      console.log('postairtablecard', resCard.data.result)
    }
  } catch (e) {
    console.log(e)
  } finally {
    setLoading(false)
  }
}

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

const getCurrentDate = () => {
  const today = new Date()
  const { getFullYear, getMonth, getDate } = today
  const year = getFullYear.call(today)
  const month = (getMonth.call(today) + 1).toString().padStart(2, '0')
  const day = getDate.call(today).toString().padStart(2, '0')

  return `${year}-${month}-${day}`
}

export default CardInsurance
