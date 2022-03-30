import React from 'react'
import Image from 'next/image'
import styles from '../../styles/Order.module.css'
import axios from 'axios'

const Order = ({order}) => {
    const status = order.status
    const statusClass = (index) => {
        if(index-status < 1) return styles.done
        if(index-status === 1) return styles.inProgress
        if(index-status > 1) return styles.undone
    }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
        <table className={styles.table}>
                <tr className={styles.trTitle}>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Total</th>
                </tr>
                <tr className={styles.tr}>
                    <td>
                        <span className={styles.id}> ({order._id})</span>
                    </td>
                    <td>
                        <span className={styles.customer}>{order.customer}</span>
                    </td>
                    <td>
                        <span className={styles.phone}>{order.phone}</span>
                    </td>
                    <td>
                        <span className={styles.adress}>{order.address}</span>
                    </td>
                    <td>
                        <span className={styles.total}>$ {order.total}</span>
                    </td>
                </tr>
            </table>
        </div>
        <div className={styles.row}>
          <div className={statusClass(0)}>
            <Image src='/img/paid.png' alt='paid' width={55} height={55} />
            <div className={styles.check}>
             <p>Payment</p>
            </div>
          </div>
          <div className={statusClass(1)}>
            <Image src='/img/prep.png' alt='prep' width={55} height={55} />
            <div className={styles.check}>
              <p>Preparing</p>
            </div>
          </div>
          <div className={statusClass(2)}>
            <Image src='/img/pickup.png' alt='pickup' width={55} height={55} />
            <div className={styles.check}>
              <p>To pick up</p>
            </div>
          </div>
          <div className={statusClass(3)}>
            <Image src='/img/ontheway.png' alt='ontheway' width={55} height={55} />    
            <div className={styles.check}>
              <p>On the way</p>
            </div>
          </div>
          <div className={statusClass(4)}>
            <Image src='/img/deliver.png' alt='deliver' width={55} height={55} />
            <div className={styles.check}>
              <p>Delivered</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
            <div className={styles.wrapper}>
                <h2 className={styles.cartTotal}>CART TOTAL</h2>
                <div className={styles.totalTitle}>
                    <b className={styles.totalAmountSub}>Subtotal:</b>$ {order.total}
                </div>
                <div className={styles.totalTitle}>
                    <b className={styles.totalAmountDiscount}>Discount:</b>$ 0.00
                </div>
                <div className={styles.totalTitle}>
                    <b className={styles.totalAmountTax}>Tax:</b>$ 0.00
                </div>
                <div className={styles.totalTitle}>
                    <b className={styles.totalAmountTotal}>Total:</b>$ {order.total}
                </div>
                <button disabled className={styles.button}>Paid</button>
            </div>
        </div>
      
    </div>
  )
}

export const getServerSideProps = async ({params}) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/orders/${params.id}`)
    return {
      props: {
        order: res.data
      }
    }
}

export default Order