import mongoose from 'mongoose'
import dbConnect from '../../../../mongo/dbConnect'
import Video from '../../../../mongo/models/Video'

dbConnect()


export default async (req, res)=> {
    if(req.method !== "GET") return res.status(405).json({ success: false, message: "Method not allowed", data: {}})
    try{
        const feats = await Video.find({featured: true})
        return res.status(200).json({ success: true, message: "featured", data: feats})
    }catch(err){
        console.error(err)
        return res.status(400).json({ success: false, message: "Something went wrong", data: {}})
    }

    // if(req.method === "POST"){
    //     try{
    //         let crea = {
    //             _id: mongoose.Types.ObjectId(),
    //             ...req.body
    //         }
    //         let ok = await Featured.create(crea)
    //         return res.status(200).json(ok)
    //     }catch(err){
    //         console.error(err)
    //         return res.status(500)
    //     }
    // }
}