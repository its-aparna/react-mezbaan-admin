import MasterContex, { MyContext } from "../context/MasterContex"
import { useContext } from "react"
import Footer from "./Footer"
// import Loader from "./Loader";
import "./css/Restaurentlist.css";
import { useNavigate } from "react-router-dom";

export default function ActiveResList() {

    const {restaurantList} = useContext(MyContext);
    const navigate = useNavigate();

    const showResdetails = (res) => {
        navigate("/dashboard/active-res-details", { state: { restaurant: res } });
    }
    return <>
        <div className="main-content mt-5">
            <section className="section">
                <div className="row">

                    <div id="content" className="d-flex flex-column col-12 col-sm-12 col-md-12 col-lg-12 ">
                        <div className="container-fluid mt-3 ">
                            <div id="rest-list-container">
                                <table className="table table-hover ">
                                    <thead id="table-header">
                                        <tr>
                                            <th className="col-1 col-sm-1 col-md-1 col-lg-1">S.No</th>
                                            <th className="col-3 col-sm-3 col-md-3 col-lg-2 ">Restaurant Name</th>
                                            <th className="col-2 col-sm-2 col-md-2 col-lg-2 ">Address&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                            <th className="col-1 col-sm-1 col-md-1 col-lg-1 ">Rating</th>
                                            <th className="col-2 col-sm-2 col-md-2 col-lg-2 ">Status</th>
                                            <th className="col-1 col-sm-1 col-md-1 col-lg-1 "></th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {restaurantList.sort((a, b) => a.name.localeCompare(b.name)).filter((restActive) => restActive.status.toUpperCase() == 'DENY').map((res, index) => <tr id={"row" + index} key={index}>
                                            <td>{index + 1}</td>
                                            <td>{res.name}</td>
                                            <td>{res.address.details}</td>
                                            <td>{res.rating}</td>
                                            <td>{res.status.toUpperCase()}</td>
                                            <td><button onClick={() => { showResdetails(res) }} className="btn btn-secondary">Details</button></td>
                                        </tr>)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>
}