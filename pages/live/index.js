import { CategoryHeader } from "../../components/00_layout/CategoryHeader";
import { Header } from "../../components/01_navigation/Header";
import { Navbar } from "../../components/01_navigation/Navbar";
import { Spacer } from "../../components/00_layout/Spacer";
import Head from 'next/head'
export default function index(){
    return (
        <>
            <Head>
                <title>Live Streams - OnlyFit</title>
            </Head>
            <Header text="OnlyFit"/>
            <CategoryHeader title="Live Streams" headerImage="/images/livestream@2x.png"/>
            <span className="message">
                No results
                <style jsx>{`
                    color: rgba(255,255,255,0.7);
                    margin-left: 16px;
                    @media screen and (min-width: 992px){
                        margin-left: 32px;
                    }
                `}</style>
            </span>
            <Spacer/>
            <Navbar activeLink="live"/>
        </>
    )
}
index.getInitalProps = async(ctx)=> {
    // const liveCall = await fetch('http://localhost:3000/api/_v2/content/live')
    // const liveData = await liveCall.json()
    // const lives = await liveData.data

    // return { content: lives}
}