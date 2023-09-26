import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signin from './component/Signin';
import Home from './component/Home';
import { useEffect, useState } from 'react';
import axios from 'axios';
import api from './Webapi/api';
import ReqRestaurant from './component/ReqRestaurant';
import Dashbord from './component/Dashbord';
import Restaurantlist from './component/Restaurantlist';
import Addplan from './component/Addplan';
import PageReqRes from './component/PageReqRes';
import PageActiveRes from './component/PageActiveRes';
import UpdatePlan from './component/UpdatePlanPage';
import UpdateEmailPage from './component/UpdateEmailPage';
import MyProvider, { MyContext } from './context/MasterContex';
import { useContext } from 'react';
import ActiveResList from './component/ActiveResList';
import { useSelector } from 'react-redux';
import UpdatePassword from './component/UpdatePassword';
import ForgotPassword from './component/ForgotPasaword';
import UpdateForgotPassword from './component/UpdatePasswordForgot';

function App() {
  const { updateReqRes ,updateResList ,updatePlan,restaurantList} = useContext(MyContext);
  let currentAdmin = useSelector(state => state.admin);
 const loadReq = async () => {
      try {
        let response = await axios.get(api.REQRESTORENT_LIST);
        if(response.data.status)
         updateReqRes(response.data.res);
      }
      catch (err) {
        console.log("Netwrok Error");
      }
    }

    const loadRes = async () => {
      try {
        let response = await axios.get(api.RESTAURANT_LIST);
        if(response.data.status)
         updateResList(response.data.result);
      }
      catch (err) {
        console.log("Netwrok Error");
      }
    }

  useEffect(()=>{
    loadReq();
    loadRes();
  },[]);

  return <div id='container' className='container-fluid'>
    {/* <MyProvider> */}
     {/* <MasterContex.Provider value={{requestRes:requestRes,restaurantList:restaurantList,plans:plans,updateReqRes}}> */}
    <Routes>
      if(!currentAdmin)
      <Route path='/' element={<Signin/>}/>
      <Route path='/dashboard' element={<Home/>} >
        <Route path='/dashboard/requested-res' element={<ReqRestaurant/>}/>
        <Route path='/dashboard' element={<Dashbord/>}></Route>
        <Route path='/dashboard/restaurant-list' element={<Restaurantlist/>}/>
        <Route path='/dashboard/plan-add' element={<Addplan/>}/>
        <Route path='/dashboard/requested-res-details' element={<PageReqRes/>}/>
        <Route path='/dashboard/active-res-details' element={<PageActiveRes/>}/>
        <Route path='/dashboard/update-plan' element={<UpdatePlan/>}/>
        <Route path='/dashboard/change-email' element={<UpdateEmailPage/>} />
        <Route path='/dashboard/active-restaurant' element={<ActiveResList/>}/>
        <Route path='/dashboard/update-password' element={<UpdatePassword/>}/>
      </Route>
     
      <Route path='/Signin' element={<Signin/>} />
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/update-password' element={<UpdateForgotPassword/>}/>
      
     {/**/}
    </Routes>
    {/* </MasterContex.Provider> */}
    {/* </MyProvider> */}
   
  </div>
}



export default App;
