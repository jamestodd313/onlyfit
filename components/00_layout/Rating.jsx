import React, { useEffect, useState } from 'react'

export const Rating = ({rating}) => {
    const [numOfStars, setNumOfStars] = useState([])
    useEffect(()=>{
        let arr = []
        for(let i = 0; i < rating; i++){
            arr.push('')
        }
        setNumOfStars(arr)
    },[rating])

    return (
        <div className="rating">
            {numOfStars.map(star=>{
                return (
                    <svg key={Math.random()} className="star" xmlns="http://www.w3.org/2000/svg" width="13.617" height="13.033" viewBox="0 0 13.617 13.033">
                        <path id="Icon_awesome-star" data-name="Icon awesome-star" d="M7.519.452,5.857,3.822l-3.719.542a.815.815,0,0,0-.451,1.39l2.69,2.622-.636,3.7a.814.814,0,0,0,1.181.858L8.25,11.188l3.327,1.749a.815.815,0,0,0,1.181-.858l-.636-3.7,2.69-2.622a.815.815,0,0,0-.451-1.39l-3.719-.542L8.98.452a.815.815,0,0,0-1.461,0Z" transform="translate(-1.441 0.001)" fill="#89fd00"/>
                    </svg>
                )
            })}
        </div>
    )
}