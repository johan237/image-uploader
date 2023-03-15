import mongoose from 'mongoose'
console.log('running')
    // const dbUrl = 'mongodb://localhost:27017/yelp-camp'
const connectDB = async() => {
    try {
        const conn = mongoose.connect('mongodb://127.0.0.1:27017/image-uploader', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

    } catch (e) {
        console.log(e)
        process.exit(1)
    }
}

export default connectDB