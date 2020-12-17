import { useEffect, useState } from 'react'
import Link from 'next/link'
export const MiniCard = ({variant, card}) => {
    const [link, setLink] = useState('/')
    useEffect(()=>{
        if(variant !== "categories") setLink(`/${card.type}/${card.id}`)
        else setLink(card.link)
    },[])
    return (
        <Link href={link}>
            <div className={variant !== "categories" ? "mini-card" : "mini-card cat-card"}>
                <img className="thumbnail-img" src={variant === "categories" ? card.image : card.thumbnailImage}/>
                {variant === "categories" ? <div className="gradient-filter"/> : null }
                <span className="title">{card.title.toUpperCase()}</span>
            </div>
        </Link>
    )
}
