// import MasterContex, { MyContext } from "../context/MasterContex"
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import api from "../Webapi/api";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import "./css/Plan.css";

export default function Addplan() {
  const [plans, setPlans] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [planName, setPlanName] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  let _id = useRef();

  const navigate = useNavigate();

  const savePlan = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(api.SAVE_PLAN, { planName, duration, price });
      if (!response.data.status)
        toast.error("plan doesn't save")
      toast.success("Plan successfully saved");
      plans.push(response.data.plan);
      setPlans([...plans]);
    }
    catch (err) {
      toast.error("plan Not Save");
    }
  }

  const removePlan = async (res) => {
    try {
      const { _id, planName, duration, price } = res;
      const response = await axios.post(api.REMOVE_PLAN, { _id });
      if (!response.data.status)
        toast.error("Plan Not Update")
      toast.success("Removed Plan");
      plans.map((plan, index) => {
        if (plan._id == _id) {
          plans.splice(index, 1);
          setPlans([...plans]);
        }
      });
    }
    catch (err) {
      toast.error("Plan Not Update");
    }
  }

  const loadPlans = async () => {
    try {
      let response = await axios.get(api.Plans_Lists + `?page=${page}`);
      if (response.data.status) {
        setPlans([...plans, ...response.data.result]);
        setPage(page + 1);
        setIsLoading(false);
      }
    }
    catch (err) { }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  const updatePlan = async (plan) => {
    try {
      navigate("/dashboard/update-plan", { state: { plan: plan } })
    } catch (err) { }
  }

  return <>
    <div className="main-content mt-5">
      <section className="section">
        <div className="row">

          <div className="col-md-5">
            <div className="card card-hero">

              <div className="card-body p-0 ">
                <div className="container dash1 " >
                  <h3 >Add Plan</h3>
                  <div className="form-data mt-4">
                    <form onSubmit={savePlan} >
                      <div className="form-group mt-1">
                        <label className="form-label" for="planName">Plan Name</label>
                        <input onChange={(event) => setPlanName(event.target.value)} type="text" className="form-control" id="planName" placeholder="Enter Plan Name" />
                      </div>
                      <div className="form-group" style={{ width: "22rem;" }}>
                        <label className="form-label" for="duration">Duration</label>
                        <input onChange={(event) => setDuration(event.target.value)} min="10" type="number" id="duration" className="form-control" placeholder="Enter Number of Days " />
                        {/* <label className="form-label text-primary" for="duration">Enter Number of Days</label> */}
                      </div>
                      <div className="form-group">
                        <label for="price">Price</label>
                        <input onChange={(event) => setPrice(event.target.value)} min="100" type="number" className="form-control" id="price" placeholder="Price" />
                      </div>
                      <small id="addPlanError" className="form-text "></small>
                      <button type="submit" className="btn btn-primary mt-3 ">Add</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-7">
            <div className="card">
              <div className="card-header">
                <h4>Plan List</h4>
                {/* <div className="card-header-action">
                  <a href="#" className="btn btn-light btn-outline-secondary">
                    View More <i className="fas fa-chevron-right" />
                  </a>
                </div> */}
              </div>
              <div className="card-body p-0">

                <InfiniteScroll
                  dataLength={plans.length}
                  next={loadPlans}
                  hasMore={plans.length < 100}
                  // loader={<Spinner/>}
                  endMessage={<p>Data End...</p>}>

                  {/* {isLoading && <Spinner/>} */}

                  <div className="table-responsive "  >
                    {/* table */}
                    <div className="container-fluied border dash2 overflow-scroll">

                      <table className="table table-hover mt-4 table-striped">
                        <thead >
                          <tr >
                            <th className="col-lg-3">Plan Name</th>
                            <th className="col-lg-3">Duration&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                            <th className="col-lg-2">Price</th>
                            <th className="col-lg-2">Subscriptions</th>
                            <th className="col-lg-2"></th>
                            <th className="col-lg-2"></th>
                          </tr>
                        </thead>

                        <tbody>
                          {plans.sort((a, b) => a.planName.localeCompare(b.planName)).map((res, index) => <tr id={"row" + index} key={index}>
                            <td>{res.planName}</td>
                            <td>{res.duration}&nbsp;Days</td>
                            <td>{res.price}&nbsp;Rs.</td>
                            <td><center>{res.subscriptions}</center></td>
                            <td>
                              {res.subscriptions ? <button><i class="fa fa-trash text-secondary" aria-hidden="true"></i></button> : <button onClick={() => { removePlan(res) }}><i class="fa fa-trash" aria-hidden="true"></i></button>}
                            </td>
                            <td><button onClick={() => { updatePlan(res) }} className="btn btn-secondary">Update</button></td>
                          </tr>)}

                        </tbody>

                      </table>

                    </div>
                  </div>
                </InfiniteScroll>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div></>
}