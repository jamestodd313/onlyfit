import React from 'react'

export const Locked = ({variant, trainerName, subPrice, joinPrice, sku}) => {
    return (
        <div className="locked-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="54.35" height="59.5" viewBox="0 0 54.35 59.5">
                <g id="Icon_feather-lock" data-name="Icon feather-lock" transform="translate(256.5 26)">
                    <path id="Path_5" data-name="Path 5" d="M9.65,16.5H45.7a5.15,5.15,0,0,1,5.15,5.15V39.675a5.15,5.15,0,0,1-5.15,5.15H9.65a5.15,5.15,0,0,1-5.15-5.15V21.65A5.15,5.15,0,0,1,9.65,16.5Z" transform="translate(-257 -15.325)" fill="none" stroke="#C4C4C4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8"/>
                    <path id="Path_6" data-name="Path 6" d="M10.5,26.175v-10.3a12.875,12.875,0,1,1,25.75,0v10.3" transform="translate(-252.7 -25)" fill="none" stroke="#C4C4C4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8"/>
                </g>
            </svg>
            { variant === "program" ? (
                <span className="lock-txt">Unlock this content by joining the program or subscribing to {trainerName}'s channel</span>
            ) : (
                <span className="lock-txt">Unlock this content and more by subscribing to {trainerName}'s channel</span>
            )}
            <div className="btns">
                {variant === "program" ? <button>Join for ${joinPrice}</button>  : null}
                <button>Subscribe for ${subPrice} / mo</button>
            </div>
        </div>
    )
}
