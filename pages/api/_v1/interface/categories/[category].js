import mongoose from 'mongoose'
import dbConnect from '../../../../../mongo/dbConnect'
dbConnect()
// import Category from '../../../../mongo/models/Category'
const Category = mongoose.model('Category')
export default async(req, res)=>{
    const catCall = await Category.find({link: `/explore/${req.query.category}`})

    return res.status(200).json({ success: true, message: "", data: catCall})
}