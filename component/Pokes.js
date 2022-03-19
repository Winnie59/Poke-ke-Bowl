import React from 'react'
import styles from '../styles/Pokes.module.css'
import Poke from './Poke'

const Pokes = () => {
  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <Poke />
            <Poke />
            <Poke />
            <Poke />
            <Poke />
            <Poke />
        </div>
    </div>
  )
}

export default Pokes