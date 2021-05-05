import React, { useState } from 'react'
import Form from '../../components/Form/Form'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import SmallLink from '../../components/SmallLink/SmallLink'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/actions/authActions'
import './Login.css'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'

const Login = () => {
    const [userData, setUserData] = useState({ email: '', password: '' })
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
        const { email, password } = userData
        dispatch(login(email, password))
    }

    const handleSmallOnClick = () => {
        history.push('/signup')
    }

    return (
        <div className='auth-container'>
            <h1>Login</h1>
            {error && <ErrorMessage text={error} />}
            <Form>
                <Input text='Email' type='text' name='email' value={userData.email} onChange={handleOnChange} />
                <Input text='Password' type='password' name='password' value={userData.password} onChange={handleOnChange} />
                <Button text='Confirm' onClick={handleFormSubmit} />
            </Form>
            <SmallLink text="Don't have an account? Click here to sign up" onClick={handleSmallOnClick} />
        </div>
    )
}

export default Login
