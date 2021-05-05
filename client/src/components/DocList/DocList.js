import React from 'react'
import { useHistory } from 'react-router-dom'
import CreateDoc from '../CreateDoc/CreateDoc'
import './DocList.css'

const DocList = ({ text, createDoc, documents }) => {
    const history = useHistory()

    const handleDocCLick = docId => {
        history.push(`/documents/${docId}`)
    }

    return (
        <>
            <h2 className='sub-heading'>{text}</h2>
            <div className='doc-list'>
                {createDoc && <CreateDoc />}
                {documents.map(doc => (
                    <div className="doc" key={doc._id} onClick={() => handleDocCLick(doc._id)}>
                        <div className="card">
                            <i className="fas fa-file-alt fa-3x"></i>
                        </div>
                        <p>{doc.title}</p>
                    </div>

                ))}
            </div>
        </>
    )
}

export default DocList
