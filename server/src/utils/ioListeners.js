import findOrCreateDocument from './findOrCreateDocument.js'
import Document from '../models/Document.js'
import socketioJwt from 'socketio-jwt'

const ioListeners = io => {
    io
        .use(socketioJwt.authorize({
            secret: process.env.JWT_SECRET,
            handshake: true
        }))
        .on('connection', socket => {
            const id = socket.handshake.query.id

            socket.on('get-documents', async () => {
                const ownedDocs = await Document.find({ owner: id }, 'title _id').lean()
                const sharedDocs = await Document.find({ shared: id }, 'title _id').lean()

                socket.emit('load-documents', { ownedDocs, sharedDocs })
            })

            socket.on('get-document', async ({ documentId, title }) => {
                const document = await findOrCreateDocument(documentId, title, id)
                socket.join(documentId)
                socket.emit('load-document', document.data)

                socket.on('send-changes', delta => {

                    socket.broadcast.to(documentId).emit('receive-changes', delta)
                })

                socket.on('save-document', async data => {
                    await Document.findByIdAndUpdate(documentId, { data })
                })
            })
            console.log('user connected')
        })
}

export default ioListeners
