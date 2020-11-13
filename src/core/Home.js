import React , {useState, useEffect} from 'react'
import {API} from "../backend"
import Base from './Base'
import "../styles.css"
import Card from '../core/Card'
import { getProducts } from './helper/coreapicalls'


export default function Home() {

    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)
    

    const loadAllProduct = ()=>{
        getProducts().then( data=>{
            console.log(data);
            if(data.error){
                setError(data.error)
            } else{
                setProducts(data)
            }
        })
        console.log(products)
    }

    useEffect(() => {
        loadAllProduct()
    }, [])

    return (
        <Base title = "Home Page" description="Welcome To The Sweater Guys!">
           <div className="row text-center">
                <h1 className = "text-white">All of T-shirts</h1>
                <div className= "row">
                    {products.map((product,index)=>{
                        return(
                            <div key={index} className="col-4 mb-4">
                                <Card product = {product}/>
                            </div>
                        )
                    })}
                </div>
           </div>
        </Base>
    )
}
