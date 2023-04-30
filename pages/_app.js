import '@/styles/globals.css'
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return <>
    <Head>
      <title>Home Page</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <Head>
    <meta name="viewport" content="viewport-fit=cover" />
    </Head>
    <Component {...pageProps} />
  </>
}