import mongoose from 'mongoose'
const LiveSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    title: String,
    startedAt: Date || String,
    uploadedBy: {
        uid: mongoose.Types.ObjectId,
        handle: String,
        image: String
    },
    thumbnailImage: String,
    viewers: {
        total: Number,
        current: Number
    }
})
delete mongoose.connection.models["LiveStream"]
module.exports = mongoose.model.LiveStream || mongoose.model('LiveStream', LiveSchema)