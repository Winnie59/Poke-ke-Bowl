import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from '../styles/AddNew.module.css'
import Image from 'next/image'

const Add = ({setClose, pokes}) => {
    const [file, setFile] = useState()
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState([])
    const [previewSource, setPreviewSource] = useState()
    const [pokeList, setPokeList] = useState(pokes)

    console.log(pokeList)

    const changePrice = (e, index) => {
        const currentPrices = price
        currentPrices[index] = e.target.value
        setPrice(currentPrices)
    }

    const handleChange = (e) => {
        const file = e.target.files[0]
        setFile(file)
        previewfile(file)
    }

    const previewfile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    const handleCreate = async() => {
        const formData = new FormData()
        formData.append('file',file)
        formData.append('upload_preset','uploads')
        try {
            const uploadRes = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_cloudName}/image/upload`, formData)
            const { url } = uploadRes.data
            const newPoke = {
                name,description,price,img:url
            }
            const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/pokes`, newPoke)
            setClose(true)
            setPokeList([
                res.data,
                ...pokeList
            ])
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <span onClick={()=>setClose(true)} className={styles.close}>X</span>
            <h1>Add new Poke</h1>
            <div className={styles.item}>
                <label className={styles.label}>Choose an image</label>
                <input type="file" onChange={handleChange}/>
                {previewSource && <Image src={previewSource} alt='chosen' width={200} height={250} objectFit='contain'/>}
            </div>
            <div className={styles.item}>
                <label className={styles.label}>Name</label>
                <input className={styles.input} type="text" onChange={(e)=>setName(e.target.value)} />
            </div>
            <div className={styles.item}>
                <label className={styles.label}>Description</label>
                <textarea rows={4} type="text" onChange={(e)=>setDescription(e.target.value)} />
            </div>
            <div className={styles.item}>
                <label className={styles.label}>Price</label>
                <div className={styles.priceContainer} >
                    <input className={`${styles.input} ${styles.inputSm}`} type="number" placeholder='Regular' onChange={(e)=>changePrice(e,0)} />
                    <input className={`${styles.input} ${styles.inputSm}`} type="number" placeholder='Large' onChange={(e)=>changePrice(e,1)}/>
                </div>
            </div>
            <button onClick={handleCreate} className={styles.createButton} >Create</button>
        </div>
    </div>
  )
}


export default Add