import mongoose from 'mongoose'
import dbConnect from '../../../../../mongo/dbConnect'
dbConnect()
// import Program from '../../../../mongo/models/Program'
const Program = mongoose.model('Program')

export default async(req, res)=>{

    if(req.method === "POST"){
        try {
            const progToCreate = await Program.create({
                _id: mongoose.Types.ObjectId(),
                 ...req.body,
                 reviews: {
                     0:0,
                     1:0,
                     2:0,
                     3:0,
                     4:0,
                     5:0
                 }
             })
             return res.status(200).json({ success: true, message: "", data: progToCreate})
        } catch (error) {
            console.error(error)
            return res.status(500).json({ success: false, message: "Something went wrong", data: error.code})
        }
    }

    try {
        const prog = await Program.find({_id: req.query.program})
        return res.status(200).json({ success: true, message: "", data: prog}) 
    } catch (error) {
        console.error(error)
        return res.status(404).json({ success: false, message: "Not found", data: {}})
    }
}