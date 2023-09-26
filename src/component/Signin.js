import "./css/Signin.css";
// import Navbar from "./Navbar";
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import api from "../Webapi/api"
import { setAdmin } from "../redux-config/admin-slice";

export default function Signin(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const signinSubmit = async (event)=>{
       try{ 
         event.preventDefault();
         const response = await axios.post(api.ADMIN_SIGNIN,{email,password});
         dispatch(setAdmin(response.data.result));
         navigate("/dashboard");
       }
       catch(err){
        document.getElementById("error").innerHTML="Invalid details";
       }
    }
    return <>
        {/* <Navbar/> */}
        <div className="outer container-fluid d-flex align-items-center justify-content-center ">
            <div className="inner col-sm-6 col-md-6 col-lg-4 bg-white shadow-lg rounded align-item-center ">
                <div className="container ">
                    <form onSubmit={signinSubmit}>
                        <div className="form-group m-4 mt-5">
                            <label className="mb-2">Email address</label>
                            <input  onChange={(event)=>setEmail(event.target.value)} type="email" className="form-control" id="email" placeholder="Enter email"/>
                        </div>
                        <div className="form-group m-4">
                            <label className="mb-2">Password</label>
                            <input onChange={(event)=>setPassword(event.target.value)} type="password" className="form-control" id="password" placeholder="Enter Password"/>
                        </div>
                        <div id="error" className="m-3 text-danger"></div>
                        <div className="row">
                            <div className="d-flex justify-content-right col-lg-6 ">
                                <Link to="/forgot-password" className="mx-4 mt-2">Forgot&nbsp;Password&nbsp;?</Link>
                            </div>
                            <div className="d-flex justify-content-end col-lg-6">
                                <button type="submit" className="btn btn-primary col-lg-8 me-4">Sign in</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}