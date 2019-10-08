import React from 'react'

import './style'

const Toast = ({ title, text = 'I am a toast. I provide some information', cta = 'Okay', onClick }) => {
  return (
    <div className='toast'>
      <div className='toast__details'>
        {title && <div className='toast__title'>{title}</div>}
        <div className='toast__text'>{text}</div>
      </div>
      <button className='toast__cta' onClick={onClick}>{cta}</button>
    </div>
  )
}

export default Toast
