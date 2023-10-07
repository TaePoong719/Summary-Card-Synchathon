import Modal from './Modal'
import { useState } from 'react'
import CardDetail from './CardDetail.jsx'
import CardEdit from './CardEdit.jsx'
import { Link, useLocation } from 'react-router-dom'

const Card = () => {
  const [CardModifying, setCardModifying] = useState(false)
  const card = useLocation().state.card

  return (
    <div>
      <Modal>
        {CardModifying && <CardEdit />}
        {!CardModifying && <CardDetail card={card} setCardModifying={setCardModifying} />}
      </Modal>
    </div>
  )
}

export default Card
