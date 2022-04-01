import React, { useEffect, useRef } from 'react'
import styles from '../styles/Navbar.module.css'
import { init } from 'ityped'

const Socialbar = () => {

  const textRef = useRef()

  useEffect(()=> {
    init(textRef.current, { 
      showCursor: false,
      backDelay: 1500, 
      backSpeed: 50,
      strings: ['FREE DELIVERY AT $35', 'ONLINE $5 OFF', 'ORDER NOW!!' ] 
    })
  },[])

  return (
    <div className={styles.socialCall}>
        <div className={styles.social}>
        
        </div>
        <div className={styles.phone}>
            <span className={styles.call}>Call (559)-691-9294</span>
            <span ref={textRef}></span>
        </div>
    </div>
  )
}

export default Socialbar