import React, { useEffect, useState } from 'react'
import { VideoCard } from '../02_cards/VideoCard'

export const VideoList = ({title, content, variant, buttonText, buttonClick, buttonColor, locked}) => {
    function loadMoreResults(){
        const {scrollTop, scrollHeight, clientHeight} = document.documentElement
        if(clientHeight + scrollTop >= scrollHeight){
            const loader = document.querySelectorAll('div.loader')[0]
            if(loader){
                loader.classList.remove('no-more')
                loader.classList.add('loading')
                // [THIS TIMEOUT IS JUST TO SIMULATE MAKING API CALL. REMOVE THIS WHEN YOU CONNECT BACKEND]
                setTimeout(()=>{
                    // make api call
                    // hide loader
                    loader.classList.remove('loading')
                    // if there are no results show message
                    loader.classList.add('no-more')
                    //  else render next results
                }, 1000)
            }
        }
    }
    useEffect(()=>{
        if(variant !== "infinite") return
        else{
            window.addEventListener('scroll', loadMoreResults)
        }
        return ()=>{
            window.removeEventListener('scroll', loadMoreResults)
        }
    },[])
    useEffect(()=>{
        if(variant === "preview" && content.length > 6){
            content = content.slice(0, 7)
        }
    },[variant])
    
    return (
        <section className="video-list">
            <h2>{title}</h2>
            { content.length > 0 ?
                variant === 'infinite' ? (
                <>
                <div className="list">
                    {content.map(video=>{
                        return <VideoCard key={video._id} video={video}/>
                    })}
                </div>
                <div className="loader">
                    <span className="end-txt">Showing All Results</span>
                    <div className="animation">
                        <div className="dot"/>
                        <div className="dot"/>
                        <div className="dot"/>
                    </div>
                </div>
                </>
            ) : (
                <>
                <div className="list mini-list">
                    {content.map(card=>{
                        return <VideoCard key={Math.random()} video={card}/>
                    })}
                    {locked ? (
                        <div className="paywall">
                            <svg className="lock-icon" xmlns="http://www.w3.org/2000/svg" width="54.35" height="59.5" viewBox="0 0 54.35 59.5">
                                <g id="Icon_feather-lock" data-name="Icon feather-lock" transform="translate(256.5 26)">
                                    <path id="Path_5" data-name="Path 5" d="M9.65,16.5H45.7a5.15,5.15,0,0,1,5.15,5.15V39.675a5.15,5.15,0,0,1-5.15,5.15H9.65a5.15,5.15,0,0,1-5.15-5.15V21.65A5.15,5.15,0,0,1,9.65,16.5Z" transform="translate(-257 -15.325)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8"/>
                                    <path id="Path_6" data-name="Path 6" d="M10.5,26.175v-10.3a12.875,12.875,0,1,1,25.75,0v10.3" transform="translate(-252.7 -25)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8"/>
                                </g>
                            </svg>
                            <p className="lock-msg">Unlock this content and more by subscribing to Trainer Name's channel for just $6 / month</p>
                        </div>
                    ) : null}
                    
                </div>
                <button className={buttonColor} onClick={buttonClick}>{buttonText}</button>
                </>
            ) : <span className="no-res">Nothing to show</span>
            
            }
            
        </section>
    )
}
