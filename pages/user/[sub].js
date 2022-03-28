import { useUser } from '@auth0/nextjs-auth0'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from '../../styles/Admin.module.css'
import Link from 'next/link'

const User = ({orders}) => {
  const {user} = useUser()
  const [orderList, setOrderList] = useState(orders)
  const status = ['preparing', 'to pick up', 'on the way', 'delivered','complete']

  const getUserOrder = async() => { 
    if (user) {
      const findItem = orderList.filter(order=> order.userId === user.sub)
      setOrderList(findItem)
     
      console.log(findItem)
    }
  }

  useEffect(() => {
    getUserOrder()
  },[])

  return (
    <div className={styles.box}>
      { user &&
      <div className={styles.profile}>
        <img className={styles.profileUserImg} src={user.picture} alt={user.name} objectFit='contain' />
        <h1 className={styles.name}>{user.name}</h1>
        <div className={styles.order}>
            <table className={styles.table}>
                <tbody>
                    <tr className={styles.trTitle}>
                        <th>Order Id</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Payment</th>
                        <th>Status</th>
                    </tr>
                </tbody>
                    <tbody >
                    {orderList.map((order) => (
                        <tr className={styles.trTitle} key={order._id}>
                          <Link href={`/order/${order._id}`}>
                            <td className={styles.orderId}>{order._id}</td>
                          </Link>  
                            <td>{order.customer}</td>
                            <td>$ {order.total}</td>
                            <td>{(order.method === 0 ? 'Cash' : 'Paid')}</td>
                            <td className={styles.status}>{status[order.status]}</td>
                        </tr> 
                     ))}
                    </tbody>    
            </table>
        </div>
      </div>
        }
    </div>
  )
}

export const getServerSideProps = async () => {
  const orderRes = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/orders`)
    return {
      props: {
        orders:orderRes.data
      }
    }
}

export default User