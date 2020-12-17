import React, { useEffect, useState } from 'react'
import { MiniCard } from '../02_cards/MiniCard'

export const HorizontalScroller = ({title, content, variant}) => { 
    return (
        <div className="hr-scroll-wrap">
            <h2>{title}</h2>
            <div className="hr-scroller">
                {content.map(card=>{
                    return <MiniCard key={Math.random() * Math.random()} variant={variant} card={card}/>
                })}
            </div>
        </div>
    )
}
