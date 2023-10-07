import '../style/Modal.css'

// eslint-disable-next-line react/prop-types
const Modal = ({ children }) => {
  return (
    <div className="modalDiv">
      <div className="modal">{children}</div>
    </div>
  )
}

export default Modal
