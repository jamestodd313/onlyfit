import {useState } from "react";
import { HorizontalScroller } from "../../components/00_layout/HorizontalScroller";
import { PageDetails } from "../../components/00_layout/PageDetails";
import { PageTitle } from "../../components/00_layout/PageTitle";
import { Spacer } from "../../components/00_layout/Spacer";
import { Header } from "../../components/01_navigation/Header";
import { Navbar } from "../../components/01_navigation/Navbar";
import { CoverThumbnail } from "../../components/03_media/CoverThumbnail";
import { VideoList } from "../../components/00_layout/VideoList";
import { Locked } from "../../components/00_layout/Locked";
import Head from 'next/head'
export default function video({vid, trainerVids, similarVids}){
    const [locked, setLocked] = useState(undefined)
    const {title, difficulty, categories, time, ratings, price, thumbnailImage, adSupported, uploadedBy} = vid

    return(
        <>
        <Head>
            <title>{vid.title.toUpperCase()} - OnlyFit</title>
        </Head>
        <Header variant="back" text="LOGO"/>
        <CoverThumbnail image={`${thumbnailImage}`}/>
        <PageTitle title={title} difficulty={difficulty} category={categories.main} time={time} rating={ratings} uploadedBy={uploadedBy}/>
        {locked ? <Locked variant={"video"} trainerName={uploadedBy.displayName} subPrice={6} joinPrice={18} sku={'idfk'}/> : null}
        <PageDetails type="video" description="" equipment=""/>
        <HorizontalScroller title={`More From ${uploadedBy.displayName}`} content={trainerVids}/>
        <VideoList title={`Similar To ${title}`} variant="infinite" content={similarVids}/>
        <Spacer/>
        <Navbar/>
        </>
    )
}

video.getInitialProps = async(ctx)=> {
    const vidId = ctx.query.video
    const apiCall = await fetch(`http://localhost:3000/api/_v2/content/videos?vid=${vidId}`)
    const vidData = await apiCall.json()
    const vid = await vidData.data[0]

    let {uploadedBy, categories} = vid

    const trainerCall = await fetch(`http://localhost:3000/api/_v2/content/videos?user=${uploadedBy.handle}`)
    const trainerData = await trainerCall.json()
    const trainerVids = await trainerData.data

    const similarCall = await fetch(`http://localhost:3000/api/_v2/content/videos?category=${categories.main}`)
    const similarData = await similarCall.json()
    const similarVids = await similarData.data
    return {vid, trainerVids, similarVids}
}