import React from 'react'
import styles from "../styles/Navbar.module.css"
import Image from 'next/image'
import { useSelector } from 'react-redux'
import Link from 'next/link'

const Navbar = () => {
  const quantity = useSelector(state => state.cart.quantity)

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.logo}>
          <Image src='/img/logo.png' alt='logo' width='80' height='80' />
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <li className={styles.listItem}>Menu</li>
          <li className={styles.listItem}>Pick Your Poke</li>
          <li className={styles.listItem}>About</li>
          <li className={styles.listItem}>Contact</li>
        </ul>
      </div>
      <Link href='/cart' passHref>
        <div className={styles.item}>
          <div className={styles.cart}>
              <Image src="/img/cart.png" alt="" width="55px" height="55px" />
              <div className={styles.counter}>{quantity}</div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Navbar