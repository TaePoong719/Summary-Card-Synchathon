import { useState } from 'react'
import CardPrev from './CardPrev.jsx'
import '../style/CardEdit.css'
import { useNavigate, useParams } from 'react-router-dom'

const CardEdit = ({ userCards, setUserCards }) => {
  const cardId = useParams().cardId
  const navigate = useNavigate()

  const [CompanyName, setCompanyName] = useState('')
  const [CardName, setCardName] = useState('')
  const [CardSummary, setCardSummary] = useState('')

  const [selectedColorIndex, setSelectedColorIndex] = useState(9)
  const CardColorList = [
    '#DF6961',
    '#B290A9',
    '#617797',
    '#5289FF',
    '#D9D9D9',
    '#D9D9D9',
    '#D9D9D9',
    '#D9D9D9',
    '#D9D9D9',
    '#D9D9D9',
  ]
  const modalStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center', // 추가된 코드
    maxWidth: '500px',
    minHeight: '600px',
    height: '100%',
    backgroundColor: CardColorList[selectedColorIndex],
  }

  const SummaryPdf = () => {
    /*
    회사명, 카드이름, 요약내용 모두 빈칸이 아니면 ->
     */
    const cardIndex = userCards.findIndex((card) => card.cardId === cardId)

    // 해당 인덱스의 객체를 복제하고, 원하는 속성들을 업데이트
    const updatedCard = {
      ...userCards[cardIndex],
      name: CardName,
      company: CompanyName,
      summary: CardSummary,
    }

    // 전체 userCards 배열을 복제하고, 해당 인덱스의 객체를 업데이트된 객체로 변경
    const updatedCards = [
      ...userCards.slice(0, cardIndex),
      updatedCard,
      ...userCards.slice(cardIndex + 1),
    ]
    console.log(updatedCard)
    // 상태를 업데이트
    setUserCards(updatedCards)
    navigate('/home')
  }

  return (
    <div className="CardDetailDiv" style={modalStyle}>
      <div className="UpperBox">
        <div className="ImgBox">
          <img
            src={`${import.meta.env.BASE_URL}company/${CompanyName}.svg`}
            alt={`${CompanyName}로고`}
            style={{ backgroundColor: 'white' }}
          />
        </div>
        <div className="InnerBox">
          <div className="CompanySelect">
            <select defaultValue="" onChange={(e) => setCompanyName(e.target.value)}>
              <option value="" disabled>
                회사선택
              </option>
              <option value="교보생명">교보생명</option>
              <option value="삼성생명">삼성생명</option>
            </select>
          </div>
          <div className="CardNameInput">
            <input
              name="CardName"
              type="text"
              placeholder="카드 이름 입력"
              required
              value={CardName}
              onChange={(event) => {
                const { value } = event.target
                setCardName(value)
              }}
            />
          </div>
        </div>
      </div>
      <div className="PdfInput">
        <input
          name="CardSummary"
          type="text"
          placeholder="PDF 입력"
          required
          value={CardSummary}
          onChange={(event) => {
            const { value } = event.target
            setCardSummary(value)
          }}
        />
      </div>
      <div className="Palette">
        <div className="PaletteSpan">색상 선택</div>
        <div className="ColorPalette">
          {CardColorList.map((color, index) => (
            <div
              key={index}
              style={{
                backgroundColor: color,
                border: selectedColorIndex === index ? '2px solid blue' : 'none',
              }}
              onClick={() => setSelectedColorIndex(index)}
            ></div>
          ))}
        </div>
      </div>
      <div>
        <button className="PdfSummary" onClick={SummaryPdf}>
          PDF 요약하기
        </button>
      </div>
    </div>
  )
}

export default CardEdit
