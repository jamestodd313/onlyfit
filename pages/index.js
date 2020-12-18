import Head from 'next/head'
import axios from 'axios'
import { CoverSlider } from '../components/00_layout/CoverSlider'
import { VideoList } from '../components/00_layout/VideoList'
import {Header} from '../components/01_navigation/Header'
import {Spacer} from '../components/00_layout/Spacer'
import { Navbar } from '../components/01_navigation/Navbar'
import { useEffect, useState } from 'react'


export default function Home({newsFeed, featured}) {
  return (
    <>
      <Head>
        <title>Home - OnlyFit</title>
      </Head>
      <Header variant="logo" text="LOGO"/>
      <CoverSlider content={featured}/>
      <VideoList title="news feed" variant="infinite" content={newsFeed}/>
      <Spacer/>
      <Navbar activeLink="home"/>
    </>
  )
}

Home.getInitialProps = async()=> {
  const featCall = await fetch('https://onlyfit.vercel.app/api/_v2/interface/featured', {mode: "no-cors"})
  const featData = await featCall.json()
  const featured = await featData.data

  const nfCall = await fetch('https://onlyfit.vercel.app/api/_v2/content/videos', {mode: "no-cors"})
  const nfData = await nfCall.json()
  const newsFeed = await nfData.data

  return { newsFeed, featured }
}
