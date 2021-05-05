import React from 'react'
import './SmallLink.css'

const SmallLink = ({ text, onClick }) => {
    return (
        <small className='small-link' onClick={onClick}>
            {text}
        </small>
    )
}

export default SmallLink
