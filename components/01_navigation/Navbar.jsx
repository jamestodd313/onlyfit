import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export const Navbar = ({activeLink}) => {
    const [active, setActive] = useState(activeLink)
    return (
        <nav>
            <Link href="/">
                <a className={active === "home" ? "nav-link active" : "nav-link"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="33" viewBox="0 0 30 33">
                        <g id="Icon_feather-home" data-name="Icon feather-home" transform="translate(-3 -1.5)">
                            <path id="Path_3" data-name="Path 3" d="M4.5,13.5,18,3,31.5,13.5V30a3,3,0,0,1-3,3H7.5a3,3,0,0,1-3-3Z" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                            <path id="Path_4" data-name="Path 4" d="M13.5,33V18h9V33" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                        </g>
                    </svg>
                </a>
            </Link>
            <Link href="/explore">
                <a href="#" className={active === "explore" ? "nav-link active" : "nav-link"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33">
                        <g id="Icon_feather-compass" data-name="Icon feather-compass" transform="translate(-1.5 -1.5)">
                            <path id="Path_1" data-name="Path 1" d="M33,18A15,15,0,1,1,18,3,15,15,0,0,1,33,18Z" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                            <path id="Path_2" data-name="Path 2" d="M24.36,11.64l-3.18,9.54-9.54,3.18,3.18-9.54Z" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                        </g>
                    </svg>
                </a>
            </Link>
            <Link href="/live">
                <a href="#" className={active === "live" ? "nav-link active" : "nav-link"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32.146" height="29.224" viewBox="0 0 32.146 29.224">
                    <path id="Icon_material-live-tv" data-name="Icon material-live-tv" d="M30.724,8.845H19.633l4.807-4.807L23.418,3,17.573,8.845,11.728,3,10.691,4.037l4.822,4.807H4.422A2.922,2.922,0,0,0,1.5,11.767V29.3a2.931,2.931,0,0,0,2.922,2.922h26.3A2.931,2.931,0,0,0,33.646,29.3V11.767A2.922,2.922,0,0,0,30.724,8.845Zm0,20.457H4.422V11.767h26.3ZM13.19,14.69v11.69l10.228-5.845Z" transform="translate(-1.5 -3)"/>
                    </svg>
                </a>
            </Link>
            <Link href="/settings">
                <a href="#" className={active === "account" ? "nav-link active" : "nav-link"}>
                    <img src="/images/default-img.png" className="user-img"/>
                </a>
            </Link>
        </nav>
    )
}
