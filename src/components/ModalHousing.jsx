import '../style/ModalHousing.css'
import React, { forwardRef, useEffect } from 'react'

// eslint-disable-next-line react/prop-types
const Modal = forwardRef(({ children, setIsModalOpen }, ref) => {
  useEffect(() => {
    setIsModalOpen(true)
    return () => {
      setIsModalOpen(false)
    }
  }, [])

  return (
    <div className="modalDivHousing">
      <div className="modalHousing" ref={ref}>
        {children}
      </div>
    </div>
  )
})

export default Modal
