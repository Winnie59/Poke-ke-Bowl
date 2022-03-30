import { getSession, useUser } from '@auth0/nextjs-auth0'
import React, { useState } from 'react'
import styles from '../styles/Cash.module.css'

const Cash = ({total, createOrder}) => {
    const [customer, setCustomer] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const {user} = useUser()
    if (user) {
    const userId = user.sub  
    } else {
      null
    }
    

    const handleClick = () => {
      createOrder({ customer, address, phone, total, method: 0, userId });
    }

  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Pay at Deliver</h1>
            <div className={styles.item}>
                <label>Name</label>
                <input type="text" placeholder='Winnie Bolm' className={styles.input} onChange={(e)=>setCustomer(e.target.value)}/>
            </div>
            <div className={styles.item}>
                <label className={styles.label}>Phone Number</label>
                <input
                  type="text"
                  placeholder="+1 234 567 89"
                  className={styles.input} onChange={(e)=>setPhone(e.target.value)}
                />
             </div>
             <div className={styles.item}>
                <label className={styles.label}>Address</label>
                <textarea 
                  rows={5}
                  placeholder="Salmon St. 55 MA"
                  type="text"
                  className={styles.textarea}
                  onChange={(e) => setAddress(e.target.value)}
                />
             </div>
            <button className={styles.button} onClick={handleClick}>
              Order
            </button>
        </div>
    </div>
  )
}

export default Cash