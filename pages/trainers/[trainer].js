import {Header} from '../../components/01_navigation/Header'
import {Navbar} from '../../components/01_navigation/Navbar'
import {CoverThumbnail} from '../../components/03_media/CoverThumbnail'
import {TrainerInfo} from '../../components/00_layout/TrainerInfo'
import {Spacer} from '../../components/00_layout/Spacer'
import { VideoList } from '../../components/00_layout/VideoList'
import { useEffect, useState } from 'react'
import Head from 'next/head'
export default function trainer({user, vids}){
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        if(user.imageUrl !== undefined) setLoading(false)
    },[user])
    return (
        <>
            <Head>
                <title>{user.name.charAt(0).toUpperCase() + user.name.slice(1)} - OnlyFit</title>
            </Head>
            <Header variant="back" text="LOGO"/>
            {loading ? null : (
                <>
                    <CoverThumbnail image={user.imageUrl}/>
                    <TrainerInfo trainer={user}/>
                    <VideoList title={`Premium (${vids.premiumVids.length})`} content={vids.premiumVids} variant="preview" buttonText="Subscribe for $6" buttonColor="light" buttonClick={e=> window.location.href="/videos/premium"} locked={true}/>
                    <VideoList title={`Free (${vids.freeVids.length})`} content={vids.freeVids} variant="preview" buttonText="See All" buttonColor="dark" buttonClick={e=> window.location.href=`./${user.handle}/videos/free`} locked={false}/>
                    <VideoList title={`Programs (${vids.programs.length})`} content={vids.programs} variant="preview" buttonText="Subscribe for $6" buttonColor="light" buttonClick={e=> window.location.href=`./${user.handle}/programs`} locked={true}/>
                    <Spacer/>
                </>
            )}
            <Navbar/>
        </>
    )
}

trainer.getInitialProps = async(ctx)=>{
    let handle = ctx.query.trainer
    const userCall = await fetch(`https://onlyfit.vercel.app/api/_v2/users/${handle}`)
    const userData = await userCall.json()
    const user = userData.data[0]
//----------------//
    const vidsCall = await fetch(`https://onlyfit.vercel.app/api/_v2/content/videos?user=${handle}`)
    const vidsData = await vidsCall.json()
    const videos = vidsData.data
    let vids = {
        freeVids: [],
        premiumVids: [],
        programs: []
    }
    videos.forEach(video=>{
        if(video.adSupported) vids.freeVids.push(video)
        else vids.premiumVids.push(video)
    })
//----------------//
    const programsCall = await fetch(`https://onlyfit.vercel.app/api/_v2/content/programs?user=${handle}`)
    const programsData = await programsCall.json()
    const progs = await programsData.data
    vids.programs = [...progs]


    return {user, vids}
}