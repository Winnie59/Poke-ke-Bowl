import { useUser } from '@auth0/nextjs-auth0'
import Link from 'next/link'
import React from 'react'
import styles from '../styles/SideBar.module.css'

const SideBar = ({sideOpen, setSideOpen}) => {
    const {user} = useUser()

    let admin = false
  if(user && user.email === `${process.env.NEXT_PUBLIC_ADMIN}`) {
    admin = true
  }
  return (
    <div>
        {sideOpen ?
        <div className={`${styles.menu} ${styles.active}`}>
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
         <Link href='/admin' passHref >
          <div >
          { (user && admin) && 
            <ul  className={styles.login}>
              <li className={styles.username}>Hello,</li>
              <li className={styles.username}>Admin {user.name}</li> 
            </ul>  
          }
           </div>
          </Link>
          <Link href='/user/me' passHref>
          <div>
          { (user && !admin) &&
            <ul  className={styles.login}>
                <li className={styles.username}>Hello,</li>
                <li className={styles.username}>{user.name}</li>
            </ul> 
          }
           </div>
          </Link >
        </div>
        :
        <div className={styles.menu}>
                         <ul className={styles.list}>
          <Link href='/' passHref >
          <li className={styles.listItem}>Home</li>
          </Link>
          <Link href='/#menu' passHref>
          <li className={styles.listItem}>Menu</li>
          </Link>
          <li className={styles.listItem}>Pick Poke</li>
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
        <Link href='/admin' passHref >
          <div >
          { (user && admin) && 
          <ul className={styles.login}>
              <li className={styles.username}>Hello,</li>
              <li className={styles.username}>Admin {user.name}</li> 
            </ul>
          }
           </div>
          </Link>
          <Link href='/user/me' passHref>
          <div >
          { (user && !admin) &&
            <ul >
                <li className={styles.username}>Hello,</li>
              <li className={styles.username}>{user.name}</li>
            </ul>
          }
           </div>
          </Link >
        </div>
        }
    </div>
  )
}

export default SideBar