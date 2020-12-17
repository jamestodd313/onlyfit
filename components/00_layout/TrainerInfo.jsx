import React from 'react'
import { Rating } from './Rating'

export const TrainerInfo = ({trainer}) => {
    function formatEducation(obj){
        if(!obj[0]) return
        let ed = obj[0]
        return `${ed.degree} ${ed.major} • ${ed.school} ${ed.class}`
    }
    return (
        <div className="trainer-info">
            <div className="image-section">
                <img className="trainer-img" src={trainer.imageUrl}/>
                {trainer.verified ? (
                    <svg className="verified-icon" xmlns="http://www.w3.org/2000/svg" width="20.136" height="24.531" viewBox="0 0 20.136 24.531">
                        <path id="Icon_material-verified-user" data-name="Icon material-verified-user" d="M14.318,1.5,4.5,5.864v6.545c0,6.055,4.189,11.716,9.818,13.091,5.629-1.375,9.818-7.036,9.818-13.091V5.864ZM12.136,18.955,7.773,14.591l1.538-1.538,2.825,2.815,7.189-7.189,1.538,1.549Z" transform="translate(-4.25 -1.226)" fill="#00fff5" stroke="#484848" strokeWidth="0.5"/>
                    </svg>
                ) : null}
            </div>
            <h1 className="title">{trainer.name}</h1>
            <span className="secondary-accent-txt">{formatEducation(trainer.education)}</span>
            <span className="secondary-accent-txt">{trainer.certifications.length !== 0 ? `+${trainer.certifications.length} Certifications` : null}</span>
            <Rating rating={5}/>
        </div>
    )
}
