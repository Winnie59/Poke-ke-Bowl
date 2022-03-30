import React from 'react'
import styles from '../styles/Pokes.module.css'
import Poke from './Poke'

const Pokes = ({pokes}) => {
  return (
    <div className={styles.container} id='menu'>
        <div className={styles.wrapper}>
          {pokes.map((poke) => (
            <Poke key={poke._id} poke={poke}/>
          ))}
        </div>
    </div>
  )
}

export default Pokes