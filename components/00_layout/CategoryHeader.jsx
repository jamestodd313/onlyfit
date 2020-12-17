import React from 'react'

export const CategoryHeader = ({title, tagline, headerImage}) => {
    return (
        <div className="category-header">
            <div className="header-inner">
                <img src={headerImage} className="header-image"/>
                <div className="txt">
                    <h1>{title}</h1>
                    <span className="content-subhead">{tagline}</span>
                </div>
            </div>
        </div>
    )
}
