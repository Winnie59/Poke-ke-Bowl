import React, { useState } from 'react'
import styles from '../../styles/Admin.module.css'
import Image from 'next/image'
import axios from 'axios'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'

const Admin = ({orders, pokes}) => {
    const [pokeList, setPokeList] = useState(pokes)
    const [orderList, setOrderList] = useState(orders)
    const status = ['preparing', 'to pick up', 'on the way', 'delivered','complete']

    const handleDeletePoke = async (id) => {
        try {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_URL}api/pokes/${id}`)
            setPokeList(pokeList.filter((poke)=> poke._id !== id))
        } catch(err) {
            console.log(err)
        }
    }

    const handleDeleteOrder = async (id) => {
        try {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_URL}api/orders/${id}`)
            setOrderList(orderList.filter((order)=> order._id !== id))
        } catch(err) {
            console.log(err)
        }
    }
    
    const handleStatus = async (id) => {
        const findItem = orderList.filter(order=> order._id === id)[0]
        const currentStatus = findItem.status
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_URL}api/orders/${id}`, {status: currentStatus + 1})
            setOrderList([
                res.data,
                ...orderList.filter((order) => order._id !== id)
            ])
        } catch(err) {
            console.log(err)
        }
    }

  return (
    <div className={styles.container}>
        <div className={styles.item}>
            <h1 className={styles.title}>PRODUCTS</h1>
            <table className={styles.table}>
                <tbody>
                    <tr className={styles.trTitle}>
                        <th className={styles.th}>Image</th>
                        <th className={`${styles.id} ${styles.th}`}>Poke Id</th>
                        <th className={styles.th}>Title</th>
                        <th className={styles.th}>Price (R , L)</th>
                    </tr>
                </tbody>
                {pokeList.map((poke) => (
                    <tbody className={styles.tbody} key={poke._id}>
                        <tr className={styles.trTitle}>
                            <td>
                                <Image src={poke.img} alt='' width={50} height={50}  objectFit="cover" />
                            </td>
                            <td className={`${styles.id} ${styles.td}`}>...{poke._id.slice(19,24)}</td>
                            <td className={styles.td}>{poke.name}</td>
                            <td className={styles.td}>$ {poke.price[0]}, $ {poke.price[1]}</td>
                            <td>
                                <div className={styles.button} onClick={()=>handleDeletePoke(poke._id)}>
                                   <Image src='/img/delete.png' alt='delete' width={50} height={50} objectFit='contain'/>   
                                </div>
                            </td>
                        </tr>     
                    </tbody>
                 ))}  
            </table>
        </div>
        <div className={styles.item}>
            <h1 className={styles.title}>ORDERS</h1>
            <table className={styles.table}>
                <tbody>
                    <tr className={styles.trTitle}>
                        <th className={`${styles.id} ${styles.th} `}>Order Id</th>
                        <th className={styles.th}>Customer</th>
                        <th className={styles.th}>Total</th>
                        <th className={styles.th}>Payment</th>
                        <th className={styles.th}>Status</th>
                    </tr>
                </tbody>
                {orderList.map((order) => (
                    <tbody className={styles.tbody} key={order._id}>
                        <tr className={styles.trTitle}>
                            <td className={`${styles.id} ${styles.td}`}>...{order._id.slice(19,24)}</td>
                            <td className={styles.td}>{order.customer}</td>
                            <td className={styles.td}>$ {order.total}</td>
                            <td className={styles.td}>{(order.method === 0 ? 'Cash' : 'Paid')}</td>
                            <td className={`${styles.statusAdmin} ${styles.td}`}>{status[order.status]}</td>
                            <td> 
                                <div className={styles.button} >
                                   <Image onClick={()=>handleStatus(order._id)} src='/img/next.webp' alt='next' width={50} height={50} objectFit='contain'/>   
                                </div>
                                <div className={styles.button} >
                                   <Image onClick={()=>handleDeleteOrder(order._id)} src='/img/delete.png' alt='delete' width={50} height={50} objectFit='contain'/>   
                                </div>
                            </td>
                        </tr>
                    </tbody>    
                    ))}
            </table>
        </div>
    </div>
  )
}

export const getServerSideProps = async () => {
    const pokeRes = await axios.get(`${process.env.NEXT_PUBLIC_URL}api/pokes`)
    const orderRes = await axios.get(`${process.env.NEXT_PUBLIC_URL}api/orders`)

    return {
        props: {
            orders:orderRes.data,
            pokes:pokeRes.data
        }
    }
}

export default withPageAuthRequired(Admin)