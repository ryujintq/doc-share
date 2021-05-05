import Document from '../models/Document.js'

const findOrCreateDocument = async (documentId, title, id) => {
    if (id == null) return

    const document = await Document.findById(documentId)

    if (document) {
        if (id.toString() !== document.owner.toString()) {
            document.shared.push(id)
            await document.save()
        }
        return document
    }

    return await Document.create({ _id: documentId, data: '', title, owner: id })
}

export default findOrCreateDocument