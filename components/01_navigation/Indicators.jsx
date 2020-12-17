import React, { useEffect } from 'react'

export const Indicators = ({slide, setSlide, content}) => {
    useEffect(()=>{
        const indics = document.querySelectorAll('.indicator')
        let currentActive = document.querySelectorAll('.indicator.active')[0]
        if(currentActive){
            currentActive.classList.remove('active')
        }
        indics[slide].classList.add('active')
    },[slide])
    
    function handleClick(){
        clearTimeout()
        if(slide === 0) setSlide(1)
        else if(slide === content.length - 1) setSlide(0)
        else setSlide(slide + 1)
        setTimeout(()=>{
            if(slide === content.length - 1) setSlide(0)
            else setSlide(slide + 1)
        },7500)
    }
    return (
        <nav className="indicators">
            {content.map(slide=>{
                return <button key={Math.random()} className="indicator" onClick={handleClick}></button>
            })}
        </nav>
    )
}
