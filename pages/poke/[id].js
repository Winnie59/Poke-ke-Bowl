import React, {useState} from 'react'
import styles from '../../styles/ShowPoke.module.css'
import Image from 'next/image'

const Pokeke = () => {
    const [size, setSize] = useState(0)
    const poke = {
        id: 1,
        img: '/img/aloha.png',
        name: 'Aloha Poke',
        price: [12.99, 13.99],
        description: 'Salmon, Tuna and Scallop mixed with mango topped with edamame and aloha sauce',
    }

  return (
    <div className={styles.container}>
        <div className={styles.left}>
            <h1 className={styles.title}>{poke.name}</h1>
            <span className={styles.price}>${poke.price[size]}</span>
            <p className={styles.description}>{poke.description}</p>
            <div className={styles.sizes}>
                <div className={styles.size} onClick={()=>setSize(0)}>
                    <Image src='/img/size.png' alt='size' layout='fill' objectFit='contain' />
                    <span className={styles.add}>Regular</span>
                </div>
                <div className={styles.size} onClick={()=>setSize(1)} >
                    <Image src='/img/size.png' alt='size' layout='fill' objectFit='contain' />
                    <span className={styles.add}>Large</span>
                </div>
            </div>
            <div className={styles.cart}>
                <input type="number" defaultValue={1} className={styles.quantity} />
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

export default Pokeke