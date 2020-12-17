import mongoose from 'mongoose'
import dbConnect from '../../../../mongo/dbConnect'
import PublicUser from '../../../../mongo/models/PublicUser'
dbConnect()
export default async(req, res)=>{
    const {uid} = req.query
    switch(req.method){
        case('POST'):
            if(uid !== 'create') return res.status(403).json({success: false, message: "but why tho", data: {}})
            else{
                const userToCreate = {
                    _id: mongoose.Types.ObjectId(),
                    ...req.body
                }
                try{
                    const newUser = await PublicUser.create(userToCreate)
                    res.status(201).json({success: true, message: "User created", data: newUser })
                }catch(error){
                    console.error(error)
                    res.status(500).json({success: false, message: "idk what happened", data:{}})
                }
            }
            break
        case('GET'):
            try{
                const fetchedUser = await PublicUser.find({"handle": uid})
                res.status(200).json({ success: true, message: `User ${uid} found.`, data: fetchedUser}) 
            }catch{
                res.status(500).json({ success: false, message: "Something went wrong 😬", data: {}})
            }
        break
        case('PATCH'):
        try{
            // const userToDelete = await Pub
        }catch{
            
        }
        default:
            res.status(403).json({ success: false, message: "Nope", data: {} })
        break
    }
}