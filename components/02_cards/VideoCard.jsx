import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { CardDetails } from './CardDetails'

export const VideoCard = ({video}) => {
    const [type, setType] = useState('video')
    useEffect(()=>{
        if('programLengthInDays' in video) setType('program')
    },[video])
    function convertTime(obj){
        if(obj === undefined) return
        if(obj.hours !== 0){
            return `${obj.hours}h ${obj.minutes}m`
        }else{
            return `${obj.minutes} mins`
        }
    }
    return (
        <Link as={`/${type}/${video._id}`} href={`/[${type}]/[${type}]`}>
            <div className="video-card" tabIndex="0">
                <img src={video.thumbnailImage} className="thumbnail-img"/>
                <CardDetails id={video._id} type={type} title={video.title} trainer={video.uploadedBy.displayName} handle={video.uploadedBy.handle} difficulty={video.difficulty} category={video.categories.main} time={convertTime(video.time) || `${video.programLengthInDays} Days`}/>
            </div>
        </Link>

    )
}
