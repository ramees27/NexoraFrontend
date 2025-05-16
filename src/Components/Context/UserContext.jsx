import React, { useState,createContext,useContext } from 'react'
import { useget, usePatch } from '../../api/authapi';

export const UsersContext = createContext();


const UserContext = ({children}) => {
    const [user, setUser] = useState(false);
    const[status,setStatus]=useState("");
    const[bookingId,setBookingId]=useState("")
    const[paymentdetails,setPaymentDetails]=useState({})
    // const[isLogined,setisLogined]=useState(false)
    
     const getPaymentdetails = async () => {
        try {
          const responce = await useget("/DashBoard/Get-Payemnt-Summery")
          setPaymentDetails(responce.data)
       
          return responce.data
    
        }
        catch (error) {
          console.log(error);
    
        }
    
      }
  return (
    <UsersContext.Provider value={{ user,setUser,setStatus,setBookingId,paymentdetails,getPaymentdetails}}>
    {children}
  </UsersContext.Provider>
  )
}

export default UserContext