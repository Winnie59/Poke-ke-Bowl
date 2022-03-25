import React from 'react'
import styles from '../styles/AddNew.module.css'

const AddNew = ({setClose}) => {
  return (
    <div onClick={()=>setClose(false)} className={styles.addBtn}>
        Add New Poke
    </div>
  )
}

export default AddNew