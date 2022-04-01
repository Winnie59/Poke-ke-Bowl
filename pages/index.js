import { useUser } from '@auth0/nextjs-auth0'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Add from '../component/Add'
import AddNew from '../component/Addnew'
import Pokes from '../component/Pokes'
import Slider from '../component/Slider'
import styles from '../styles/Home.module.css'

export default function Home({pokes}) {
  const [close, setClose] = useState(true)
  const router = useRouter()
  const {user} = useUser()
  let admin = false
  if(user && user.email === `${process.env.NEXT_PUBLIC_ADMIN}`) {
    admin = true
  }
  
  // Call this function whenever you want to
  // refresh props!
  const refreshData = () => {
    router.replace(router.asPath)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Poke-ke Bowl</title>
        <meta name="description" content="Best poke bowl" />
        <link rel="icon" href="/img/logo2.png" />
        {/* <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@200;600&display=swap" rel="stylesheet"/> */}
      </Head>
      <Slider />
      {admin && <AddNew setClose={setClose}/>}
      <Pokes pokes={pokes} />
      {!close && <Add setClose={setClose} pokes={pokes} refreshData={refreshData} />}
    </div>
  )
}

export const getServerSideProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}api/pokes/`)
  return {
    props: {
      pokes: res.data
    }
  }
}