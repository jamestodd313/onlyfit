import {useState, useEffect} from 'react'
import Head from 'next/head'
import {useRouter} from 'next/router'
import {Header} from '../../../components/01_navigation/Header'
import {Spacer} from '../../../components/00_layout/Spacer'
import {Navbar} from '../../../components/01_navigation/Navbar'
import { TrainerInfo } from '../../../components/00_layout/TrainerInfo'
import { Filters } from '../../../components/00_layout/Filters'
import { VideoList } from '../../../components/00_layout/VideoList'

export default function programs({user, programs}){
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
    const [content, setContent] = useState(programs)
    
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
        if(str.length > 0) updateSortCall = await fetch(`/api/_v2/content/programs?user=${router.query.trainer}${str}&sort=${sortBy.toLowerCase()}`)
        else updateSortCall = await fetch(`/api/_v2/content/programs?user=${router.query.trainer}&sort=${sortBy.toLowerCase()}`)
        const updatedSortData = await updateSortCall.json()
        const updatedSort = await updatedSortData.data
        setContent(updatedSort)
    },[sortBy])
    useEffect(async()=>{
        setContent([])
        let str = getQueryString()
        // make new API call with queryString and sort
        const updateFiltersCall = await fetch(`/api/_v2/content/programs?user=${router.query.trainer}${str}&sort=${sortBy.toLowerCase()}`)
        const updatedContentData = await updateFiltersCall.json()
        const updatedContent = await updatedContentData.data
        // update content state
        setContent(updatedContent)
    },[filters])

    return (
        <>
            <Head>
                <title>{user[0].name}'s Programs - OnlyFit</title>
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

programs.getInitialProps = async (ctx) => {
    const {trainer, type} = ctx.query
    const userCall = await fetch(`https://onlyfit.vercel.app/api/_v2/users/${trainer}`)
    const userData = await userCall.json()
    const user = userData.data

    const progsCall = await fetch(`https://onlyfit.vercel.app/api/_v2/content/programs?user=${trainer}`)
    const progsData = await progsCall.json()
    const programs = await progsData.data
    return {user, programs}
}
