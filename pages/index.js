import Head from 'next/head'
import Image from 'next/image'
import Slider from '../component/Slider'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Poke-ke Bowl</title>
        <meta name="description" content="Best poke bowl" />
        <link rel="icon" href="/img/favicon.jpeg" />
      </Head>
      <Slider />
    </div>
  )
}
