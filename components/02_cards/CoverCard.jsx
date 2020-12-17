import Link from 'next/link'
import React from 'react'
import { CardDetails } from './CardDetails'

export const CoverCard = ({content}) => {
    const {_id, thumbnailImage, title, uploadedBy, difficulty, categories, time} = content
    return (
        <Link href={`/video/${_id}`}>            
            <div className="cover-card">
                <img src={thumbnailImage} className="thumbnail-img"/>
                <CardDetails title={title} trainer={uploadedBy.displayName} handle={uploadedBy.handle} difficulty={difficulty} category={categories.main} time={`${time.minutes} mins`}/>
            </div>
        </Link>
    )
}
