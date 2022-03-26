import React from 'react'
import styles from "../styles/Navbar.module.css"
import Image from 'next/image'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0'

const Navbar = () => {
  const {user} = useUser()
  const quantity = useSelector(state => state.cart.quantity)

  let admin = false
  if(user && user.email === `${process.env.NEXT_PUBLIC_ADMIN}`) {
    admin = true
  }

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.logo}>
          <Link href='/' passHref>
            <Image src='/img/logo.png' alt='logo' width='80' height='80' />
          </Link>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
        {/* <Link href='/' passHref>
          <li className={styles.listItem}>Home</li>
        </Link> */}
          <li className={styles.listItem}>Menu</li>
          <li className={styles.listItem}>Pick Poke</li>
          <li className={styles.listItem}>About</li>
          <li className={styles.listItem}>Contact</li>
          { !user ?
            <Link href='/api/auth/login' passHref>
            <li className={styles.listItem}>Login</li>
            </Link> 
            :
            <Link href='/api/auth/logout' passHref >
            <li className={styles.listItem}>Logout</li>
            </Link>
          }      
        </ul>
      </div>
        <div className={styles.item}>
          { (user && admin) && 
              <li className={styles.username}>Admin {user.name}</li> 
          }
          { (user && !admin) &&
              <li className={styles.username}>{user.name}</li>
          } 
          <Link  href={(user && admin) ? '/admin' : '/cart'} passHref>   
          <div className={styles.cart}>
            <Image src="/img/cart.png" alt="" width="55px" height="55px" />
            <div className={styles.counter}>{quantity}</div>
          </div>
        </Link>
        </div>
    </div>
  )
}

export default Navbar