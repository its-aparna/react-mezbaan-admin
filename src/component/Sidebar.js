import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, Switch } from "react-router-dom";
import "./css/Sidebar.css";
import { setAdmin } from "../redux-config/admin-slice";
import { useState } from "react";

export default function Sidebar() {
  const { currentAdmin } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [preBar, setPreBar] = useState("baritem1")
  const nevigatApply = async (event) => {
    try {
      navigate("/");
    } catch { }
  }

  const blink = (id) => {
    document.getElementById(preBar).childNodes[0].style.color = 'white';
    document.getElementById(preBar).style.backgroundColor = 'transparent';
    document.getElementById(id).style.color = 'black';
    document.getElementById(id).style.backgroundColor = 'white';
    setPreBar(id);
  }
  const signOut = () => {
    dispatch(setAdmin(null));
    navigate("/");
  }

  return <>
    {/* Sidebar */}
    <div className="main-sidebar sidebar-style-2 bg-danger">
      <aside id="sidebar-wrapper">
        <div className="sidebar-brand mt-3">
          <h1 id="brand-name mt-5" style={{ color: "white" }}>Mezbaan</h1>
        </div>
        <div className="sidebar-brand sidebar-brand-sm">
          <a id="logName">
            <br></br><br></br> M <br /> e <br /> z <br /> b <br />a <br />a <br />n</a>
        </div>
        <ul className="sidebar-menu bg-danger">

          <li>
            <Link id="baritem1" onClick={() => blink("baritem1")} className="nav-link " to="/dashboard">
              <span  >Dashboard</span>
            </Link>
          </li>

          <li className="menu-header">Restaurant</li>
          <li >
            <Link id="baritem2" onClick={() => blink("baritem2")} className="nav-link" to="/dashboard/restaurant-list">
              <span >Restaurant List</span>
            </Link>
          </li>
          <li>
            <Link id="baritem3" onClick={() => blink("baritem3")} className="nav-link" to="/dashboard/requested-res" >
              <span>Requested&nbsp;Restaurant</span>
            </Link>
          </li>
          <li>
            <Link id="baritem4" onClick={() => blink("baritem4")} className="nav-link" to="/dashboard/active-restaurant" >
              <span >Active&nbsp;Restaurant</span>
            </Link>
          </li>
          <li className="menu-header">Plan</li>
          <li>
            <Link id="baritem5" onClick={() => blink("baritem5")} className="nav-link" to="/dashboard/plan-add">
              <span >Add & View  Plan</span>
            </Link>
          </li>
          <li className="menu-header">Account Setting</li>
          <li>
            <Link id="baritem6" onClick={() => blink("baritem6")} className="nav-link" to="/dashboard/change-email">
              <span>Change Email</span>
            </Link>
          </li>
          <li>
            <Link id="baritem7" onClick={() => blink("baritem7")} className="nav-link" to="/dashboard/update-password">
              <span>Change Password</span>
            </Link>
          </li>

        </ul>
        <div className=" mb-4 p-3 hide-sidebar-mini ">
          <a><button onClick={signOut} className="btn btn-center btn-danger" style={{ marginLeft: "55px" }}>Sign Out</button> </a>
        </div>
      </aside>
    </div>
    {/* End of Sidebar */}
  </>
}