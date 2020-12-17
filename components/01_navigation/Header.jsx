import Link from 'next/link'
import {useRouter} from 'next/router'
import React, { useEffect, useState } from 'react'

export const Header = ({variant, text}) => {
    const router = useRouter()
    const [headerMarkup, setHeaderMarkup] = useState(null)
    function goBack(){
        router.back()
    }
    return (
        <>
        <header>
            { variant === 'back' ? (
                <button className="back-btn" onClick={goBack}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20.243" height="13.501" viewBox="0 0 20.243 13.501">
                    <path id="Back" d="M15.216,11.51a.919.919,0,0,1,.007,1.294l-4.268,4.282H27.218a.914.914,0,0,1,0,1.828H10.955L15.23,23.2a.925.925,0,0,1-.007,1.294.91.91,0,0,1-1.287-.007L8.142,18.647h0a1.026,1.026,0,0,1-.19-.288.872.872,0,0,1-.07-.352.916.916,0,0,1,.26-.64l5.794-5.836A.9.9,0,0,1,15.216,11.51Z" transform="translate(-7.882 -11.252)" fill="#fff"/>
                </svg>
                </button>
            ) : null}
            <Link href="/">
                <a className="logo">{text === "LOGO" ? "OnlyFit" : text}</a>
            </Link>
        </header>
        </>
    )
}
