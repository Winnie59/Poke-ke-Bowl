import React from 'react'
import styles from '../styles/AddNew.module.css'

const AddNew = ({setClose}) => {
  return (
    <div>
        <button onClick={()=>setClose(false)} className={styles.addBtn}>
            Add New Poke
        </button>
    </div>
    
  )
}

export default AddNew