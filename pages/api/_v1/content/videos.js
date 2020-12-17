import mongoose from 'mongoose'
import dbConnect from '../../../../mongo/dbConnect'
dbConnect()
// const Video = mongoose.model('Video')
import Video from '../../../../mongo/models/Video'

export default async (req, res)=> {
    // block new posts for now
    if(req.method !== "GET") return res.status(405).json({ success: false, message: "method not allowed", data: {}})
    try {
        const vids = await Video.find({})
        return res.status(200).json({ success: true, message: "all videos", data: vids})
    } catch (error) {
        console.error(err)
        return res.status(400).json({success: false, message: "something went wrong", data:{}})
    }
}
