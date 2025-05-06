import {  useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Login from './Components/NavBar/NavBar'

import { BrowserRouter } from 'react-router-dom'

import Navbar from './Components/NavBar/NavBar'

import RouteConfig from './RouteConfig'
import UserLogin from './Components/Authentication/UserLogin'

import { ToastContainer } from 'react-toastify'

import axiosapi from './api/axiosinstance'
import UserContext from './Components/Context/UserContext'




function App() {
 

  return (

    <>
    <BrowserRouter>
    
    
    
  
   <RouteConfig/>
    </BrowserRouter>
    
   
  
<ToastContainer/>
</>
     
  )
}

export default App
