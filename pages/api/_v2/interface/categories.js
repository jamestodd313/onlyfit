import mongoose from 'mongoose'
import dbConnect from '../../../../mongo/dbConnect'
dbConnect()
import Category from '../../../../mongo/models/Category'

export default async (req, res)=> {
    // if(req.method !== "GET") return res.status(405).json({ success: false, message: "Method not allowed", data: {}})
    // try{
    //     let cats = await Category.find({})
    //     return res.status(200).json({ success: true, message: "categories", data: cats })
    // }catch(err){
    //     console.error(err)
    //     return res.status(400).json({ success: false, message: "huh", data: {}})
    // }


    if(req.method !== "GET") return res.status(405).json({ success: false, message: "Method not allowed", data:{}})
    if(req.query.category){
        let catToReturn = await Category.find({link: `/explore/${req.query.category}`})
        return res.status(200).json({ success: true, message: `${req.query.category} doc`, data: catToReturn})
    }else{
        let catsArr = await Category.find()
        return res.status(200).json({ success: true, message: "all categories", data: catsArr})
    }
}



// if req.query.category, return one category doc.
// else return all