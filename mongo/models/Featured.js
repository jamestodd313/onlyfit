import mongoose from 'mongoose'
const FeaturedSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    type: String,
    expiresOn: String,
    idRef: mongoose.Types.ObjectId,
})
delete mongoose.connection.models["Featured"]
module.exports = mongoose.model.Featured || mongoose.model('Featured', FeaturedSchema)