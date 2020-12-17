import { Spacer } from "../../components/00_layout/Spacer";
import { Header } from "../../components/01_navigation/Header";
import { Navbar } from "../../components/01_navigation/Navbar";
import { SettingsMenu } from "../../components/01_navigation/SettingsMenu";
import Head from 'next/head'
export default function index(){
    return (
        <>
            <Head>
                <title>Settings - OnlyFit</title>
            </Head>
            <Header text="LOGO"/>
            <h1>SETTINGS</h1>
            <SettingsMenu/>
            <Navbar activeLink="account"/>
            <Spacer/>
            <style jsx>{`
                h1{
                    margin: 80px 0px 32px 0px;
                    text-align: center;
                }
            `}</style>
        </>
    )
}