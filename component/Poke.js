import React from 'react'
import styles from '../styles/Poke.module.css'
import Image from 'next/image'

const Poke = () => {
  return (
    <div className={styles.container}>
        <Image src='/img/aloha.png' alt='aloha' width='500' height='500' />
        <h3 className={styles.title}>Aloha Poke</h3>
        <h3 className={styles.price}>$12.99</h3>
    </div>
  )
}

export default Poke