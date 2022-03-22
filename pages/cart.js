import React from 'react'
import styles from '../styles/Cart.module.css'
import Image from 'next/image'

const Cart = () => {
  return (
    <div className={styles.container}>
        <div className={styles.left}>
            <table className={styles.table}>
                <tr className={styles.trTitle}>
                    <th></th>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
                <tr className={styles.tr}>
                    <td>
                        <div className={styles.img}>
                            <Image src='/img/aloha.png' alt='aloha' layout='fill' objectFit='cover' />  
                        </div>
                    </td>
                    <td>
                        <span className={styles.name}>Aloha Poke</span>
                    </td>
                    <td>
                        <span className={styles.size}>Regular</span>
                    </td>
                    <td>
                        <span className={styles.quantity}>1</span>
                    </td>
                    <td>
                        <span className={styles.price}>$12.99</span>
                    </td>
                    <td>
                        <span className={styles.total}>$12.99</span>
                    </td>
                </tr>
            </table>
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
                <button className={styles.button}>Checkout</button>
            </div>
        </div>

    </div>
  )
}

export default Cart