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
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_URL}/api/pokes/${id}`)
            setPokeList(pokeList.filter((poke)=> poke._id !== id))
        } catch(err) {
            console.log(err)
        }
    }

    const handleDeleteOrder = async (id) => {
        try {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_URL}/api/orders/${id}`)
            setOrderList(orderList.filter((order)=> order._id !== id))
        } catch(err) {
            console.log(err)
        }
    }
    
    const handleStatus = async (id) => {
        const findItem = orderList.filter(order=> order._id === id)[0]
        const currentStatus = findItem.status
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_URL}/api/orders/${id}`, {status: currentStatus + 1})
            setOrderList([
                res.data,
                ...orderList.filter((order) => order._id !== id)
            ])
        } catch(err) {
            console.log(err)
        }
    }

    // const handleUpdate = async (id) => {
    //     try {
    //         const res = await axios.put(`${process.env.NEXT_PUBLIC_URL}/api/pokes/${id}`)
    //     } catch(err) {
    //         console.log(err)
    //     }
    // }

  return (
    <div className={styles.container}>
        <div className={styles.item}>
            <h1 className={styles.title}>Products</h1>
            <table className={styles.table}>
                <tbody>
                    <tr className={styles.trTitle}>
                        <th>Image</th>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Price (R , L)</th>
                        <th>Action</th>
                    </tr>
                </tbody>
                {pokeList.map((poke) => (
                    <tbody key={poke._id}>
                        <tr className={styles.trTitle}>
                            <td>
                                <Image src={poke.img} alt='' width={50} height={50}  objectFit="cover" />
                            </td>
                            <td>...{poke._id.slice(19,24)}</td>
                            <td>{poke.name}</td>
                            <td>$ {poke.price[0]}, $ {poke.price[1]}</td>
                            <td>
                                <button className={styles.button}>Edit</button>
                                <button className={styles.button} onClick={()=>handleDeletePoke(poke._id)} >Delete</button>
                            </td>
                        </tr>     
                    </tbody>
                 ))}  
            </table>
        </div>
        <div className={styles.item}>
            <h1 className={styles.title}>Orders</h1>
            <table className={styles.table}>
                <tbody>
                    <tr className={styles.trTitle}>
                        <th>Id</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th>action</th>
                    </tr>
                </tbody>
                {orderList.map((order) => (
                    <tbody key={order._id}>
                        <tr className={styles.trTitle}>
                            <td>...{order._id.slice(19,24)}</td>
                            <td>{order.customer}</td>
                            <td>$ {order.total}</td>
                            <td>{(order.method === 0 ? 'Cash' : 'Paid')}</td>
                            <td>{status[order.status]}</td>
                            <td> 
                                <button className={styles.next} onClick={()=>handleStatus(order._id)}>Next Stage</button>
                                 <button onClick={()=>handleDeleteOrder(order._id)} >Delete</button> 
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
    const pokeRes = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/pokes`)
    const orderRes = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/orders`)

    return {
        props: {
            orders:orderRes.data,
            pokes:pokeRes.data
        }
    }
}

export default withPageAuthRequired(Admin)