import mongoose from 'mongoose'
import dbConnect from '../../../../../../mongo/dbConnect'
dbConnect()
// import Video from '../../../../../mongo/models/Video'
const Video = mongoose.model('Video')

export default async (req, res)=>{
    try{
        const vids = await Video.find({'categories.main': req.query.category})
        return res.status(200).json({success: true, message: `${req.query.category} videos`, data: vids})
    }catch(err){
        console.error(err)
        return res.status(500)
    }

}