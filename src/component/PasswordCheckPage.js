import { useEffect, useRef, useState } from "react"
import "./css/UpdateEmailPage.css"
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../Webapi/api";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
export default function PasswordCheckPage({ setCheck }) {
    const currentAdmin = useSelector(state => state.admin.currentAdmin);
    let password = useRef();
    const navigate = useNavigate();
    const verify = async () => {
        const response = await axios.post(api.VERIFY_PASSWORD, { _id: currentAdmin._id, password: password.value });
        if (response.data.status) {
            setCheck(true);
        }
        else
            toast.error("Wrong Password");
    }
    const back = () => {
        navigate("/dashboard")
    }

    return <>
        <div className="main-content mt-5">
            <section className="section ">
                <div className="row justify-content-center d-flex  ">
                    <div className="inner1 col-sm-6 col-md-6 col-lg-6 bg-white shadow-lg rounded">
                        <div className="container ">
                            <ToastContainer />

                            <div className="form-group">
                                <label className="form-label " for="planName">Password</label>
                                <input ref={pass => password = pass} type="password" className="form-control" id="password" placeholder="Enter Your Password" />
                            </div>

                            <small id="addPlanError" className="bg-danger"></small>
                            <div className="col-lg-12 row " >
                                <button onClick={verify} className="btn btn-success shadow-lg mt-3 col-lg-4" >Verify</button>
                                <button onClick={back} className="btn btn-outline-danger mt-3 col-lg-4 offset-4" >Back</button>
                            </div>


                        </div>
                    </div>
                </div>
            </section>
        </div>

    </>
}