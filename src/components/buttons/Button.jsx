import React from 'react'
import './button.css'

//implementation for button component

function Button({ text, icon, classname, onClick, disabled }) {
  return (
    <button 
    className={`${classname} ${disabled ? 'disabled-btn' : ''}`} 
    onClick={onClick} 
    disabled={disabled}>

      <div>{icon}</div>
      <div>{text}</div>
  
    </button>
  )
}

export default Button