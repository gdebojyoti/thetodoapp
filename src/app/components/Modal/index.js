import React from 'react'

import './style'

const Modal = ({ children, onClose }) => {
  const onClick = e => {
    e.stopPropagation()
  }
  return (
    <div className='modal' onClick={onClose}>
      <div className='modal__content' onClick={onClick}>
        {children}
      </div>
    </div>
  )
}

export default Modal
