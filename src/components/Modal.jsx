import '../style/Modal.css'

// eslint-disable-next-line react/prop-types
const Modal = ({ children, housing }) => {
  return (
    <div className="modalDiv">
      <div className={housing ? 'modalHousing' : 'modal'}>{children}</div>
    </div>
  )
}

export default Modal
