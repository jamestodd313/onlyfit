import mongoose from 'mongoose'
const VideoSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    title: String,
    uploadedBy: {
        uid: mongoose.Types.ObjectId,
        displayName: String,
        handle: String,
        image: String
    },
    time: {
        hours: Number,
        minutes: Number,
        seconds: Number
    },
    difficulty: String,
    description: String,
    categories: {
        main: String,
        subcategories: [String],

    },
    ratings: {
        0: Number,
        1: Number,
        2: Number,
        3: Number,
        4: Number,
        5: Number,
        average: Number
    },
    thumbnailImage: String,
    videoFile: String,
    equipment: [String],
    adSupported: Boolean,
    viewCount: Number,
    featured: Boolean,
    createdAt: Date
})

delete mongoose.connection.models["Video"]
module.exports = mongoose.model.Video || mongoose.model('Video', VideoSchema) 

// module.exports.Video = mongoose.model('Video', VideoSchema)