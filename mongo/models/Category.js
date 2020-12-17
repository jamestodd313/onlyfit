import mongoose from 'mongoose'
const CategorySchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    title: String,
    tagline: String,
    link: String,
    imageUrl: String
})

delete mongoose.connection.models["Category"]
module.exports = mongoose.model.Category || mongoose.model('Category', CategorySchema)