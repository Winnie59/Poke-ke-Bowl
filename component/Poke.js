import React from 'react'
import styles from '../styles/Poke.module.css'
import Image from 'next/image'

const Poke = ({poke}) => {
  return (
    <div className={styles.container}>
        <Image src={poke.img} alt='aloha' width='500' height='500' />
        <h3 className={styles.title}>{poke.name}</h3>
        <h3 className={styles.price}>{poke.price[0]}</h3>
    </div>
  )
}

export default Poke