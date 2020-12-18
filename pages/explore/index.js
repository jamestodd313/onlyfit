import {Header} from '../../components/01_navigation/Header'
import {CoverSlider} from '../../components/00_layout/CoverSlider'
import {HorizontalScroller} from '../../components/00_layout/HorizontalScroller'
import {VideoList} from '../../components/00_layout/VideoList'
import {Navbar} from '../../components/01_navigation/Navbar'
import {Spacer} from '../../components/00_layout/Spacer'
import Head from 'next/head'
export default function explore({featured, videos}){
    let categories = [
        {
            title: "Mobility",
            image: "/images/mobility-cat@2x.png",
            link: "/explore/mobility"
        },
        {
            title: "Strength",
            image: "/images/strength-cat@2x.png",
            link: "/explore/strength"
        },
        {
            title: "Endurance",
            image: "images/endurance-cat@2x.png",
            link: "/explore/endurance"
        },
        {
            title: "Warm Up",
            image: "images/warmup-cat@2x.png",
            link: "/explore/warmup"
        },
        {
            title: "Cool Down",
            image: "images/cooldown-cat@2x.png",
            link: "/explore/cooldown"
        },
        {
            title: "No Equipment",
            image: "/images/noequip-cat@2x.png",
            link: "/explore/no-equipment"
        },
        {
            title: "APT Friendly",
            image: "/images/aptfriendly-cat@2x.png",
            link: "/explore/apartment-friendly"
        },
        {
            title: "Dance",
            image: "/images/dance-cat@2x.png",
            link: "/explore/dance"
        },
        {
            title: "Under 20 Mins",
            image: "/images/20min-cat@2x.png",
            link: "/explore/under-20-mins"
        },
        {
            title: "Full Body",
            image: "/images/fullbody-cat@2x.png",
            link: "/explore/full-body"
        },
        {
            title: "Upper Body",
            image: "/images/upperbody-cat@2x.png",
            link: "/explore/upper-body"
        },
        {
            title: "Lower Body",
            image: "/images/lowerbody-cat@2x.png",
            link: "/explore/lower-body"
        },
        {
            title: "Core",
            image: "/images/core-cat@2x.png",
            link: "/explore/core"
        },
    ]
    return (
        <>
            <Head>
                <title>Explore - OnlyFit</title>
            </Head>
            <Header text="LOGO"/>
            <CoverSlider content={featured}/>
            <HorizontalScroller title="Categories" content={categories} variant="categories"/>
            <VideoList variant="preview" title="trending" buttonText="See More" buttonClick={e=> console.log('clicked')} buttonColor="dark" content={videos}/>
            <VideoList variant="infinite" title="For you" content={videos}/>
            <Spacer/>
            <Navbar activeLink="explore"/>
        </>
    )
}
explore.getInitialProps = async (ctx)=> {
    let featured = []
    const vidCall = await fetch('https://onlyfit.vercel.app/api/_v2/content/videos')
    const vidData = await vidCall.json()
    const videos = vidData.data
    videos.forEach(vid=>{
        if(vid.featured) featured.push(vid)
    })
    return {featured, videos}
}