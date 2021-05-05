import React, { useState } from 'react'
import Form from '../../components/Form/Form'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import SmallLink from '../../components/SmallLink/SmallLink'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../../redux/actions/authActions'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import './Signup.css'

const Signup = () => {
    const [userData, setUserData] = useState({ firstName: '', lastName: '', email: '', password: '', password2: '' })
    const { error } = useSelector(state => state.auth)
    const history = useHistory()
    const dispatch = useDispatch()

    const handleOnChange = e => {
        const { name, value } = e.target
        setUserData(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        const { firstName, lastName, email, password } = userData
        dispatch(signup(firstName, lastName, email, password))
        history.push('/')
    }

    const handleSmallOnClick = () => {
        history.push('/')
    }

    return (
        <div className='auth-container'>
            <h1>Signup</h1>
            {error && <ErrorMessage text={error} />}
            <Form>
                <Input text='First Name' type='text' name='firstName' value={userData.firstName} onChange={handleOnChange} />
                <Input text='Last Name' type='text' name='lastName' value={userData.lastName} onChange={handleOnChange} />
                <Input text='Email' type='text' name='email' value={userData.email} onChange={handleOnChange} />
                <Input text='Password' type='password' name='password' value={userData.password} onChange={handleOnChange} />
                <Input text='Confirm Password' type='password' name='password2' value={userData.password2} onChange={handleOnChange} />
                <Button text='Confirm' onClick={handleFormSubmit} />
            </Form>
            <SmallLink text="Already have an account? Click here to login" onClick={handleSmallOnClick} />
        </div>
    )
}

export default Signup
