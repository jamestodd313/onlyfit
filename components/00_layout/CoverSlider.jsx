import { useState, useEffect } from 'react'
import { Indicators } from '../01_navigation/Indicators'
import {CoverCard} from '../02_cards/CoverCard'

export const CoverSlider = ({content}) => {
    const [slide, setSlide] = useState(0)
    useEffect(()=>{
        clearTimeout()
        const slideTimer = setTimeout(()=>{
            if(slide === content.length - 1) setSlide(0)
            else setSlide(slide + 1)
        },5000)
        return()=>{
            clearTimeout(slideTimer)
        }
    },[slide])
    return (
        <section className="cover-slider">
            {content.length > 0 ? <CoverCard content={content[slide]}/> : null}
            <Indicators slide={slide} setSlide={setSlide} content={content}/>
        </section>
    )
}
