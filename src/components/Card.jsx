import Modal from './Modal'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import '../style/Card.css'

const Card = ({ userCards, setUserCards }) => {
  const [CardModifying, setCardModifying] = useState(false)
  const card = useLocation().state.card
  useEffect(() => {
    if (CardModifying) {
      setCardName('')
      setCardSummary('')
    }
  }, [CardModifying])

  // CardEdit
  const cardId = useParams().cardId
  const navigate = useNavigate()

  const [CompanyName, setCompanyName] = useState(card.company)
  const [CardName, setCardName] = useState(card.name)
  const [CardSummary, setCardSummary] = useState(
    card.summary
      .trim()
      .split('\n')
      .map((line) => `· ${line}`)
      .join('\n')
  )

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
    backgroundColor: CardModifying ? CardColorList[selectedColorIndex] : card.cardColor,
  }

  function resize(obj) {
    obj.style.height = '1px'
    obj.style.height = 12 + obj.scrollHeight + 'px'
  }

  // CardEdit 요약하기 함수
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
    // 상태를 업데이트
    setUserCards(updatedCards)
    navigate('/home')
  }

  return (
    <div>
      <Modal>
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
                <select
                  style={
                    CardModifying
                      ? { backgroundColor: '#FFFFFF', color: 'black' }
                      : { backgroundColor: card.cardColor, color: 'white' }
                  }
                  defaultValue={CompanyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                >
                  {!CardModifying && <option value={CompanyName}>{CompanyName}</option>}
                  {CardModifying && (
                    <>
                      <option value="교보생명" disabled={!CardModifying}>
                        교보생명
                      </option>
                      <option value="삼성생명" disabled={!CardModifying}>
                        삼성생명
                      </option>
                    </>
                  )}
                </select>
              </div>
              <div className="CardNameInput">
                <input
                  name="CardName"
                  type="text"
                  placeholder="카드 이름 입력"
                  disabled={!CardModifying}
                  required
                  value={CardName}
                  style={
                    CardModifying
                      ? { backgroundColor: '#FFFFFF', color: 'white' }
                      : { backgroundColor: card.cardColor, color: 'white' }
                  }
                  onChange={(event) => {
                    const { value } = event.target
                    setCardName(value)
                  }}
                />
              </div>
            </div>
          </div>
          <div className="PdfInput">
            <textarea
              name="CardSummary"
              placeholder="PDF 입력"
              required
              disabled={!CardModifying}
              value={CardSummary}
              onKeyDown="resize(this)"
              onKeyUp="resize(this)"
              style={{ overflow: 'hidden' }} // 스크롤바 제거
            />
          </div>

          {CardModifying && (
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
          )}

          <div className="Buttons">
            {!CardModifying && (
              <>
                <Link to={`/pdfdetail/${card.cardId}`}>
                  <button className="PdfDetail">자세히 보기</button>
                </Link>
                <button
                  className="LinkToCardEdit"
                  onClick={() => {
                    setCardModifying(true)
                  }}
                >
                  수정하기
                </button>
              </>
            )}
            {CardModifying && (
              <button className="PdfSummary" onClick={SummaryPdf}>
                PDF 요약하기
              </button>
            )}
          </div>
          <div></div>
        </div>
      </Modal>
    </div>
  )
}

export default Card
