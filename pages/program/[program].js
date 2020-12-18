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
export default function program({prog, trainerProgs, similarProgs}){
    const [locked, setLocked] = useState(true)
    const {title, difficulty, categories, programLengthInDays, ratings, price, thumbnailImage, adSupported, uploadedBy} = prog
    return(
        <>
        <Head>
            <title>{prog.title.toUpperCase()} - OnlyFit</title>
        </Head>
        <Header variant="back" text="LOGO"/>
        <CoverThumbnail image={`${thumbnailImage}`} locked={locked}/>
        <PageTitle variant="program" title={title} difficulty={difficulty} category={categories.main} time={programLengthInDays} rating={ratings} uploadedBy={uploadedBy}/>
        {locked ? <Locked variant={"program"} trainerName={uploadedBy.displayName} subPrice={6} joinPrice={18} sku={'idfk'}/> : null}
        <PageDetails type="program" description="" equipment=""/>
        <HorizontalScroller title={`More From ${uploadedBy.displayName}`} content={trainerProgs}/>
        <VideoList title={`Similar To ${title}`} variant="infinite" content={similarProgs}/>
        <Spacer/>
        <Navbar/>
        </>
    )
}

program.getInitialProps = async(ctx)=> {
    const docId = ctx.query.program
    const progCall = await fetch(`https://onlyfit.vercel.app/api/_v2/content/programs?vid=${docId}`)
    const progData = await progCall.json()
    const prog = await progData.data[0]

    let {uploadedBy, categories} = prog

    const trainerCall = await fetch(`https://onlyfit.vercel.app/api/_v2/content/programs?user=${uploadedBy.handle}`)
    const trainerData = await trainerCall.json()
    const trainerProgs = await trainerData.data

    const similarCall = await fetch(`https://onlyfit.vercel.app/api/_v2/content/programs?category=${categories.main}`)
    const similarData = await similarCall.json()
    const similarProgs = await similarData.data
    return {prog, trainerProgs, similarProgs}
}