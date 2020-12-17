import mongoose from 'mongoose'
import dbConnect from '../../../../mongo/dbConnect'
import PublicUser from '../../../../mongo/models/PublicUser'
// import PrivateUser from '../../../mongo/models/PrivateUser'
dbConnect()

export default async(req, res)=>{
    if(req.method !== 'POST') return res.status(400).json({success: false})
    try{
        const userToCreate = {
            _id: mongoose.Types.ObjectId(),
            joinedOn: Date.now(),
            ...req.body
        }
        const publicuserdoc = await PublicUser.create(userToCreate)
        res.status(201).json({success: true, data: publicuserdoc})
    }catch(error){
        console.error(error)
        res.status(400).json({success: false})
    }
}