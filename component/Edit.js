import React, { useState } from 'react'
import styles from '../styles/AddNew.module.css'
import axios from 'axios'
import { useRouter } from 'next/router'

const Edit = ({setClose,poke, refreshData}) => {
    const [editForm, setEditForm] = useState(poke)
    const router = useRouter()

    const handleChange = (e) =>{
        setEditForm({
                ...editForm,[e.target.name]: e.target.value
            })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_URL}api/pokes/${poke._id}`, editForm)
            setClose(true)
            refreshData()
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <span onClick={()=>setClose(true)} className={styles.close}>X</span>
            <h1>Edit Poke</h1>
            <div className={styles.item}>
                <label className={styles.label}>Name</label>
                <input className={styles.input} type="text" onChange={handleChange} defaultValue={poke.name} name='name'/>
            </div>
            <div className={styles.item}>
                <label className={styles.label}>Description</label>
                <textarea rows={4} type="text" onChange={handleChange} defaultValue={poke.description} name='description'/>
            </div>
            {/* <div className={styles.item}>
                <label className={styles.label}>Price</label>
                <div className={styles.priceContainer} >
                    <input className={`${styles.input} ${styles.inputSm}`} type="number" placeholder='Regular' onChange={handleChange} defaultValue={poke.price[0]} name='price'/>
                    <input className={`${styles.input} ${styles.inputSm}`} type="number" placeholder='Large' onChange={handleChange} defaultValue={poke.price[1]} name='price'/>
                </div>
            </div> */}
            <button onClick={handleSubmit} className={styles.createButton} >Create</button>
        </div>
    </div>
  )
}


export default Edit