import React from 'react'
import Base from "../core/Base"
import {isAuthenticated} from "../auth/helper/index"
import {Link} from "react-router-dom"

const adminLeftSide = ()=>{
    return(
        <div className= "card">
            <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
            <ul className="list-group">
            <li className="list-group-item">
                <Link to="/admin/category/create" className="nav-link text-success">Create Categories</Link>
            </li>
            <li className="list-group-item">
                <Link to="/admin/products/create/" className="nav-link text-success">Create Products</Link>
            </li>
            <li className="list-group-item">
                <Link to="/admin/orders" className="nav-link text-success">Manage Orders</Link>
            </li>
            <li className="list-group-item">
                <Link to="/admin/categories" className="nav-link text-success">Manage Categories</Link>
            </li>
            <li className="list-group-item">
                <Link to="/admin/products" className="nav-link text-success">Manage Products</Link>
            </li>
            </ul>
        </div>
    )
}

const adminRightSide = ()=>{
    return(
        <div className="card mb-4">
            <h4 className="card-header">Admin Information</h4>
            <ul className="list-group">
                <li className="list-group-item">
                    <span className="badge badge-success mr-2">Name:</span> Danny
                </li>
                <li className="list-group-item">
                    <span className="badge badge-success mr-2">Name:</span> Danny
                </li>
                <li className="list-group-item">
                    <span className="badge badge-success mr-2">Name:</span> Danny
                </li>
            </ul>
        </div>
    )
}


export default function AdminDashBoard() {

    const {user: {name,email,role}} = isAuthenticated()



    return (
        <Base title="Welcome to admin area"
        className="container bg-success p-4"
        description="Manage all of your products here">
         <div className="row">
            <div className="col-3">{adminLeftSide()}</div>
            <div className="col-9">{adminRightSide()}</div>
         </div>
        </Base>
    )
}
