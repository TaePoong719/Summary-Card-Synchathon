import '../style/CardDetail.css'
import { Link } from 'react-router-dom'

const CardDetail = ({ card, setCardModifying }) => {
  const modalStyle = {
    width: '100%',
    maxWidth: '500px',
    minHeight: '600px',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: card.cardColor,
  }

  return (
    <div className="CardDetailDiv" style={modalStyle}>
      <div>
        <div className="ImgBox">
          <img
            src={`${import.meta.env.BASE_URL}company/${card.company}.svg`}
            alt={'교보생명로고'}
          />
        </div>
        <div>
          <div>
            <span className="">{card.company}</span>
          </div>
          <div>
            <span>{card.name}</span>
          </div>
        </div>
      </div>
      <div>
        <span>{card.summary}</span>
      </div>
      <div>
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
