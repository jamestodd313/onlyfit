import mongoose from 'mongoose'
import dbConnect from '../../../../mongo/dbConnect'
dbConnect()
// import Category from '../../../mongo/models/Category'
const Category = mongoose.model('Category')
export default async (req, res)=> {
    if(req.method !== "GET") return res.status(405).json({ success: false, message: "Method not allowed", data: {}})
    try{
        let cats = await Category.find({})
        return res.status(200).json({ success: true, message: "categories", data: cats })
    }catch(err){
        console.error(err)
        return res.status(400).json({ success: false, message: "huh", data: {}})
    }
}