import React, { useState,createContext,useContext } from 'react'

export const UsersContext = createContext();


const UserContext = ({children}) => {
    const [user, setUser] = useState(false);
    // const[isLogined,setisLogined]=useState(false)
  return (
    <UsersContext.Provider value={{ user,setUser}}>
    {children}
  </UsersContext.Provider>
  )
}

export default UserContext