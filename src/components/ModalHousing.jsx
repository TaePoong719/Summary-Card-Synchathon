import React, { forwardRef, useEffect } from 'react'
import '../style/ModalHousing.css'

const Modal = forwardRef(({ children, setIsModalOpen }, ref) => {
  useEffect(() => {
    setIsModalOpen(true)
    return () => {
      setIsModalOpen(false)
    }
  }, [setIsModalOpen])

  return (
    <div className="modalDivHousing">
      <div className="modalHousing" ref={ref}>
        {children}
      </div>
    </div>
  )
})

export default Modal
