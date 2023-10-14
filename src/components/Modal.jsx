import '../style/Modal.css'

// eslint-disable-next-line react/prop-types
const Modal = ({ children, housing }) => {
  return (
    <div className="modalDiv">
      <div className="modal__inner">
        <div style={{ height: '500px', width: '500px' }}>-</div>
        <div className={housing ? 'modalHousing' : 'modal'}>{children}</div>
      </div>
    </div>
  )
}

export default Modal
