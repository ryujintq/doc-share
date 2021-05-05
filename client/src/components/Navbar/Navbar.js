import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { signout } from '../../redux/actions/authActions'
import './Navbar.css'

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false)
    const { firstName } = useSelector(state => state.auth)
    const { title } = useSelector(state => state.doc)
    const history = useHistory()
    const dispatch = useDispatch()

    const handleMenuToggle = () => {
        setShowMenu(!showMenu)
    }

    const handleSignout = () => {
        setShowMenu(!showMenu)
        dispatch(signout())
    }

    const handleHomePress = () => {
        history.push('/')
    }

    return (
        <div className='navbar'>
            <div className="navbar-left">
                <h3 onClick={handleHomePress}>DocShare</h3>
            </div>
            {title && <h3>{title}</h3>}
            {firstName && (
                <div className="navbar-right" onClick={handleMenuToggle}>
                    <p>Hello {firstName}!</p>
                    <i className="fas fa-sort-down"></i>
                    <div className={`navbar-menu ${showMenu ? 'show-menu' : ''}`}>
                        <p onClick={handleHomePress}>Home</p>
                        <p onClick={handleSignout}>Sign Out</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar
