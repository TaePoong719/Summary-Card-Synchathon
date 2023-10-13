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

  const modalBackgroundStyle = {
    width: '100%',
    maxWidth: '500px',
    minHeight: '700px',
    maxHeight: '100%' /* 원하는 높이, 100%보다 작게 설정 */,
    overflow: 'visible' /* 스크롤이 필요할 때만 표시 */,
    margin: '0',
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: CardModifying ? CardColorList[selectedColorIndex] : card.cardColor,
    borderRadius: '20px',
    zIndex: '-1',
  }

  const textareaRef = useRef(null)

  const DEFAULT_HEIGHT = 0 // 이 값을 필요에 맞게 조절하세요
  const handleTextChange = (e) => {
    const value = e.target.value
    setCardSummary(value) // 내용 업데이트
    const textarea = textareaRef.current
    textarea.style.height = 0
    textarea.style.height = DEFAULT_HEIGHT + textarea.scrollHeight + 'px'
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
    <div className="ModalContainer">
      <Modal>
        {/*modal border-radius를 위한 배경. */}
        <div style={modalBackgroundStyle}></div>
        <div className="CardDetailDiv">
          <div className="UpperBox">
            <div className="InnerBox">
              <div className="ImgBox">
                <img
                  src={`${import.meta.env.BASE_URL}company/${CompanyName}.svg`}
                  alt={`${CompanyName}로고`}
                  style={{ backgroundColor: 'white' }}
                />
              </div>
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
          {!CardModifying && (
            <div className="CardSummary">
              <span>
                {' '}
                {card.summary
                  .trim()
                  .split('\n')
                  .map((line) => `· ${line}`)
                  .join('\n')}
              </span>
            </div>
          )}

          {CardModifying && (
            <div className="PdfInput">
              <textarea
                name="CardSummary"
                placeholder="PDF 입력"
                required
                rows={1}
                value={CardSummary}
                ref={textareaRef}
                onChange={handleTextChange}
                style={{ overflowY: 'hidden' }} // overflowY를 hidden으로 설정하여 스크롤바가 나타나지 않게 합니다.
              />
            </div>
          )}

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
