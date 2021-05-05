import React, { useEffect, useState } from 'react'
import DocList from '../../components/DocList/DocList'
import { useSocket } from '../../api/socket.js'
import './Dashboard.css'

const Dashboard = () => {
    const [ownedDocs, setOwnedDocs] = useState([])
    const [sharedDocs, setSharedDocs] = useState([])
    const socket = useSocket()

    useEffect(() => {
        if (!socket) return
        socket.emit('get-documents')

        const docsHandler = documents => {
            setOwnedDocs(documents.ownedDocs)
            setSharedDocs(documents.sharedDocs)
        }

        socket.on('load-documents', docsHandler)

        const errorHandler = err => {
            if (err.data.type === 'UnauthorizedError' || err.data.code === 'invalid_token') {
                console.log('Unauthorized');
            }
        }

        socket.on('unauthorized', errorHandler)

        return () => {
            socket.off('load-documents', docsHandler)
            socket.off('unauthorized', errorHandler)
        }
    }, [socket])

    return (
        <div className='dashboard'>
            <DocList text='Your Documents' createDoc={true} documents={ownedDocs} />
            <DocList text='Shared Documents With You' documents={sharedDocs} />
        </div>
    )
}

export default Dashboard
