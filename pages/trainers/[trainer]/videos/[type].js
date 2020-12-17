import {useState, useEffect} from 'react'
import Head from 'next/head'
import {useRouter} from 'next/router'
import {Header} from '../../../../components/01_navigation/Header'
import {Spacer} from '../../../../components/00_layout/Spacer'
import {Navbar} from '../../../../components/01_navigation/Navbar'
import { TrainerInfo } from '../../../../components/00_layout/TrainerInfo'
import { Filters } from '../../../../components/00_layout/Filters'
import { VideoList } from '../../../../components/00_layout/VideoList'

export default function type({vids, user, type}){
    const router = useRouter()
    let sortOptions = ["recent", "top rated", "view count"];
    let filterOptions = [
        {
            title: 'Category',
            options: ["mobility", "strength", "endurance"]
        },
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
        }
    ];
    const [filters, setFilters] = useState([])
    const [sortBy, setSortBy] = useState("Recent")
    const [content, setContent] = useState(vids)
    
    function getQueryString(){
        let queryString = ""
        // add chunks to queryString
        filters.forEach(filt=>{
            const filty = filt.toLowerCase()
            if( filty === "beginner" || filty === "intermediate" || filty === "advanced") queryString = `${queryString}&difficulty=${filty}`
            else if( filty === "strength" || filty === "mobility" || filty ==="endurance") queryString = `${queryString}&category=${filty}`
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
        if(str.length > 0) updateSortCall = await fetch(`http://localhost:3000/api/_v2/content/videos?user=${router.query.trainer}${str}&sort=${sortBy.toLowerCase()}`)
        else updateSortCall = await fetch(`http://localhost:3000/api/_v2/content/videos?user=${router.query.trainer}&sort=${sortBy.toLowerCase()}`)
        const updatedSortData = await updateSortCall.json()
        const updatedSort = await updatedSortData.data
        setContent(updatedSort)
    },[sortBy])
    useEffect(async()=>{
        setContent([])
        let str = getQueryString()
        // make new API call with queryString and sort
        const updateFiltersCall = await fetch(`http://localhost:3000/api/_v2/content/videos?user=${router.query.trainer}${str}&sort=${sortBy.toLowerCase()}`)
        const updatedContentData = await updateFiltersCall.json()
        const updatedContent = await updatedContentData.data
        // update content state
        setContent(updatedContent)
    },[filters])

    return (
        <>
            <Head>
                <title>{user[0].name}'s {type.charAt(0).toUpperCase() + type.slice(1)} Videos - OnlyFit</title>
            </Head>
            <Header variant="back" text="LOGO"/>
            <div className="info-wrap">
                <TrainerInfo trainer={user[0]}/>
            </div>
            <Filters sortOptions={sortOptions} filterOptions={filterOptions} filters={filters} setFilters={setFilters} sortBy={sortBy} setSortBy={setSortBy}/>
            <VideoList variant="infinite" content={content}/>
            <Spacer/>
            <Navbar/>
        </>
    )
}

type.getInitialProps = async (ctx) => {
    const {trainer, type} = ctx.query
    const userCall = await fetch(`http://localhost:3000/api/_v2/users/${trainer}`)
    const userData = await userCall.json()
    const user = userData.data

    const vidCall = await fetch(`http://localhost:3000/api/_v2/content/videos?user=${trainer}`)
    const vidData = await vidCall.json()
    const videos = await vidData.data

    let vids = {
        freeVids: [],
        premiumVids: [],
    }
    videos.forEach(video=>{
        if(video.adSupported) vids.freeVids.push(video)
        else vids.premiumVids.push(video)
    })

    if(type === "free"){
        return {vids: vids.freeVids, user, type}
    }else{
        return {vids: vids.premiumVids, user, type}
    }


    // if(type === "free"){
    //     const vidCall = await fetch(`http://localhost:3000/api/_v2/content/videos?user=${trainer}`)
    //     const vidData = await vidCall.json()
    //     const free = await vidData.data.freeVids
    // }





}
