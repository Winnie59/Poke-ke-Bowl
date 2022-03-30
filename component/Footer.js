import React from 'react'
import styles from '../styles/Footer.module.css'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className={styles.container} id='contact'>
      <div className={styles.item}>
        <Image src="/img/bg.png" objectFit="cover" layout="fill" alt="" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
            " POKE-KE BOWL FRESH EVERY BITES "
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>FIND OUR RESTAURANT</h1>
          <p className={styles.text}>
          121 Harvard Avenue,
            <br /> Allston, MA 02134
          <p className={styles.text}>
            MONDAY - SUNDAY
            <br /> 12:00 – 22:00
          </p>
            <br />
          </p>
          <h1 className={styles.title}>CONTACT US</h1>
          <p className={styles.text}> (559) 691-9294</p> 
       
          
    
        </div>
        <div className={styles.card}>
        < Link href='https://www.google.com/maps/dir//121+Harvard+Ave,+Allston,+MA+02134/@42.3524172,-71.1343685,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x89e379c5901d9357:0x8f1154fd5b4e28a8!2m2!1d-71.1321798!2d42.3524172'  passHref >
          <a target='_blank'>
            <Image className={styles.map} src='/img/map.png'objectFit="contain" width={300} height={300} alt="" />
          </a>
        </Link>
        </div>
      </div>
    </div>
  )
}

export default Footer