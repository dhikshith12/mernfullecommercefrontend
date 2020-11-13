import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import AdminRoute from './auth/helper/AdminRoutes'
import PrivateRoute from './auth/helper/PrivateRoutes'
import Home from "./core/Home"
import AdminDashBoard from './user/AdminDashBoard'
import SignIn from './user/Signin'
import Signup from './user/Signup'
import UserDashBoard from './user/UserDashBoard'
import AddCategory from "./admin/AddCategory"
import ManageCategories from './admin/ManageCategories'
import AddProduct from './admin/AddProduct'
import ManageProducts from './admin/ManageProducts'
import UpdateProduct from './admin/UpdateProduct'
import UpdateCategory from './admin/UpdateCategory'
import Cart from './core/Cart'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch> 
                <Route path="/" exact component = {Home}/>
                <Route path="/signup" exact component = {Signup}/>
                <Route path="/signin" exact component = {SignIn}/>
                <PrivateRoute path="/user/dashboard" exact component ={UserDashBoard}/>
                <AdminRoute path="/admin/dashboard" exact component ={AdminDashBoard}/>
                <AdminRoute path="/admin/category/create" exact component ={AddCategory}/>
                <AdminRoute path="/admin/categories" exact component = {ManageCategories}/>
                <AdminRoute path="/admin/products/create" exact component = {AddProduct}/>
                <AdminRoute path="/admin/products" exact component = {ManageProducts}/>
                <AdminRoute path="/admin/product/update/:productId" exact component = {UpdateProduct}/>
                <AdminRoute path="/admin/category/update/:categoryId" exact component = {UpdateCategory}/>
                <Route path="/cart" exact component = {Cart}/>
            </Switch>
        </BrowserRouter>
    )
}