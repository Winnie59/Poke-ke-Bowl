import React from 'react'
import Image from 'next/image'
import styles from '../../styles/Order.module.css'

const Order = () => {
    const status = 0
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
                        <span className={styles.id}> (12345678)</span>
                    </td>
                    <td>
                        <span className={styles.customer}>Winnie Bolm</span>
                    </td>
                    <td>
                        <span className={styles.phone}>567-890-9999</span>
                    </td>
                    <td>
                        <span className={styles.adress}>115 bostonia st Brighton MA 02345</span>
                    </td>
                    <td>
                        <span className={styles.total}>$12.99</span>
                    </td>
                </tr>
            </table>
        </div>
        <div className={styles.row}>
          <div className={statusClass(0)}>
            <Image src='/img/paid.png' alt='paid' width={55} height={55} />
            <p>Payment</p>
            <div className={styles.check}>
                <Image src='/img/check.png' alt='checked' width={20} height={20} />
            </div>
          </div>
          <div className={statusClass(1)}>
            <Image src='/img/prep.png' alt='prep' width={55} height={55} />
            <p>Preparing</p>
            <div className={styles.check}>
                <Image  src='/img/check.png' alt='checked' width={20} height={20} />
            </div>
          </div>
          <div className={statusClass(2)}>
            <Image src='/img/pickup.png' alt='pickup' width={55} height={55} />
            <p>To pick up</p>
            <div className={styles.check}>
                <Image  src='/img/check.png' alt='checked' width={20} height={20} />
            </div>
          </div>
          <div className={statusClass(3)}>
            <Image src='/img/ontheway.png' alt='ontheway' width={55} height={55} />
            <p>On the way</p>
            <div className={styles.check}>
                <Image src='/img/check.png' alt='checked' width={20} height={20} />
            </div>
          </div>
          <div className={statusClass(4)}>
            <Image src='/img/deliver.png' alt='deliver' width={55} height={55} />
            <p>Delivered</p>
            <div className={styles.check}>
                <Image src='/img/check.png' alt='checked' width={20} height={20} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
            <div className={styles.wrapper}>
                <h2 className={styles.cartTotal}>CART TOTAL</h2>
                <div className={styles.totalTitle}>
                    <b className={styles.totalAmountSub}>Subtotal:</b>$ 12.99
                </div>
                <div className={styles.totalTitle}>
                    <b className={styles.totalAmountDiscount}>Discount:</b>$ 5.00
                </div>
                <div className={styles.totalTitle}>
                    <b className={styles.totalAmountTax}>Tax:</b>$ 1.00
                </div>
                <div className={styles.totalTitle}>
                    <b className={styles.totalAmountTotal}>Total:</b>$ 8.00
                </div>
                <button disabled className={styles.button}>Paid</button>
            </div>
        </div>
      
    </div>
  )
}

export default Order