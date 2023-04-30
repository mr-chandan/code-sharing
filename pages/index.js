import { Navbar } from '@/Components/Navbar'
import { Homgrid } from '@/Components/Homgrid'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />
      <Homgrid />
    </>
  )
}
