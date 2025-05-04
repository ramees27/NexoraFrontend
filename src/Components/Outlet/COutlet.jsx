import React from "react";

import { Outlet } from "react-router-dom";
import CNavBar from "../Counselor/CouncelorNavBar.jsx/CNavBar";



const COutlet = () => {
  return (
    <>
      <CNavBar/>
      <Outlet />
     
    </>
  );
};

export default COutlet;