import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import "./css/sb-admin-2.css"
import "./css/sb-admin-2.min.css"
import "./css/Home.css"
import Dashbord from "./Dashbord"
import ReqRestaurant from "./ReqRestaurant"
import { Outlet, Route, Routes } from "react-router-dom"
import Footer from "./Footer"
import { ToastContainer } from "react-toastify"

export default function Home() {
    return <>
        <div id="app">
            <div className="main-wrapper main-wrapper-1">
                <Navbar />
                <ToastContainer />
                <Sidebar />
                {/* Main Content */}
                <Outlet />
                <Footer />
            </div>
        </div>
    </>
}