import mongoose from 'mongoose'
import dbConnect from '../../../../mongo/dbConnect'
// import LiveStream from '../../../mongo/models/LiveStream'
const LiveStream = mongoose.model('LiveStream')

export default async(req, res)=>{

    if(req.method === "POST"){
        const liveToLaunch = await LiveStream.create({
            _id: mongoose.Types.ObjectId(),
            ...req.body,
            viewers: {
                total: 0,
                current: 0
            }
        })
        return res.status(201).json({ success: true, message: "You are now live", data: liveToLaunch})
    }
    try {
        const streams = await LiveStream.find({})
        return res.status(200).json({ success: true, message: "", data: streams})
    
    } catch (error) {
        console.error(error)
        return res.status(200).json({success: false, message: "Something went wrong", data: error})
    }
}