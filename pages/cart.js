import React from 'react'
import styles from '../styles/Cart.module.css'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { PayPalScriptProvider,PayPalButtons, usePayPalScriptReducer,} from "@paypal/react-paypal-js";

const Cart = () => {
    const cart = useSelector((state) => state.cart)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const amount = 2
    const currency = "USD"
    const style = { layout: "vertical" }

    // Custom component to wrap the PayPalButtons and handle currency changes
    const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);


    return (
    <>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                }}
                onApprove={function (data, actions) {
                    return actions.order.capture().then(function (details) {
                        console.log(details)   
                    });
                }}
            />
        </>
    )}

  return (
    <div className={styles.container}>
        <div className={styles.left}>
            <table className={styles.table}>
                <tbody>
                   <tr className={styles.trTitle}>
                        <th></th>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>    
                </tbody>
                <tbody>
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
                </tbody>  
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
                {open ? (
                    <div className={styles.payment}>
                        <button className={styles.cash}>CASH</button>
                        <div className={styles.paypal} style={{ maxWidth: "700px", minHeight: "200px" }}>
                            <PayPalScriptProvider
                                options={{
                                    "client-id": `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`,
                                    components: "buttons",
                                    currency: "USD",
                                    "disable-funding": "paylater,venmo"
                                }}>
                                <ButtonWrapper
                                    currency={currency}
                                    showSpinner={false}
                                />
                            </PayPalScriptProvider>
		                </div>  
                    </div>
                ) : (
                     <button onClick={()=>setOpen(true)} className={styles.button}>CHECKOUT</button>    
                )}
            </div>
        </div>
    </div>
  )
}

export default Cart