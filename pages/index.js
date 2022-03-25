import { useUser } from '@auth0/nextjs-auth0'
import axios from 'axios'
import Head from 'next/head'
import { useState } from 'react'
import Add from '../component/Add'
import AddNew from '../component/Addnew'
import Pokes from '../component/Pokes'
import Slider from '../component/Slider'
import styles from '../styles/Home.module.css'

export default function Home({pokes}) {
  const [close, setClose] = useState(true)

  const {user} = useUser()
  let admin = false
  if(user && user.email === `${process.env.NEXT_PUBLIC_ADMIN}`) {
    admin = true
  }
  console.log(user)
  return (
    <div className={styles.container}>
      <Head>
        <title>Poke-ke Bowl</title>
        <meta name="description" content="Best poke bowl" />
        <link rel="icon" href="/img/logo2.png" />
      </Head>
      <Slider />
      {admin && <button><AddNew setClose={setClose}/></button>}
      <Pokes pokes={pokes} />
      {!close && <Add setClose={setClose} />}
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