import { useUser } from '@auth0/nextjs-auth0'
import axios from 'axios'
import Head from 'next/head'
import Pokes from '../component/Pokes'
import Slider from '../component/Slider'
import styles from '../styles/Home.module.css'

export default function Home({pokes}) {
  const {user} = useUser()
  console.log(user)

  return (
    <div className={styles.container}>
      <Head>
        <title>Poke-ke Bowl</title>
        <meta name="description" content="Best poke bowl" />
        <link rel="icon" href="/img/logo2.png" />
      </Head>
      <Slider />
      <Pokes pokes={pokes} />
    </div>
  )
}

export const getServerSideProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/pokes/`)
  return {
    props: {
      pokes: res.data
    }
  }
}