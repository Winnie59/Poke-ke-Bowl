import React, { useState } from 'react'
import Image from 'next/image'
import styles from '../styles/AddNew.module.css'
import axios from 'axios'

const Edit = ({setClose,poke,handleChange,handleChangeFile,handleSubmit,previewSource}) => {
    // const [editForm, setEditForm] = useState(poke)
    // // const [pokesList, setPokesList] =useState(pokes)
    // const [file, setFile] = useState()
    // const [previewSource, setPreviewSource] = useState()

    // let handleChange = (e) =>{
    //     setEditForm({
    //             ...editForm,[e.target.id]: e.target.value
    //         })
    // }
    
    // const handleChangeFile = (e) => {
    //     const file = e.target.files[0]
    //     setFile(file)
    //     previewfile(file)
    // }

    // const previewfile = (file) => {
    //     const reader = new FileReader()
    //     reader.readAsDataURL(file)
    //     reader.onloadend = () => {
    //         setPreviewSource(reader.result)
    //     }
    // }

    // const handleSubmit = async(id) => {
    //     const formData = new FormData()
    //     formData.append('file',file)
    //     formData.append('upload_preset','uploads')
    //     try {
    //         const uploadRes = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_cloudName}/image/upload`, formData)
    //         const { url } = uploadRes.data
    //         const editPoke = {
    //             editForm
    //         }
    //         const res = await axios.put(`${process.env.NEXT_PUBLIC_URL}/api/pokes/${id}`, editPoke)
    //         setClose(true)
    //         // setPokesList([
    //         //     res.data,
    //         //     ...pokesList.filter((poke) => poke._id !== id)
    //         // ])
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <span onClick={()=>setClose(true)} className={styles.close}>X</span>
            <h1>Edit Poke</h1>
            <div className={styles.item}>
                <label className={styles.label}>Choose an image</label>
                <input type="file" onChange={handleChangeFile}/>
                {previewSource && <Image src={previewSource} alt='chosen' width={200} height={250} objectFit='contain'/>}
            </div>
            <div className={styles.item}>
                <label className={styles.label}>Name</label>
                <input className={styles.input} type="text" onChange={handleChange} defaultValue={poke.name} />
            </div>
            <div className={styles.item}>
                <label className={styles.label}>Description</label>
                <textarea rows={4} type="text" onChange={handleChange} defaultValue={poke.description} />
            </div>
            <div className={styles.item}>
                <label className={styles.label}>Price</label>
                <div className={styles.priceContainer} >
                    <input className={`${styles.input} ${styles.inputSm}`} type="number" placeholder='Regular' onChange={handleChange} defaultValue={poke.price[0]} />
                    <input className={`${styles.input} ${styles.inputSm}`} type="number" placeholder='Large' onChange={handleChange} defaultValue={poke.price[1]}/>
                </div>
            </div>
            <button onClick={handleSubmit} className={styles.createButton} >Create</button>
        </div>
    </div>
  )
}

export default Edit