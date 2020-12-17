import mongoose from 'mongoose'
const PrivateUserSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId(),
    userRef: String,
    email: String,
    imageUrl: String,
    subscribedTo: Array,
    purchasedPrograms: Array
})
delete mongoose.connection.models["PrivateUser"]
module.exports = mongoose.model.PrivateUser || mongoose.model('PrivateUser', PrivateUserSchema)