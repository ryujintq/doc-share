import React from 'react'
import './Input.css'

const Input = ({ text, type, name, value, onChange }) => {
    return (
        <div className="input-container">
            <p>{text}</p>
            <input
                className='input'
                type={type}
                name={name}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default Input
