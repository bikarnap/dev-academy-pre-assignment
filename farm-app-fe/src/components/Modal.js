import React from 'react'
import AddFarm from './AddFarm'
import '../Modal.css'

const Modal = ({show, handleCloseModal}) => {
  const showHideModel = show ? 'modal-show' : 'modal-hide'
  return(
    <div className={`modal ${showHideModel}`}>
      <div className="modal-content">
        <span className="close" onClick={handleCloseModal}>&times;</span>
        <div>
        <input type="text" />
        </div>
        <div>
        <input type="datetime-local" />
        </div>
        <div>
        <input type="text" />
        </div>
        <div>
        <input type="text" />
        </div>
      </div>
    </div>
  )
}

export default Modal