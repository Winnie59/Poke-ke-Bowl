import React, {useState} from 'react'
import styles from '../../styles/ShowPoke.module.css'
import Image from 'next/image'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../redux/cartSlice'
import EditBtn from '../../component/EditBtn'
import Edit from '../../component/Edit'
import { useUser } from '@auth0/nextjs-auth0'

const Pokeke = ({poke}) => {
  const [close, setClose] = useState(true)
  const [price, setPrice] = useState(poke.price[0])
  const [size, setSize] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()
  const {user} = useUser()
  let admin = false
  if(user && user.email === `${process.env.NEXT_PUBLIC_ADMIN}`) {
    admin = true
  }

  const changePrice = (extra) => {
      setPrice(price + extra)
    }

  const handleSize = (sizeIndex) => {
      const difference = poke.price[sizeIndex] - poke.price[size]
      changePrice(difference)
      setSize(sizeIndex)
  }

  const handleClick = () => {
      dispatch(addProduct({...poke, size, price, quantity}))
  }
  const [editForm, setEditForm] = useState(poke)
  // const [pokesList, setPokesList] =useState(pokes)
  const [file, setFile] = useState()
  const [previewSource, setPreviewSource] = useState()

  let handleChange = (e) =>{
      setEditForm({
              ...editForm,[e.target.id]: e.target.value
          })
  }
  
  const handleChangeFile = (e) => {
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

  const handleSubmit = async(id) => {
      const formData = new FormData()
      formData.append('file',file)
      formData.append('upload_preset','uploads')
      try {
          const uploadRes = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_cloudName}/image/upload`, formData)
          const { url } = uploadRes.data
          const editPoke = {
              editForm
          }
          const res = await axios.put(`${process.env.NEXT_PUBLIC_URL}/api/pokes/${id}`, editPoke)
          setClose(true)
          // setPokesList([
          //     res.data,
          //     ...pokesList.filter((poke) => poke._id !== id)
          // ])
      } catch (err) {
          console.log(err)
      }
  }

  return (
    <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.edit}>
            {admin && <EditBtn setClose={setClose}/>}
            {!close && <Edit setClose={setClose} poke ={poke} handleChange={handleChange} handleChangeFile={handleChangeFile} handleSubmit={handleSubmit} previewSource={previewSource}/> }
          </div>
            <div className={styles.menu}>
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
                  <button className={styles.button} onClick={handleClick}>Add to Cart</button>
              </div>
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
  const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/pokes/${params.id}`)
    return {
      props: {
        poke: res.data
      }
    }
}

export default Pokeke