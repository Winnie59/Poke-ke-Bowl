import React from 'react'
import styles from '../styles/Cart.module.css'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'

const Cart = () => {
    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch()
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
                {cart.products.map((product) => (
                    <tr className={styles.tr} key={product._id}>
                        <td>
                            <div className={styles.img}>
                                <Image src={product.img} alt='aloha' layout='fill' objectFit='cover' />  
                            </div>
                        </td>
                        <td>
                            <span className={styles.name}>{product.name}</span>
                        </td>
                        <td>
                            <span className={styles.size}>{(product.size === 1) ? 'Large' : 'Regular'}</span>
                        </td>
                        <td>
                            <span className={styles.quantity}>{product.quantity}</span>
                        </td>
                        <td>
                            <span className={styles.price}>$ {product.price}</span>
                        </td>
                        <td>
                            <span className={styles.total}>$ {product.price * product.quantity}</span>
                        </td>
                    </tr>   
                ))}
                
            </table>
        </div>
        <div className={styles.right}>
            <div className={styles.wrapper}>
                <h2 className={styles.cartTotal}>CART TOTAL</h2>
                <div className={styles.totalTitle}>
                    <b className={styles.totalAmountSub}>Subtotal:</b>$ {cart.total}
                </div>
                <div className={styles.totalTitle}>
                    <b className={styles.totalAmountDiscount}>Discount:</b>$ 0.00
                </div>
                <div className={styles.totalTitle}>
                    <b className={styles.totalAmountTax}>Tax:</b>$ 0.00
                </div>
                <div className={styles.totalTitle}>
                    <b className={styles.totalAmountTotal}>Total:</b>$ {cart.total}
                </div>
                <button className={styles.button}>Checkout</button>
            </div>
        </div>

    </div>
  )
}

export default Cart