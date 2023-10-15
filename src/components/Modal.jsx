import '../style/Modal.css'
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
    <div className="modalDiv">
      <div ref={ref} className="modal__inner">
        <div style={{ height: '200px', width: '500px' }}></div>
        <div className="modal">{children}</div>
        <div style={{ height: '50px', width: '500px' }}></div>
      </div>
    </div>
  )
})

export default Modal
