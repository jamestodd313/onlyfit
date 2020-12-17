import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Rating } from './Rating'
export const PageTitle = ({title, difficulty, category, time, rating, uploadedBy, variant}) => {
    const [numOfStars, setNumOfStars] = useState([])
    function convertTime(obj){
        if(variant !== "program"){
            if(obj.hours !== 0){
                return `${obj.hours}h ${obj.minutes}m`
            }else{
                return `${obj.minutes} mins`
            }
        }else{
            return `${time} Days`
        }

    }
    function calculateRating(obj){
        if(variant !== "program"){
            let avgData = 0
            let numOfRatings =0
            
            for(let i=0; i<6; i++){
                // take the number of ratings for obj[number] and multiply it by number
                // push that to the avgData array
                // add obj[number] to numofratings
                let totalForNum = obj[i] * i
                avgData = avgData + totalForNum
                numOfRatings = numOfRatings + obj[i]
            }
            return Math.round(avgData / numOfRatings)
        }
        
    }
    return (
        <div className="page-title">
            <div className="info">
                <h1 className="title">{title}</h1>
                <span className="secondary-accent-txt">{difficulty} • {category} • {convertTime(time)}</span>
                <Rating rating={calculateRating(rating)}/>
            </div>
            <Link as={`/trainers/${uploadedBy.handle}`} href="/trainers/[trainer]">
                <div className="trainer">
                    <img src={uploadedBy.image} className="trainer-img"/>
                    <span className="secondary-accent-txt">{uploadedBy.displayName}</span>
                </div>
            </Link>
        </div>
    )
}
