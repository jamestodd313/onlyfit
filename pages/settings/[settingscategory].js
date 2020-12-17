import { useEffect, useState } from "react";
import { Spacer } from "../../components/00_layout/Spacer";
import { Header } from "../../components/01_navigation/Header";
import { Navbar } from "../../components/01_navigation/Navbar";
import { PaymentMethods } from "../../components/04_forms/PaymentMethods";
import { PersonalInformation } from "../../components/04_forms/PersonalInformation";
import { Privacy } from "../../components/04_forms/Privacy";
import { Subscriptions } from "../../components/04_forms/Subscriptions";
import Head from 'next/head'
export default function settingscategory(quer){
    const [title, setTitle] = useState('Settings')
    useEffect(()=>{
        let newQuer = quer.quer.replace('-', " ")
        setTitle(newQuer)
    }, [quer])
    return (
        <>
            <Head>
                <title>{title.charAt(0).toUpperCase() + title.slice(1)} - OnlyFit</title>
            </Head>
            <Header text={title} variant="back"/>
            <Navbar activeLink="account"/>
            <div className="settings-form-container">
                { title === "personal information" ?  <PersonalInformation/> : title === "privacy" ? <Privacy/> : title === "payment methods" ? <PaymentMethods/> : title === "subscriptions" ? <Subscriptions/> : "lol wut"}
            </div>
            <Spacer/>
            <style jsx>{`
                h1{
                    margin: 80px 0px 32px 0px;
                    text-align: center;
                    text-transform: uppercase;
                    font-size: 32px;
                }
                .settings-form-container{
                    padding-top: 100px;
                    display: grid;
                    place-content: center;
                }
            `}</style>
        </>
    )
}
settingscategory.getInitialProps = async(ctx)=> {
    return {quer: ctx.query.settingscategory}
}