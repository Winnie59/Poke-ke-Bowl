import React, {useState} from 'react'
import styles from '../../styles/ShowPoke.module.css'
import Image from 'next/image'
import axios from 'axios'

const Pokeke = ({poke}) => {
    const [price, setPrice] = useState(poke.price[0])
    const [size, setSize] = useState(0)
    const [quantity, setQuantity] = useState(1)

    const changePrice = (extra) => {
        setPrice(price + extra)
      }

    const handleSize = (sizeIndex) => {
        const difference = poke.price[sizeIndex] - poke.price[size]
        changePrice(difference)
        setSize(sizeIndex)
    }

  return (
    <div className={styles.container}>
        <div className={styles.left}>
            <h1 className={styles.title}>{poke.name}</h1>
            <span className={styles.price}>${price}</span>
            <p className={styles.description}>{poke.description}</p>
            <div className={styles.sizes}>
                <div className={styles.size} onClick={()=>handleSize(0)}>
                    <Image src='/img/size.png' alt='size' layout='fill' objectFit='contain' />
                    <span className={styles.add}>Regular</span>
                </div>
                <div className={styles.size} onClick={()=>handleSize(1)} >
                    <Image src='/img/size.png' alt='size' layout='fill' objectFit='contain' />
                    <span className={styles.add}>Large</span>
                </div>
            </div>
            <div className={styles.cart}>
                <input onChange={(e) => setQuantity(e.target.value)} type="number" defaultValue={1} className={styles.quantity} />
                <button className={styles.button}>Add to Cart</button>
            </div>
        </div>
        <div className={styles.right}>
            <div className={styles.imgContainer}>
                <Image src={poke.img} alt='poke' layout='fill'objectFit='contain' />
            </div>
        </div>

    </div>
  )
}

export const getServerSideProps = async ({params}) => {
    const res = await axios.get(`http://localhost:3000/api/pokes/${params.id}`)
    return {
      props: {
        poke: res.data
      }
    }
  }

export default Pokeke