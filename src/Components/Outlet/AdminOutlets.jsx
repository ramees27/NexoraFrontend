import React from "react";

import { Outlet } from "react-router-dom";
import AdminNavBar from "../Admin/AdminNavBar";




const AdminOutlet = () => {
  return (
    <>
     <AdminNavBar/>
      <Outlet />
     
    </>
  );
};

export default AdminOutlet;