import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import api from "../Webapi/api";
import MasterContex, { MyContext } from "../context/MasterContex";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function UpdatePlan() {
    const {requestRes,restaurantList,plans, updateReqRes ,updateResList ,updatePlan} = useContext(MyContext);
    console.log(plans+"fhdshjkldfjhklfgdjhk");
    const location = useLocation();
    const plan = location.state.plan;
    console.log(plan.planName + " " + plan.price + "Plan");

    // const { plans } = useContext(MasterContex);
    const [planName, setPlanName] = useState(plan.planName);
    const [duration, setDuration] = useState(plan.duration);
    const [price, setPrice] = useState(plan.price);
    let _id = useRef();
    const navigate = useNavigate();

    // console.log(planName)

    const back = () => {
        navigate("/plan-add");
    }

    const setvalues = () =>{
        console.log("jhdvjkjk"+plan.planName)
       document.getElementById(planName).value=plan.planName;
    }

    const upPlan = async (event) => {
        try {
            event.preventDefault();
            _id=_id.value;

            console.log(_id," id ",event.planName," planname",event.price);
            
            const response = await axios.post(api.UPDATE_PLAN, {_id,planName, duration, price });
            console.log(response.data.status,"  status");
            if (!response.data.status)
                toast.warning("Not Updated Plan");
            plans.map((plan,index)=>{
                console.log(index);
                if(plan._id==response.data.plan._id){
                    plans.splice(index,1);
                }
             });
            plans.push({_id,planName,duration,price});
            toast.success("Plan Updated Successfully");
           
        }
        catch (err) {
            toast.error(" Updated Plan");
            // console.log(err);
          //  document.getElementById("error").innerHTML="Invalid details";
        }
    }
    return <>
     <ToastContainer/>
        <div className="main-content mt-5">
            <section className="section">
                <div className="row justify-content-center">
                    
                    <div className="inner  col-sm-6 col-md-6 col-lg-6 bg-white shadow-lg rounded align-item-center ">
                        <div className="container  justify-content-center pt-4">
                            <h1>Update Plan</h1>
                            <form onSubmit={upPlan}>
                                <div className="form-group">
                                    <input type="hidden" ref={id=>_id=id} className="form-control" value={plan._id} id="_id"  />
                                </div>
                                <div className="form-group">
                                    <label className="form-label " for="planName">Plan Name</label>
                                    <input  onKeyUp={(event) => setPlanName(event.target.value)} type="text" className="form-control"  defaultValue={plan.planName} id="newplanName"  />
                                </div>
                                <div className="form-group" style={{ width: "22rem;" }}>
                                    <label className="form-label" for="duration">Duration</label>
                                    <input onKeyUp={(event) => setDuration(event.target.value)} min="10" type="number" id="new duration" className="form-control" defaultValue={plan.duration} />
                                </div>
                                <div className="form-group">
                                    <label for="price">Price</label>
                                    <input onKeyUp={(event) => setPrice(event.target.value)} min="100" type="number" className="form-control" id="newprice" defaultValue={plan.price} />
                                </div>
                                <small id="addPlanError" className="form-text "></small>
                                <div className="col-lg-12 row " >
                                    <button type="submit" className="btn btn-primary mt-3 col-lg-4" >Update</button>
                                    <button type="submit" onClick={back} className="btn btn-primary mt-3 col-lg-4 offset-4" >Back</button>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    </>
}