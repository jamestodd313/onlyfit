import mongoose from 'mongoose'
import dbConnect from '../../../../../mongo/dbConnect'
dbConnect()
import Program from '../../../../../mongo/models/Program'
import Video from '../../../../../mongo/models/Video'



export default async (req, res)=>{
    try{
        // set variables
        let {type, featured, user, category, length, difficulty, rating, adSupported, sort, vid} = req.query
        if(sort === null || sort === undefined) sort = "recent"
        let contentToFind = {}
        let content

        if(type === "videos"){
            // create query object
            if(featured) contentToFind.featured = true
            if(difficulty) contentToFind.difficulty = difficulty
            if(adSupported === true) contentToFind.adSupported = true
            if(user) contentToFind = {...contentToFind, "uploadedBy.handle": user,}
            if(category)contentToFind = {...contentToFind, "categories.main": category}
            if(rating){
                contentToFind = {...contentToFind, "ratings.average": {$gte: rating}}
            }
            if(vid) contentToFind = {_id: vid}
    
            // sort results
            if(sort.toLowerCase() === "recent"){
                content = await Video.find(contentToFind).sort({ createdAt: 'desc'})
                return res.status(200).json({ success: true, message: "heres stuff", data: content})
            }else if(sort === "top rated"){
                content = await Video.find(contentToFind).sort({ "ratings.average": 'desc'})
                return res.status(200).json({ success: true, message: "heres stuff", data: content })
            }else if(sort === "view count"){
                content = await Video.find(contentToFind).sort({viewCount: 'desc'})
                return res.status(200).json({ success: true, message: "heres stuff", data: content})
            }
        } else if(type === "programs"){
            if(user) contentToFind = {...contentToFind, "uploadedBy.handle": user}
            content = await Program.find(contentToFind)
            return res.status(200).json({ success: true, message: "heres the stuff", data: content})
        }

    }catch(err){
        console.error(err)
        return res.status(400).json({ success: false, message: "Wtf did you do", data: {}})
    }
}