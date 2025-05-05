import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Login from './Components/NavBar/NavBar'
import UserContext from './Components/Context/UserContext'
import { BrowserRouter } from 'react-router-dom'

import Navbar from './Components/NavBar/NavBar'

import RouteConfig from './RouteConfig'
import UserLogin from './Components/Authentication/UserLogin'
import { Card } from './Components/ui/card'
import { ToastContainer } from 'react-toastify'




function App() {
  

  return (
    <UserContext>
    <BrowserRouter>
    
    
    
  
  <RouteConfig/>
    </BrowserRouter>
    <ToastContainer/>
    </UserContext>
  

     
  )
}

export default App
