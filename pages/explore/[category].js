import { useRouter } from "next/router"
import Head from 'next/head'
import { useEffect, useState } from "react"
import {Header} from '../../components/01_navigation/Header'
import { CategoryHeader } from "../../components/00_layout/CategoryHeader"
import { Spacer } from "../../components/00_layout/Spacer"
import { Navbar } from "../../components/01_navigation/Navbar"
import { Filters } from "../../components/00_layout/Filters"
import { VideoList } from "../../components/00_layout/VideoList"
export default function category({cat, vids}){
    const router = useRouter()
    let sortOptions = ["recent", "top rated", "view count"];
    let filterOptions = [

        {
            title: 'Length',
            options: ["< 10 Mins", "< 30 Mins", "> 60 Mins"]
        },
        {
            title: 'Difficulty',
            options: ["beginner", "intermediate", "advanced"]
        },
        {
            title: 'Rating',
            options: [1, 2, 3, 4, 5]
        },
        {
            title: 'Price',
            options: ["free", "premium"]
        }
    ];
    const [filters, setFilters] = useState([])
    const [sortBy, setSortBy] = useState("Recent")
    const [content, setContent] = useState([])
    function getQueryString(){
        let queryString = ""
        // add chunks to queryString
        filters.forEach(filt=>{
            const filty = filt.toLowerCase()
            if( filty === "beginner" || filty === "intermediate" || filty === "advanced") queryString = `${queryString}&difficulty=${filty}`
            else if( filty === "< 10 mins") queryString = `${queryString}&length=under10`
            else if( filty === "< 30 mins") queryString = `${queryString}&length=under30`
            else if( filty === "> 60 mins") queryString = `${queryString}&length=over60`
            else if( filty.includes("star")){
                let newFilty
                if(filty.includes("stars")) newFilty = filty.substring(0, filty.length - 6)
                else if(filty.includes("star")) newFilty = filty.substring(0, filty.length - 5)
                queryString = `${queryString}&rating=${newFilty}`
            }
            else if(filty === "free" || filty === "premium") queryString = `${queryString}&price=${filty}`
        })
        return queryString
    }

    useEffect(async()=>{
        setContent([])
        let str = getQueryString()
        let updateSortCall = ""
        if(str.length > 0) updateSortCall = await fetch(`/api/_v2/content/videos?category=${router.query.category}${str}&sort=${sortBy.toLowerCase()}`)
        else updateSortCall = await fetch(`/api/_v2/content/videos?category=${router.query.category}&sort=${sortBy.toLowerCase()}`)
        const updatedSortData = await updateSortCall.json()
        const updatedSort = await updatedSortData.data
        setContent(updatedSort)
    },[sortBy])
    useEffect(async()=>{
        setContent([])
        let str = getQueryString()
        // make new API call with queryString and sort
        const updateFiltersCall = await fetch(`/api/_v2/content/videos?category=${router.query.category}${str}&sort=${sortBy}`)
        const updatedContentData = await updateFiltersCall.json()
        const updatedContent = await updatedContentData.data
        // update content state
        setContent(updatedContent)
    },[filters])

    return(
        <>
            <Head>
                <title>Explore {cat.title.charAt(0).toUpperCase() + cat.title.slice(1)} Videos - OnlyFit</title>
            </Head>
            <Header text="LOGO" variant="back"/>
            <CategoryHeader title={cat.title} tagline={cat.tagline} headerImage={cat.imageUrl}/>
            <Filters filterOptions={filterOptions} sortOptions={sortOptions} filters={filters} setFilters={setFilters} sortBy={sortBy} setSortBy={setSortBy}/>
            <VideoList variant="infinite" content={content}/>
            <Spacer/>
            <Navbar activeLink="explore"/>
        </>
    )
}
category.getInitialProps = async(ctx)=> {
    let cat = ctx.asPath.slice(9)

    const vidsCall = await fetch(`https://onlyfit.vercel.app/api/_v2/content/videos?category=${cat}`, {mode: "cors"})
    const vidsData = await vidsCall.json()
    const vids = await vidsData.data

    const catCall = await fetch(`https://onlyfit.vercel.app/api/_v2/interface/categories?category=${cat}`, {mode: "cors"})
    const catData = await catCall.json()
    cat = catData.data[0]
    return {cat, vids}
}