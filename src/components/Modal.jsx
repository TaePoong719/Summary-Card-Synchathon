import '../style/Modal.css'

// eslint-disable-next-line react/prop-types
const Modal = ({ children, housing }) => {
  return (
    <div className="modalDiv">
      <div style={{ height: '100px', width: '500px', position: 'relative', top: '0px' }}></div>
      <div className={housing ? 'modalHousing' : 'modal'}>{children}</div>
      <div style={{ height: '100px', width: '500px', position: 'relative', top: '0px' }}></div>
    </div>
  )
}

export default Modal
