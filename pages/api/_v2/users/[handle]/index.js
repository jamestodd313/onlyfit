import mongoose from 'mongoose'
import dbConnect from '../../../../../mongo/dbConnect'
dbConnect()
import User from '../../../../../mongo/models/PublicUser'

export default async(req, res)=> {
    const {handle} = req.query
    try{
        const user = await User.find({ handle })
        return res.status(200).json({ success: true, message: "", data: user})
    }catch(err){
        return res.status(404).json({ success: false, message: err.code, data: err})
    }
}