import Head from 'next/head'
import '../styles/main.css'
function MyApp({ Component, pageProps }) {
  return <>
          <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Roboto:ital,wght@0,400;1,500&display=swap" rel="stylesheet"/>
          </Head>
          <Component {...pageProps} />
        </>
}

export default MyApp
