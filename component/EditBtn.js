import React from 'react'
import styles from '../styles/AddNew.module.css'


const EditBtn = ({setClose}) => {
  return (
    <div>
        <button onClick={()=>setClose(false)} className={`${styles.addBtn} ${styles.edit}`}>Edit</button>
    </div>
  )
}

export default EditBtn