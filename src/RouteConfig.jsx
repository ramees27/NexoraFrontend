import React, { useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Components/Users/HomePage'

import UserLogin from './Components/Authentication/UserLogin'
import UserRegistration from './Components/Authentication/UserRegistration'
import Layout from './Components/Outlet/Outlet'
import Search from './Components/SearchCouncelor/Search'
import Details from './Components/SearchCouncelor/Details'
import Myactivity from './Components/Users/MyActivity/Myactivity'
import CounselorChat from './Components/Users/CounselorChat'
import Notifications from './Components/Users/Notifications'
import CouncelorApplicationForm from './Components/Counselors/ApplicationForm/CouncelorApplicationForm'
import AboutUs from './Components/Users/AboutUs'
import CNavBar from './Components/Counselor/CouncelorNavBar.jsx/CNavBar'
import COutlet from './Components/Outlet/COutlet'
import MainTabe from './Components/Counselor/Booking/MainTabe'
import CPayments from './Components/Counselor/Payments/CPayments'
import CReview from './Components/Counselor/Review/CReview'
import AdminOutlet from './Components/Outlet/AdminOutlets'
import AdminDahboard from './Components/Admin/AdminDashboard'
import AdminPayments from './Components/Admin/AdminPayments'
import AdminUsers from './Components/Admin/AdminUsers'
import AdminReview from './Components/Admin/AdminReview'
import AdminBookings from './Components/Admin/AdminBookings'
import AdminReceipt from './Components/Admin/AdminReceipt'

import UserContext, { UsersContext } from './Components/Context/UserContext'
import { checkLoginStatus, useget } from './api/authapi'

const RouteConfig = () => {
   const {setUser}=useContext(UsersContext)
  
   useEffect(() => {
    const fetchLoginStatus = async () => {
      const res = await checkLoginStatus();
      if (res) {
        setUser(true);
        console.log("User is logged in");
      } else {
        setUser(false);
        console.log("User is not logged in");
      }
    };
  
    fetchLoginStatus();
  }, []);

  return (
   <Routes>

    <Route path='/'element={<Layout/>}>
    <Route index element={<HomePage />} />
    <Route path='/search' element={<Search/>}/>
    <Route path='/details/:id' element={<Details />}/>
    <Route path='/counselorchat' element={<CounselorChat/>}/>
    <Route path='/notifications' element={<Notifications/>}/>
    <Route path='/aboutus' element={<AboutUs/>}/>


    
    </Route>
    <Route path='/counselor' element={<COutlet/>}>
    <Route path='maintabe' element={<MainTabe/>}/>
    <Route path='cpayments' element={<CPayments/>}/>
    <Route path='creview' element={<CReview/>}/>
    
    
    
    </Route>
    <Route path='/admin' element={<AdminOutlet/>}>
    <Route path='admindashboard' element={<AdminDahboard/>}/>
    <Route path='adminreceipt' element={<AdminReceipt/>}/>
    <Route path='adminpayments' element={<AdminPayments/>}/>
    <Route path='adminusers' element={<AdminUsers/>}/>
    <Route path='adminreview' element={<AdminReview/>}/>
    <Route path='adminbookings' element={<AdminBookings/>}/>
    
    
    </Route>
    <Route path='/userlogin' element={<UserLogin/>}/>
    <Route path ='/userregistration' element={<UserRegistration/>}/>
    <Route path='/myactivity' element={<Myactivity/>}/>
    <Route path='/counselorapllication' element={<CouncelorApplicationForm/>}/>
    <Route path='/counselorchat' element={<CounselorChat/>}/>
    

  
   </Routes>
   
  )
}

export default RouteConfig