import axios from 'axios'
import Head from 'next/head'
import Pokes from '../component/Pokes'
import Slider from '../component/Slider'
import styles from '../styles/Home.module.css'

export default function Home({pokes}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Poke-ke Bowl</title>
        <meta name="description" content="Best poke bowl" />
        <link rel="icon" href="/img/favicon.jpeg" />
      </Head>
      <Slider />
      <Pokes pokes={pokes} />
    </div>
  )
}

export const getServerSideProps = async () => {
  const res = await axios.get('http://localhost:3000/api/pokes/')
  return {
    props: {
      pokes: res.data
    }
  }
}