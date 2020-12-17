// UID CHANGED TO HANDLE.


import mongoose from 'mongoose'
import dbConnect from '../../../../../mongo/dbConnect'
// import Video from '../../../../mongo/models/Video'
// import Program from '../../../../mongo/models/Program'
const Video = mongoose.model('Video')
const Program = mongoose.model('Program')
dbConnect()

export default async (req, res)=> {
    try{
        const {uid} = req.query
        const freeVids = await Video.find({adSupported: true, "uploadedBy.handle": uid})
        const premiumVids = await Video.find({adSupported: false, "uploadedBy.handle": uid})
        const programs = await Program.find({"uploadedBy.handle": uid})
        return res.status(200).json({success: true, message: "heres the stuff", data: {freeVids, premiumVids, programs}})

    }catch(err){
        console.error(err)
        return res.status(400).json({success: false, message: "Something went wrong", data: {}})
    }
  
}
