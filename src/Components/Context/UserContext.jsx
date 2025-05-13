import React, { useState,createContext,useContext } from 'react'
import { usePatch } from '../../api/authapi';

export const UsersContext = createContext();


const UserContext = ({children}) => {
    const [user, setUser] = useState(false);
    const[status,setStatus]=useState("");
    const[bookingId,setBookingId]=useState("")
    // const[isLogined,setisLogined]=useState(false)
    
  return (
    <UsersContext.Provider value={{ user,setUser,setStatus,setBookingId}}>
    {children}
  </UsersContext.Provider>
  )
}

export default UserContext