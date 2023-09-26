import MasterContex, { MyContext } from "../context/MasterContex"
import { useContext, useEffect, useRef } from "react"
// import Footer from "./Footer"
import Loader from "./Loader";
import api from "../Webapi/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./css/All.css"

export default function Dashbord() {
  const { requestRes } = useContext(MyContext);
  let currentAdmin = useSelector(state => state.admin);
  let custNo = useRef();
  let restNo = useRef();
  const navigate = useNavigate();
  const showResdetails = (res) => {
    navigate("/dashboard/requested-res-details", { state: { restaurant: res } });
  }

  const loadCustomerNo = async () => {
    try {
      let response = await axios.get(api.CUSTOMER_COUNT);
      if (response.data.status) {
        custNo = response.data.record;
        document.getElementById("custNo").innerHTML = custNo;
      }
    }
    catch (err) {
    }
  };

  const loadRestaurantNo = async () => {
    try {
      let response = await axios.get(api.RESTAURANT_COUNT);
      if (response.data.status) {
        restNo = response.data.record;
        document.getElementById("resNo").innerHTML = restNo;
      }
    }
    catch (err) { }
  };

  const loadMonthlyProfit = async () => {
    try {
      let response = await axios.get(api.MONTHLY_PROFILE);
      if (response.data.status) {
        let profit = response.data.profit;
        document.getElementById("monthlyProfit").innerHTML = profit;
      }
    }
    catch (err) { }
  };

  useEffect(() => {
    loadCustomerNo();
    loadRestaurantNo();
    loadMonthlyProfit();
  }, [])

  if (!requestRes.length)
    return <><Loader /></>
  return <>
    <div className="main-content mt-5" style={{ position: "fixed" }}>
      <section className="section">
        <div className="row ">
          <div className="col-md-8 ">
            <div className="card">
              <div className="card-header">
                <h4>Requested Restaurants</h4>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive table-invoice">
                  <div className="container border dash2">
                    <table className="table table-hover mt-4">
                      <thead>
                        <tr>
                          <th className="col-lg-4">Restaurant Name</th>
                          <th className="col-lg-6">Address&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                          <th className="col-lg-2"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {requestRes.sort((a, b) => a.name.localeCompare(b.name)).map((res, index) => <tr id={"row" + index} key={index}>
                          <td>{res.name}</td>
                          <td>{res.address.details}</td>
                          <td><button onClick={() => { showResdetails(res) }} className="btn btn-secondary">Details</button></td>
                        </tr>)}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card-body p-0">
              <div className="box border shadow-lg ">
                <h2 className="mt-3 text-dark text-center">Total Customer </h2>
                <h1 id='custNo' className="mt-2 text-center "></h1>
              </div>
              <div className="box border mt-4 shadow-lg">
                <h2 className="mt-3 text-dark text-center">Total Restaurant</h2>
                <h1 id='resNo' className="mt-2 text-center "></h1>
              </div>
              <div className="box border mt-4 shadow-lg" >
                <h2 className="mt-3 text-dark text-center">Monthly Profit</h2>
                <h1 id='monthlyProfit' className="mt-3 text-center "></h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div></>
}