import '../style/CardDetail.css'
import { Link } from 'react-router-dom'

const CardDetail = ({ card, setCardModifying }) => {
  const modalStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center', // 추가된 코드
    maxWidth: '500px',
    minHeight: '600px',
    height: '100%',
    backgroundColor: card.cardColor,
  }

  return (
    <div className="CardDetailDiv" style={modalStyle}>
      <div className="UpperBox">
        <div className="ImgBox">
          <img
            src={`${import.meta.env.BASE_URL}company/${card.company}.svg`}
            alt={`${card.company}로고`}
          />
        </div>
        <div className="InnerBox">
          <div className="CardCompany">
            <span className="">{card.company}</span>
          </div>
          <div className="CardName">
            <span>{card.name}</span>
          </div>
        </div>
      </div>
      <div className="CardSummary">
        <span>
          {card.summary
            .trim()
            .split('\n')
            .map((line) => `· ${line}`)
            .join('\n')}
        </span>
      </div>
      <div className="Buttons">
        <Link to={`/pdfdetail/${card.cardId}`}>
          <button className="PdfDetail">자세히 보기</button>
        </Link>
        <button className="LinkToCardEdit" onClick={() => setCardModifying(true)}>
          수정하기{' '}
        </button>
      </div>
    </div>
  )
}

export default CardDetail
