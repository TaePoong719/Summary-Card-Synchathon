import '../style/ModalHousing.css'
import React, { forwardRef } from 'react'

// eslint-disable-next-line react/prop-types
const Modal = forwardRef(({ children }, ref) => {
  return (
    <div className="modalDivHousing">
      <div className="modalHousing" ref={ref}>
        {children}
      </div>
    </div>
  )
})

export default Modal
