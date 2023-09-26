import Footer from "./Footer";
import MasterContex, { MyContext } from "../context/MasterContex";
import { useContext, useEffect, useState } from "react";
import "./css/Restaurentlist.css"
import { Link, useNavigate } from "react-router-dom";
import DropdownResList from "./DropdownResList.js";

export default function Restaurantlist() {
  const { restaurantList } = useContext(MyContext);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [restaurants, setRestaurants] = useState(restaurantList);

  const showResdetails = (res) => {
    (res.status == "pending" || res.status == "DENY" || res?.status == 'Pending') ? navigate("/dashboard/requested-res-details", { state: { restaurant: res } }) : navigate("/dashboard/active-res-details", { state: { restaurant: res } });
  }

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    let rests = restaurantList.filter(rest => rest.name.toLowerCase().includes(query.toLowerCase()))
    setRestaurants(rests);
  }

  const goback = () => {
    setRestaurants(restaurantList);
  }

  return <>
    <div className="main-content mt-5">
      <section className="section">
        <div className="row ">
          <div id="content" className="d-flex flex-column col-12 col-sm-12 col-md-12 col-lg-12 ">
            <div className="container-fluid mt-3 ">
              <div id="rest-list-container" className="container">
                <div className='row '><i onClick={goback} className="fa fa-arrow-left col-lg-1 mt-2 align-text-right " title='Go Back' aria-hidden="true"></i>
                  <input className=' w-100 bg-light border shadow-sm col-lg-6 mb-3 form-control-sm' type="text" value={query} onChange={handleInputChange} />
                  <Link><button className='float-right mt-1 bg-white' onClick={handleSearch}><i className="fa fa-search col-lg-2" ></i> </button> </Link>
                </div>
                <table className="table table-hover ">
                  <thead id="table-header">
                    <tr>
                      <th className="col-1 col-sm-1 col-md-1 col-lg-1">S.No</th>
                      <th className="col-3 col-sm-3 col-md-3 col-lg-2 ">Restaurant Name</th>
                      <th className="col-2 col-sm-2 col-md-2 col-lg-2 ">Address&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                      <th className="col-1 col-sm-1 col-md-1 col-lg-1 ">Rating</th>
                      <th className="col-2 col-sm-2 col-md-1 col-lg-1 ">Status</th>
                      <th className="col-1 col-sm-1 col-md-2 col-lg-2 ">
                        <div className="sb-example-1">
                          {/* <div className="search">
                                <input type="text" className="searchTerm" />
                                <button  type="submit" className="searchButton">
                                <i className="fa fa-search"></i>
                            </button>
                            </div> */}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {restaurants.length && restaurants.sort((a, b) => a.name.localeCompare(b.name)).map((res, index) => res && <tr id={"row" + index} key={index}>
                      <td>{index + 1}</td>
                      <td>{res?.name}</td>
                      <td>{res?.address?.details}</td>
                      {/* <td>{res.email}</td> */}
                      <td>{res?.rating}</td>
                      {(res?.status == 'pending' || res?.status == 'Pending') ? <td className="text-danger">{res?.status.toUpperCase()}</td> : (res?.status == 'active' || res?.status == 'ACTIVE' ? <td className="text-success">{res?.status.toUpperCase()}</td> : <td className="text-secondary">{res?.status.toUpperCase()}</td>)}
                      <td className="text-center"><button onClick={() => { showResdetails(res) }} className="btn btn-secondary btn-center">Details</button></td>
                    </tr>)}
                  </tbody>
                </table>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </section>
    </div>
  </>
}