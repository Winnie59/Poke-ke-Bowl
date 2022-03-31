import React from 'react'
import styles from '../styles/AddNew.module.css'
import Image from 'next/image'

const AddNew = ({setClose}) => {
  return (
    <div>
        <div onClick={()=>setClose(false)} className={styles.addBtn}>
            <Image className={styles.btn} src='/img/add.png' alt='add' width={50} height={50} objectFit='contain' />
        </div>
    </div>
    
  )
}

export default AddNew