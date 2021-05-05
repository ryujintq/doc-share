import mongoose from 'mongoose'

const connectDB = async () => {
    await mongoose.connect(process.env.DB_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
}

mongoose.connection.on('open', () => console.log('Connected to database'))

export default connectDB