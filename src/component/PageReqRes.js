import { useLocation } from "react-router-dom"
import "./css/Restaurentlist.css"
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import MasterContex, { MyContext } from "../context/MasterContex";
import api from "../Webapi/api";

export default function PageReqRes() {
  const { restaurantList, updateReqRes } = useContext(MyContext);
  const location = useLocation();
  const res = location.state.restaurant;

  const approveRes = async (res) => {
    try {
      const response = await axios.get(api.ACTIVE_RESTAURANT + `${res._id}`);
      if (response.data.status) {
        toast.success("Restaurant is Approved");
        var index = restaurantList.findIndex(rest => rest._id == response.data.res._id);
        restaurantList[index].status = "ACTIVE";
        await updateReqRes(restaurantList);
      }
    } catch (err) { }
  }

  const denyRes = async (res) => {
    try {
      const response = await axios.get("/restaurant/deny/" + res._id);
      if (response.data.status) {
        toast.success("Restaurant is Deny");
        var index = restaurantList.findIndex(rest => rest._id == response.data.res._id);
        restaurantList[index].status = "DENY";
        await updateReqRes(restaurantList);
      }
    } catch (err) { }
  }

  return <>
    <div className="main-content mt-5">
      <section className="section">
        <div className="row mb-5">

          <div className="col-6 col-sm-6 col-md-6 col-lg-6">
            <div className="p1 container shadow  border ">
              <h3 className="mt-2">{res.name}</h3>
              <div className="p3 ">
                <img id="img1" className="img-fluid" src={"/mezban-images/" + res.images[0]} alt="img" />

              </div>
              <div className="p4 border mt-3 ">
                <table className="resTbl2 table table-responsive table-borderless ">

                  <tr>
                    <td><b>contact</b></td>
                    <td>{res._id}</td>
                  </tr>
                  <tr>
                    <td><b>Email</b></td>
                    <td>{res.email}</td>
                  </tr>
                  <tr>
                    <td><b>IFSSAI</b></td>
                    <td>{res.fssai}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div className="col-6 col-sm-6 col-md-6 col-lg-6 ">
            <div className="p1 container shadow border">
              <table className="table table-responsive table-borderless ">

                <tr>
                  <td><b>Opening Time</b></td>
                  <td>{res.openingTime}</td>
                </tr>
                <tr>
                  <td><b>Closing Time</b></td>
                  <td>{res.closingTime}</td>
                </tr>
                <tr>
                  <td><b>Total Tables</b></td>
                  <td>{res.totalTables}</td>
                </tr>
                <tr>
                  <td><b>Status</b></td>
                  <td>{res.status}</td>
                </tr>
                <tr>
                  <td><b>Address</b></td>
                  <td>{res?.address?.city + "," + res?.address?.state}</td>
                </tr>
                {/* <tr>
                    <td><b>Current Address</b></td>
                    <td></td>
                  </tr> */}
                <tr>
                  <td><b>Details</b></td>
                  <td>{res?.address?.details}</td>
                </tr>
              </table>
              {(res.status == 'pending' || res.status == 'PENDING') && <div className="row">
                <button onClick={() => { approveRes(res) }} className="btn btn-success col-lg-3 offset-2" >Approve</button>
                <button onClick={() => { denyRes(res) }} id="denyBtn" className="btn btn-outline-danger col-lg-3 offset-2" >Deny</button>

              </div>}
              {res.status == 'deny' || res.status == 'DENY' && <div className="row">
                <button onClick={() => { approveRes(res) }} className="btn btn-success col-lg-3 offset-1" >Approve</button>
              </div>}
            </div>
          </div>
        </div>
      </section>
    </div>
  </>
}