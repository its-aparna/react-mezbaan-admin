import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import PasswordCheckPage from "./PasswordCheckPage";
import { useSelector } from "react-redux";
import axios from "axios";
import api from "../Webapi/api";
import { useNavigate } from "react-router-dom";

export default function UpdatePassword() {
    const [check, setCheck] = useState(false);
    let password = useRef();
    let confPassword = useRef();
    const currentAdmin = useSelector(state => state.admin.currentAdmin);
    const navigate = useNavigate();
    const updatePassword = async () => {
        try {
            if (password.value != confPassword.value)
                document.getElementById("addError").innerHTML = "Password and Confrim Password not match "
            else {
                document.getElementById("addError").innerHTML = "";
                const response = await axios.post(api.UPDATE_PASSWORD, { id: currentAdmin._id, password: password.value });
                if (response.data.status)
                    toast.success("Password is Change successfully");
                else
                    toast.error("Opps! Something went wrong");
            }
        } catch (err) {
            toast.error("Opps! Something went wrong");
        }
    }

    const back = () => {
        navigate("/dashboard")
    }

    return <>
        {!check && <PasswordCheckPage setCheck={setCheck}></PasswordCheckPage>}
        {check && <div className="main-content mt-5">
            <section className="section ">
                <div className="row justify-content-center d-flex  ">
                    <div className="inner1 col-sm-6 col-md-6 col-lg-6 bg-white shadow-lg rounded">
                        <div className="container ">
                            <ToastContainer />

                            <div className="form-group">
                                <label className="form-label " for="planName">Password</label>
                                <input ref={pass => password = pass} type="password" className="form-control" id="password" placeholder="Enter Your Password" />
                            </div>
                            <div className="form-group">
                                <label className="form-label " for="planName">Confrim Password</label>
                                <input ref={confrimPass => confPassword = confrimPass} type="password" className="form-control" id="confPassword" placeholder="Confrim Password" />
                            </div>
                            <small id="addError" className="text-danger"></small>
                            <div className="col-lg-12 row " >
                                <button onClick={updatePassword} className="btn btn-success shadow-lg mt-3 col-lg-4" >Update</button>
                                <button onClick={back} className="btn btn-outline-danger mt-3 col-lg-4 offset-4" >Back</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>}
    </>
}