import React, { useState,createContext,useContext } from 'react'

const UsersContext = createContext();
export const useUser = () => useContext(UsersContext);
const UserContext = ({children}) => {
    const [user, setUser] = useState(true);
  return (
    <div> <UsersContext.Provider value={{ user,setUser}}>
    {children}
  </UsersContext.Provider></div>
  )
}

export default UserContext