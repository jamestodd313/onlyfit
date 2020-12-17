import mongoose from 'mongoose'
import dbConnect from '../../../../mongo/dbConnect'
dbConnect()
const Filter = mongoose.model('Filter')

export default async (req, res)=> {
    // if(req.method === 'POST'){
    //     try {
    //         let filterToCreate = {
    //             _id: mongoose.Types.ObjectId(),
    //             ...req.body
    //         }
    //         const newFilter = await Filter.create(filterToCreate)
    //         return res.status(201).json({success: true, message: "Filter created", data: newFilter})
    //     } catch (error) {
    //         console.error(error)
    //         return res.status(500).json(error)
    //     }
    // }
    if(req.method !== 'GET') return res.status(405).json({ success: false, message: "but why tho", data: {}})
    try{
        const filts = await Filter.find({})
        return res.status(200).json({ success: true, message: "filters", data: filts})
    }catch(err){
        console.error(err)
        return res.status(400).json({success: false, message: "Something went wrong", data: {}})
    }
}