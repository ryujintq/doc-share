import React, { useState, useEffect, useRef } from 'react'
import { useSocket } from '../../api/socket'
import ReactQuill from 'react-quill'
import { useLocation, useParams } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css'
import './TextEditor.css'

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["bold", "italic", "underline"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        [{ align: [] }],
        ["image", "blockquote", "code-block"],
        ["clean"],
    ]
}

const SAVE_INTERVAL_MS = 2000

const TextEditor = () => {
    const [document, setDocument] = useState('')
    const { id: documentId } = useParams()
    const location = useLocation()
    const reactQuillRef = useRef()
    const socket = useSocket()

    //get document from server
    useEffect(() => {
        if (!socket) return

        socket.emit('get-document', { documentId, title: location.title })

        socket.once('load-document', document => {
            setDocument(document)
        })
    }, [socket, documentId, location.title])

    //handle user doc changes
    const handleOnChange = (content, delta, source) => {
        if (source !== 'user') return
        socket.emit('send-changes', delta)
    }

    //handle incoming doc changes
    useEffect(() => {
        if (!socket) return

        const handler = delta => {
            reactQuillRef.current.getEditor().updateContents(delta)
        }

        socket.on('receive-changes', handler)

        return () => {
            socket.off('receive-changes', handler)
        }
    }, [socket])

    //save document
    useEffect(() => {
        if (!socket) return

        const interval = setInterval(() => {
            socket.emit('save-document', reactQuillRef.current.getEditor().getContents())
        }, SAVE_INTERVAL_MS)

        return () => {
            clearInterval(interval)
        }
    }, [socket])

    return (
        <ReactQuill
            value={document}
            onChange={handleOnChange}
            modules={modules}
            theme="snow"
            ref={reactQuillRef}
        />
    )
}

export default TextEditor
