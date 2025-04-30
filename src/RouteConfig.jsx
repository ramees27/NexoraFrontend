import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Components/Users/HomePage'

import UserLogin from './Components/Authentication/UserLogin'
import UserRegistration from './Components/Authentication/UserRegistration'
import Layout from './Components/Outlet/Outlet'
import Search from './Components/SearchCouncelor/Search'

const RouteConfig = () => {
  return (
   <Routes>

    <Route path='/'element={<Layout/>}>
    <Route index element={<HomePage />} />
    <Route path='/search' element={<Search/>}/>

    
    </Route>
   
    <Route path='/userlogin' element={<UserLogin/>}/>
    <Route path ='/userregistration' element={<UserRegistration/>}/>
  
   </Routes>
  )
}

export default RouteConfig