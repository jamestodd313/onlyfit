import mongoose from 'mongoose'
const PublicUserSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    handle: String,
    imageUrl: String,
    joinedOn: Date,
    education: [{school: String, graduated: String, degree: String, major: String}],
    certifications: [{certification: String, issuedBy: String}],
    verified: {status: String, documents: []},
    subscriptionPrice: Number,
    rating: { 0: Number, 1: Number, 2: Number, 3: Number, 4: Number, 5: Number}
})

delete mongoose.connection.models["PublicUser"]
module.exports = mongoose.models.PublicUser || mongoose.model('PublicUser', PublicUserSchema, 'users_public')