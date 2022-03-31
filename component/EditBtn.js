import React from 'react'
import styles from '../styles/AddNew.module.css'
import Image from 'next/image'


const EditBtn = ({setClose}) => {
  return (
    <div onClick={()=>setClose(false)} className={`${styles.addBtn} ${styles.edit}`} >
        <Image src='/img/edit.webp' alt='edit' width={50} height={50} objectFit='contain' />
    </div>
  )
}

export default EditBtn