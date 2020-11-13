import React , {useState, useEffect} from 'react'
import {API} from "../backend"
import Base from './Base'
import "../styles.css"
import Card from '../core/Card'
import { loadCart } from './helper/cartHelper'
import StripePayCheckout from './StripeCheckout'




export default function Cart() {
    const [cartProducts, setcartProducts] = useState([]);
    const [reload, setReload] = useState(false)


    useEffect(() => {
        setcartProducts(loadCart())
    }, [reload])
    const loadCartProducts = ()=>{
        return(
            <div>
                <h2>Load Cart products</h2>
                {cartProducts.map((product, index)=>{
                   return <Card 
                   key={index}
                   product={product} 
                   addtoCart={false} 
                   removeFromCart={true}
                   setReload={setReload}
                   reload={reload}
                   />
                })}
            </div>
        )
    }

    const loadCheckout = ()=>{
        return(
            <div>
                <h2>Load checkout</h2>
            </div>
        )
    }

    

    return (
        <Base title = "Cart Page" description="Ready to checkout">
           <div className="row text-center">
                <div className="col-6">
                    {loadCartProducts()}
                </div>

                <div className="col-6">
                    <StripePayCheckout
                    products={cartProducts}
                    setReload={setReload}
                    />
                </div>
           </div>
        </Base>
    )
}
