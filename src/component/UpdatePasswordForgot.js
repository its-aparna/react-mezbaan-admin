import { useEffect, useState } from "react";
import "./css/Signin.css";
import axios from "axios";
import api from "../Webapi/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function UpdateForgotPassword() {
    const [newPassword, setNewPasseord] = useState();
    const [confPassword, setConfPasseord] = useState();
    const updatePass = async () => {
        try {
            if (newPassword != confPassword)
                toast.error("confirm password is diffrent");
            else {
                // console.log(name);
                // let respose = await axios.post(api.UPDATE_PASSWORD,{})
            }
        } catch (err) {

        }
    }
    return <>
        <div className="outer container-fluid d-flex align-items-center justify-content-center ">
            <div className="inner col-sm-6 col-md-6 col-lg-4 bg-white shadow-lg rounded align-item-center ">
                <div className="container ">
                    <div className="form-group m-4 mt-5">
                        <label className="mb-2">Enter Password</label>
                        <input type="text" onKeyUp={(event) => setNewPasseord(event.target.value)} className="form-control" id="otp" placeholder="Enter password" />
                    </div>
                    <div className="form-group m-4 mt-5">
                        <label className="mb-2">Enter Confrim Password</label>
                        <input type="text" onKeyUp={(event) => setConfPasseord(event.target.value)} className="form-control" id="otp" placeholder="Enter password" />
                    </div>
                    <div className="row">
                        <div className="d-flex justify-content-right col-lg-6 ">
                            <button onClick={updatePass} className="btn btn-primary col-lg-8 me-4">Resend OTP</button>
                        </div>
                        <div className="d-flex justify-content-end col-lg-6">
                            <button className="btn btn-primary col-lg-8 me-4">Verify</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}