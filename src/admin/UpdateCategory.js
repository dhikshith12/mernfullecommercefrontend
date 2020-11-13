import React,{useState,useEffect} from 'react'
import {isAuthenticated} from '../auth/helper'
import {Link} from 'react-router-dom'
import Base from "../core/Base"
import {updateCategory, getCategory} from "../admin/helper/adminapicall"




export default function UpdateCategory({match}) {
    const [name, setName] = useState("")
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    var categoryId = match.params.categoryId
    const {user, token} = isAuthenticated();



    const preload = (categoryId)=>{
        
        getCategory(categoryId).then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setName(data.name)
            }

        })
    }
  
    const handleChange = (event) => {
        setError("");
        setName(event.target.value)
    }
    const onSubmit = (event)=>{
        event.preventDefault();
        setError("");
        setSuccess(false);
        console.log(name)
        console.log(token)
        updateCategory(categoryId,user._id, token,{name})
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
            return <h4 className="text-success">Category Updated</h4>
        }
    }

    const errorMessage = ()=>{  
        if(error){
            return <h4 className="text-success">Failed Updating Category</h4>
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
                required>
                </input>
                <button onClick={onSubmit} className="btn btn-outline-info">Update Category</button>
            </div>
        </form>
    )


    
    useEffect(() => {
        preload(match.params.categoryId);
    }, [])


    return (
        <Base title="Update Category"
        description="update category"
        className="container bg-info p-4"
        >
         <div className="row bg-white rounded">
            <div className="col-md-8 offset-md-2">
                {successMessage()}
                {errorMessage()}
                {myCategoryForm()}
            </div>
         </div>
         
        </Base>
    )
}
