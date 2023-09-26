import { useEffect, useRef, useState } from "react"
import "./css/UpdateEmailPage.css"
import { useSelector } from "react-redux"
import "./PasswordCheckPage"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../Webapi/api";
import { ToastContainer, toast } from "react-toastify";
import PasswordCheckPage from "./PasswordCheckPage";

export default function UpdateEmailPage() {
    const currentAdmin = useSelector(state => state.admin.currentAdmin);
    const [check, setCheck] = useState(false);
    let password = useRef();
    const [newEmail, setNewEmail] = useState("");
    const navigate = useNavigate();

    const updateEmail = async () => {
        const response = await axios.post(api.UPDATE_EMAIL, { email: currentAdmin.email, updateEmail: newEmail });
        if (response.data.status)
            toast.success("Email Updated Successfully");
        else
            toast.success("Somethig went wrong ");;
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
                            <h1>Update Email </h1>
                            <div className="form-group">
                                <label className="form-label " for="planName">Email</label>
                                <input onKeyUp={(event) => setNewEmail(event.target.value)} type="email" className="form-control" id="newEmail" />
                            </div>
                            <small id="addPlanError" className="form-text "></small>
                            <div className="col-lg-12 row " >
                                <button onClick={updateEmail} className="btn btn-success shadow-lg mt-3  col-lg-4" >Update</button>
                                <button onClick={back} className="btn btn-outline-danger mt-3 col-lg-4 offset-4" >Back</button>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </div>
        }
    </>
}