import Modal from '../components/Modal.jsx'
import { useEffect, useRef, useState, useContext } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import useOnClickOutside from '../hooks/useOnClickOutside'
import '../style/Card.css'
import styled from 'styled-components'
import axios from 'axios'
import { storage } from '../../firebase.js'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { AuthContext } from '../provider/userContext.js'

const Card = ({ userCards, setUserCards, setIsModalOpen, setLoading }) => {
  // 카드 추가, 수정인지 아닌지 관리하는 상태
  const [CardModifying, setCardModifying] = useState(false)
  const [CardAdding, setCardAdding] = useState(false)
  const pdfInputRef = useRef(null)
  const user = useContext(AuthContext)

  useEffect(() => {
    // 카드 추가화면일때 상태 변경
    if (state.CardAdd) {
      setCardAdding(true)
      setCardModifying(true)
      setCompanyName('교보생명')
    }
  }, [])

  // uselocation으로 변수값들 보낸거 받는 변수
  const state = useLocation().state

  // 모달 열고 닫는 함수
  const modalRef = useRef(null)
  const navigate = useNavigate()

  // 모달 닫기 함수
  const closeModal = () => {
    navigate('/home')
  }

  // 모달 바깥을 클릭했을 때 모달을 닫도록 설정
  useOnClickOutside(modalRef, closeModal)

  const card = state.card

  // CardEdit
  const cardId = useParams().cardId

  const [CompanyName, setCompanyName] = useState(card.company)
  const [CardName, setCardName] = useState(card.cardName)
  const [CardSummary, setCardSummary] = useState(card.summary)

  const [selectedColorIndex, setSelectedColorIndex] = useState(9)
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

  const isMobile = window.innerWidth <= 768 // 화면 크기를 기준으로 모바일 여부를 확인합니다.
  const modalBackgroundStyle = {
    width: isMobile ? '80%' : '700px', // 모바일 화면일 때는 80%로, PC 화면일 때는 500px로 설정합니다.
    height: 'auto',
    maxWidth: '500px',
    minHeight: '500px',
    overflow: 'visible', // 스크롤이 필요할 때만 표시
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

  const handleTextChange = (e) => {
    const value = e.target.value
    setCardSummary(value) // 내용 업데이트
  }

  const cardAdd = async () => {
    setLoading(true)
    const pdfFile = pdfInputRef.current.files[0]
    if (!pdfFile) {
      alert('PDF파일을 선택하세요')
      return
    }
    // 회사명, 카드이름, 요약내용 모두 빈칸이 아니면 ->
    if (CompanyName == '' || CardName == '') {
      alert('빈 레이블을 채워주세요')
      return
    }

    try {
      // 상태를 업데이트
      const pdfRef = ref(storage, `pdf/${getCurrentDate()}`)
      const snapshot = await uploadBytes(pdfRef, pdfFile)
      const url = await getDownloadURL(snapshot.ref)
      const summary = await axios.post('/api/904/summary_pdf', {
        url: url,
      })

      const updatedCard = {
        category: '보험',
        date: getCurrentDate(),
        pdfLink: url,
        cardColor: CardColorList[selectedColorIndex],
        cardName: CardName,
        company: CompanyName,
        summary: summary.data.content,
      }
      /* 청약정보 저장하기 카드 1개 */
      const resCard = await axios.post('/api/246/postairtablecard', {
        ...updatedCard,
        uid: user.uid,
      })
      console.log({
        ...updatedCard,
        uid: user.uid,
      })
      console.log('postairtablecard', resCard)

      const updatedCards = [...userCards, { ...updatedCard, cardId: resCard.data.result }]
      console.log({ ...updatedCard, cardId: resCard.data.result })
      setUserCards(updatedCards)
      navigate('/home')
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  const cardEdit = async () => {
    // 회사명, 카드이름, 요약내용 모두 빈칸이 아니면 ->
    try {
      if (CompanyName !== '' && CardName !== '') {
        setLoading(true)
        const cardIndex = userCards.findIndex((card) => card.cardId == cardId)
        console.log(userCards, cardId, cardIndex)
        const updatedCard = {
          cardId: card.cardId,
          cardName: CardName,
          company: CompanyName,
          summary: CardSummary,
          cardColor: CardColorList[selectedColorIndex],
          date: getCurrentDate(),
          pdfLink: card.pdfLink,
          category: card.category,
        }

        console.log({
          ...updatedCard,
          uid: user.uid,
        })
        await axios.put('/api/246/updateairtablecard', {
          ...updatedCard,
          uid: user.uid,
        })

        const updatedCards = [
          ...userCards.slice(0, cardIndex),
          updatedCard,
          ...userCards.slice(cardIndex + 1),
        ]
        // 상태를 업데이트
        setUserCards(updatedCards)
        /* 업데이트 post */
        navigate('/home')
      }
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ModalContainer">
      <Modal setIsModalOpen={setIsModalOpen} ref={modalRef}>
        {/*modal border-radius를 위한 배경. */}
        <div style={modalBackgroundStyle}></div>
        <div className="CardDetailDiv">
          <div className="UpperBox">
            <div className="InnerBox">
              <div className="ImgBox">
                <CompanyImage company={CompanyName} />
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
                  className="CompanySelectDiv"
                >
                  {!CardModifying && <option value={CompanyName}>{CompanyName}</option>}
                  {CardModifying && !CardAdding && (
                    <option value={CompanyName}>{CompanyName}</option>
                  )}
                  {CardModifying && CardAdding && (
                    <>
                      <option value="교보생명" disabled={!CardModifying}>
                        교보생명
                      </option>
                      <option value="삼성생명" disabled={!CardModifying}>
                        삼성생명
                      </option>
                      <option value="기타" disabled={!CardModifying}>
                        기타
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
                      ? { backgroundColor: '#FFFFFF', color: 'black' }
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
                {card.summary
                  .trim()
                  .split('\n')
                  .map((line) => `· ${line}`)
                  .join('\n')}
              </span>
            </div>
          )}

          {CardModifying && !CardAdding && (
            <div className="PdfInput">
              <textarea
                name="CardSummary"
                placeholder="PDF 입력"
                required
                rows={'3'}
                value={CardSummary}
                ref={textareaRef}
                onChange={handleTextChange}
                style={{ height: '30px' }}
              />
            </div>
          )}

          {CardAdding && CardModifying && (
            <>
              <div style={{ margin: '100px 0 30px 0' }}>요약하고 싶은 PDF를 입력해주세요</div>
              <input style={{ marginBottom: '40px' }} ref={pdfInputRef} type="file" accept=".pdf" />
            </>
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
                {card.pdfLink === 'www.naver.com' ? (
                  <></>
                ) : (
                  <button className="PdfDetail" onClick={() => seePdf(card.pdfLink)}>
                    PDF {<br />}보러가기
                  </button>
                )}
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
            {CardModifying && !CardAdding && (
              <button className="PdfSummary" onClick={cardEdit}>
                수정하기
              </button>
            )}
            {CardAdding && (
              <button className="PdfSummary" onClick={cardAdd}>
                PDF 요약하기
              </button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  )
}

const seePdf = (link) => {
  const alink = document.createElement('a')
  alink.href = link
  alink.target = '_black'
  alink.click()
}

const getCurrentDate = () => {
  const today = new Date()
  const { getFullYear, getMonth, getDate } = today

  const year = getFullYear.call(today)
  const month = (getMonth.call(today) + 1).toString().padStart(2, '0')
  const day = getDate.call(today).toString().padStart(2, '0')

  return `${year}-${month}-${day}`
}

const companies = ['교보생명', '롯데건설', '삼성물산', '삼성생명', '서울주택도시공사', '중앙건설']

const CompanyImage = ({ company }) => {
  let src = ''
  if (companies.find((com) => com === company)) {
    src = `${import.meta.env.BASE_URL}company/${company}.svg`
  } else {
    src = `${import.meta.env.BASE_URL}logo_40.svg`
  }
  return (
    <CompanyWrap>
      <CompanyPhoto $src={src} />
    </CompanyWrap>
  )
}

const CompanyWrap = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: white;
`

const CompanyPhoto = styled.div`
  width: 100%;
  height: 100%;
  background: url(${(props) => props.$src}) no-repeat;
  background-position: center;
  background-size: contain;
`

export default Card
