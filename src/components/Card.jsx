import Modal from './Modal'
import { useState } from 'react'
import CardDetail from './CardDetail.jsx'
import CardEdit from './CardEdit.jsx'

const Card = () => {
  const CardModifying = useState(false)

  return (
    <div>
      <Modal>
        {!CardModifying && CardDetail}
        {CardModifying && CardEdit}
      </Modal>
    </div>
  )
}

export default Card
