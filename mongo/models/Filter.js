import mongoose from 'mongoose'
const FilterSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    mainFilter: String,
    subFilters: Array
})
delete mongoose.connection.models["Filter"]
module.exports = mongoose.model.Filter || mongoose.model('Filter', FilterSchema)