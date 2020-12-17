import React from 'react'
import Link from 'next/link'
export const SettingsLink = ({title, subhead, image, link}) => {
    return (
        <Link href={`/settings/${link}`}>
            <div className="settings-link">
                <span className="title">{title}</span>
                <span className="subhead">{subhead}</span>
                <img src={image}/>
            </div>
        </Link>
    )
}
