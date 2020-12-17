import React from 'react'

export const CoverThumbnail = ({image, locked}) => {
    return (
        <div className="cover-thumbnail">
            <img src={image} alt="" className="thumbnail-img"/>
            {!locked ? (
                <button className="play">
                <svg id="Play_Button" data-name="Play Button" xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41">
                    <circle id="Ellipse_6" data-name="Ellipse 6" cx="20.5" cy="20.5" r="20.5" fill="#83d522"/>
                    <path id="Icon_awesome-play" data-name="Icon awesome-play" d="M14.577,7.376,2.487.228A1.64,1.64,0,0,0,0,1.646V15.939a1.647,1.647,0,0,0,2.487,1.419l12.091-7.144A1.647,1.647,0,0,0,14.577,7.376Z" transform="translate(14.188 11.998)" fill="#fff"/>
                </svg>
            </button>
            ) : null}
            
        </div>
    )
}
