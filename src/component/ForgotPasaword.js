import { useEffect, useState } from "react";
import "./css/Signin.css";
import axios from "axios";
import api from "../Webapi/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function ForgotPassword() {
    const [check, setCheck] = useState(false);
    const [anotherCheck, setAnotherCheck] = useState(false);
    const [msg, setMsg] = useState(0);
    const [otp, setOtp] = useState(0);
    const [email, setEmail] = useState("");
    const [id, setId] = useState(0);
    const [newPassword, setNewPasseord] = useState();
    const [confPassword, setConfPasseord] = useState();

    const updatePass = async () => {
        if (newPassword != confPassword)
            toast.error("confirm password is diffrent");
        else {
            let respose = await axios.post(api.UPDATE_PASSWORD, { id: id, password: newPassword, email: email });
            if (respose.data.status)
                toast.success("Password Updated Successfuly");
            else
                toast.error("Something went wrong");
        }
    }

    const verifyEmail = async () => {
        let response = await axios.post(api.VIEW_PROFILE, { email: email });
        if (response.data.status) {
            setId(response.data.res._id);
            sendOTP();
            setCheck(true);
        }
        else
            toast.error("You Enterd Wrong Email")
    }

    const sendOTP = async () => {
        let response = await axios.post(api.SEND_OTP, { email: email });
        if (response.data.status)
            setMsg(response.data.msg);
    }

    const navigate = useNavigate();
    const verifyOtp = () => {
        if (msg == otp)
            setAnotherCheck(true);
        else
            toast.error("wrong otp")
    }

    const back = () => {
        navigate("/Signin")
    }

    useEffect(() => {
    }, [])

    return <>
        <div className="outer container-fluid d-flex align-items-center justify-content-center ">

            <div className="inner col-sm-6 col-md-6 col-lg-4 bg-white shadow-lg rounded align-item-center ">
                <div className="container ">
                    <ToastContainer />
                    {!anotherCheck && <>
                        {!check && <><div className="form-group m-4 mt-5">
                            <label className="mb-2">Email address</label>
                            <input onChange={(event) => setEmail(event.target.value)} type="email" className="form-control" id="email" placeholder="Enter email" />
                        </div>
                            <div className="row">
                                <div className="d-flex justify-content-right col-lg-6 ">
                                    <button onClick={verifyEmail} className="btn btn-primary col-lg-8 me-4">Send OTP</button>
                                </div>
                                <div className="d-flex justify-content-end col-lg-6">
                                    <button onClick={back} className="btn btn-primary col-lg-8 me-4">Back</button>
                                </div>
                            </div>
                        </>
                        }
                        {check && <>
                            <div className="form-group m-4 mt-5">
                                <label className="mb-2">Enter OTP</label>
                                <input type="text" onKeyUp={(event) => setOtp(event.target.value)} className="form-control" id="otp" placeholder="Enter password" />
                            </div>

                            <div className="row">
                                <div className="d-flex justify-content-right col-lg-6 ">
                                    <button onClick={sendOTP} className="btn btn-primary col-lg-8 me-4">Resend OTP</button>
                                </div>
                                <div className="d-flex justify-content-end col-lg-6">
                                    <button onClick={verifyOtp} className="btn btn-primary col-lg-8 me-4">Verify</button>
                                </div>
                            </div>
                        </>
                        }</>
                    }
                    {anotherCheck && <>
                        <div className="form-group m-4 mt-5">
                            <label className="mb-2">Enter Password</label>
                            <input type="text" onKeyUp={(event) => setNewPasseord(event.target.value)} className="form-control" id="otp" placeholder="Enter email" />
                        </div>

                        <div className="form-group m-4 mt-5">
                            <label className="mb-2">Enter Confrim Password</label>
                            <input type="text" onKeyUp={(event) => setConfPasseord(event.target.value)} className="form-control" id="otp" placeholder="Enter email" />
                        </div>

                        <div className="row">
                            <div className="d-flex justify-content-right col-lg-6 ">
                                <button onClick={updatePass} className="btn btn-primary col-lg-8 me-4">submit</button>
                            </div>
                            <div className="d-flex justify-content-end col-lg-6">
                                <button onClick={back} className="btn btn-primary col-lg-8 me-4">Back</button>
                            </div>
                        </div> </>
                    }
                </div>
            </div>
        </div>

    </>
}