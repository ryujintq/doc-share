import mongoose from 'mongoose'

const documentSchema = new mongoose.Schema({
    _id: String,
    owner: { type: mongoose.Types.ObjectId, ref: 'User', index: true },
    shared: [{ type: mongoose.Types.ObjectId, ref: 'User', index: true }],
    title: String,
    data: Object
})

export default mongoose.model('Document', documentSchema)
