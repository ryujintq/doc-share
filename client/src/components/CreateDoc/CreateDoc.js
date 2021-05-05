import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../Button/Button'
import Input from '../Input/Input'
import { v4 as uuidv4 } from 'uuid'
import './CreateDoc.css'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

const CreateDoc = () => {
    const [title, setTitle] = useState('')
    const [showOverlay, setShowOverlay] = useState(false)
    const [error, setError] = useState('')
    const history = useHistory()

    const onTitleChange = e => {
        const { value } = e.target
        setTitle(value)
    }

    const toggleOverlay = () => {
        setShowOverlay(!showOverlay)
    }

    const createNewDoc = () => {
        if (!title) return setError('Please enter a title')
        history.push({ pathname: `/documents/${uuidv4()}`, title })
    }

    return (
        <>
            <div className="doc" onClick={toggleOverlay}>
                <div className="card dashed-border">
                    <i className="fas fa-plus fa-2x"></i>
                </div>
                <p>Create document</p>
            </div>
            <div className={`docs-overlay ${showOverlay ? 'show-overlay' : ''}`}>
                <i className="fas fa-times fa-2x close-icon" onClick={toggleOverlay}></i>
                <div className="overlay-content">
                    <h2>Create New Doc</h2>
                    {error && <ErrorMessage text={error} />}
                    <Input text='Title' type='text' value={title} onChange={onTitleChange} />
                    <div className="buttons">
                        <Button text='Confirm' onClick={createNewDoc} />
                        <Button text='Cancel' onClick={toggleOverlay} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateDoc
