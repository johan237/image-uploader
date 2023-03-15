import mongoose from 'mongoose';

const uploadCloudSchema = mongoose.Schema({
    originalName: {
        type: String,
        required: [true, "Please give original name"]
    },

    savedName: {
        type: String,
        required: [true, "Please give saved name"]
    },

    link: {
        type: String,
        required: [true, "Please give link"]
    }
})

export default mongoose.model('uploadCloud', uploadCloudSchema)