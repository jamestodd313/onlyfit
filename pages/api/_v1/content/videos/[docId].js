import mongoose from 'mongoose'
import dbConnect from '../../../../../mongo/dbConnect'
// import Video from '../../../../mongo/models/Video'
dbConnect()
const Video = mongoose.model('Video')

export default async (req, res)=> {
    const {docId} = req.query
    switch(req.method){
        case "GET":
            try {
                const vid = await Video.find({_id: docId})
                return res.status(200).json({ success: true, message: `Video ${docId}`, data: vid})
            } catch (error) {
                console.error(error)
                return res.status(400).json({ success: false, message: "Something went wrong", data: {}})
            }
        case "POST":
            try {
                const vidToCreate = await Video.create({
                    _id: mongoose.Types.ObjectId(),
                    ratings: {
                        0: 0,
                        1: 0,
                        2: 0,
                        3: 0,
                        4: 0,
                        5: 0
                    },
                    viewCount: 0,
                    ...req.body
                })
                return res.status(201).json({ success: true, message: `Video ${vidToCreate._id} has been created.`, data: vidToCreate})
            } catch (error) {
                console.error(error)
                return res.status(400).json({ success:false, message: "Something went wrong", data: {}})
            }
        default:
            return res.status(405).json({ success: false, message: "Method not allowed", data: {}})
    }
}