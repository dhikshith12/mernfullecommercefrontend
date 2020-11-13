import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import { cartEmpty, loadCart } from './helper/cartHelper'
import StripeCheckout from 'react-stripe-checkout'
import { API , STRIPEKEY} from '../backend'
import { createOrder } from './helper/orderHelper'



export default function StripePayCheckout({products, setReload = f=>f, reload = undefined}) {
    const [data, setData] = useState({
        loading: false,
        success: false,
        error: "",
        address: ""
    })

    const btoken = isAuthenticated() && isAuthenticated().token
    const userid = isAuthenticated() && isAuthenticated().user._id

    const getFinalPrice = ()=>{
        let amount = 0;
        products.map((product)=>{
            amount+=product.price
        })
        return amount
    }
    const makePayment = (token)=>{
        const body = {
            token,
            products
        }
        const headers = { 
            "Content-Type":"application/json"
        }
        return fetch(`${API}/stripepayment`,{
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        }).then(response => {
            console.log(response)
            const {status} = response;
            console.log("STATUS", status)
        }).catch(error => console.log(error))
    }

    const showStripeButton = ()=>{
        return isAuthenticated()?(
            <StripeCheckout
                stripeKey="pk_live_51HmNb6CPiylM4oNW9HMBc3GFda7gYiJe1wlhYbRaHsYSKlEaDOKyvEdHzgf2up0OXJ8TDiNhpOV9Y2iqRKRMOLDH00R0NTmT5v"
                token={makePayment}
                amount={getFinalPrice() * 100}
                name="Purchase T-Shirts"
                shippingAddress
                billingAddress
            >
             <button className="btn btn-success">Pay With Stripe</button>
            </StripeCheckout>
           
        ):(
            <Link to="/signin">
                <button className="btn btn-warning">Signin</button>
            </Link>
        )
    }

    return (
        <div>
            <h3 className="text-white">Stripte Checkout {getFinalPrice()}</h3>
            {showStripeButton()}
        </div>
    )
}
