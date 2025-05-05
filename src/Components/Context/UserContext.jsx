import React, { useState,createContext,useContext } from 'react'

const UsersContext = createContext();
export const useUser = () => useContext(UsersContext);
const UserContext = ({children}) => {
    const [user, setUser] = useState(false);
  return (
    <div> <UsersContext.Provider value={{ user,setUser}}>
    {children}
  </UsersContext.Provider></div>
  )
}

export default UserContext