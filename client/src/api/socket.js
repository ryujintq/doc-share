import React, { createContext, useContext, useEffect, useState } from 'react'
import socketIOClient from 'socket.io-client'

const SocketContext = createContext()

export const useSocket = () => {
    return useContext(SocketContext)
}

export const SocketProvider = ({ id, token, children }) => {
    const [socket, setSocket] = useState('')

    useEffect(() => {
        const newSocket = socketIOClient('http://localhost:3005', { query: { id, token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGM2ZjQzMzljYThiMDY1OGU1MGU3YyIsImlhdCI6MTYxOTk4MTI2OH0.9f37T3-p5F3AwVdFiXffgag-ASSpfYzKpkSzfXB7KEI' } })

        setSocket(newSocket)
        return () => newSocket.disconnect()
    }, [id, token])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}
