import mongoose from 'mongoose'
const ProgramSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    title: String,
    uploadedBy: {
        uid: mongoose.Types.ObjectId,
        displayName: String,
        handle: String,
        image: String
    },
    programLengthInDays: Number,
    includedInSubscription: Boolean,
    purchasePrice: Number,
    description: String,
    categories: {main: String, subcategories: [String]},
    equipment: [String],
    thumbnailImage: String,
    trailerVideo: String,
    programVideos: [{ title: String, length: {hours: Number, minutes: Number, seconds: Number}, day: String, description: String, equipment: [String], videoFile: String}],
    programBlogPost: [{ title: String, day: String, body: String}],
    difficulty: String
})
delete mongoose.connection.models["Program"]
module.exports = mongoose.model.Program || mongoose.model('Program', ProgramSchema)