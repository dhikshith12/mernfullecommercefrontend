import React, {useState}from 'react'
import { isAuthenticated } from '../auth/helper'
import Base from "../core/Base"
import {Link} from "react-router-dom"
import {createCategory} from "./helper/adminapicall"


export default function AddCategory() {

    const [name, setName] = useState("")
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const {user, token} = isAuthenticated();
    
    const goBack =()=>{
        return(
            <div className="mt-5">
                <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">Admin Home</Link>
            </div>
        )
    }

    const handleChange = (event) => {
        setError("");
        setName(event.target.value)
    }
    const onSubmit = (event)=>{
        event.preventDefault();
        setError("");
        setSuccess(false);

        createCategory(user._id, token,{name})
        .then(data=>{
            if(data.error){
                setError(true)
            }else{
                setError("")
                setSuccess(true);
                setName("");
            }
        })
    }

    const successMessage = ()=>{

        if(success){
            return <h4 className="text-success">Category Created</h4>
        }
    }

    const errorMessage = ()=>{  
        if(error){
            return <h4 className="text-success">Failed to Create Category</h4>
        }
    }
    
    const myCategoryForm = ()=>(
        <form>
            <div className="form-group">
                <p className="lead">Enter Category</p>
                <input type="text"
                className="form-control my-3"
                autoFocus
                onChange={handleChange}
                value={name}
                required
                placeholder="ex. Summer"/>
                <button onClick={onSubmit} className="btn btn-outline-info">Create Category</button>
            </div>
        </form>
    )

    return (
        <Base title="Create a category here"
        description="Add a new category  for new tshirts"
        className="container bg-info p-4"
        >
         <div className="row bg-white rounded">
            <div className="col-md-8 offset-md-2">
                {successMessage()}
                {errorMessage()}
                {myCategoryForm()}
                {goBack()}
            </div>
         </div>
         <p className="text-white">{JSON.stringify({name})}</p>
         
        </Base>
    )
}
