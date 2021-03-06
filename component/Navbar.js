import React from 'react'
import styles from "../styles/Navbar.module.css"
import Image from 'next/image'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0'
import SearchBar from './SearchBar'

const Navbar = ({sideOpen,setSideOpen}) => {
  const {user} = useUser()
  const quantity = useSelector(state => state.cart.quantity)

  let admin = false
  if(user && user.email === `${process.env.NEXT_PUBLIC_ADMIN}`) {
    admin = true
  }

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.hamburger} onClick={()=>setSideOpen(!sideOpen)}>
            <span className={styles.line1}></span>
            <span className={styles.line2}></span>
            <span className={styles.line3}></span>
        </div>
        <div className={styles.logo}>
          <Link href='/' passHref>
            <Image src='/img/logo.png' alt='logo' width='80' height='80' />
          </Link>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href='/' passHref >
          <li className={styles.listItem}>Home</li>
          </Link>
          <Link href='/#menu' passHref>
          <li className={styles.listItem}>Menu</li>
          </Link>
          {/* <li className={styles.listItem}>Pick Poke</li> */}
          <Link href='#contact' passHref>
          <li className={styles.listItem}>Find Us</li>
          </Link>
          <Link href='#contact' passHref>
          <li className={styles.listItem}>Contact</li>
          </Link>
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
          
          <Link href='/admin' passHref >
          <div>
          { (user && admin) && 
          <ul>
              <li className={`${styles.username} ${styles.name}`}>Admin {user.name}</li> 
          </ul>    
          }
           </div>
          </Link>
          <Link href='/user/me' passHref>
          <div>
          { (user && !admin) &&
            <ul>
              <li className={`${styles.username} ${styles.name}`}>{user.name}</li>
            </ul> 
          }
           </div>
          </Link >
          <Link  href='/cart' passHref>   
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