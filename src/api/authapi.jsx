import React, { useContext } from 'react'
import axiosapi from './axiosinstance';
import { UsersContext } from '../Components/Context/UserContext';


export const usePost = async(url, data1) => {
    try {
      const response = await axiosapi.post(url, data1); 
      console.log(response.data)

      return response.data; 
      

    } catch (error) {
      console.log(error.response.data);
      return error.response?.data;
    }
  };
export const usePatch = async(url, data1) => {
    try {
      const response = await axiosapi.patch(url, data1); 
   
      return response.data; 
      

    } catch (error) {
      console.log(error.response.data);
      return error.response?.data;
    }
  };



  export const useget = async(url) => {
    try {
      const response = await axiosapi.get(url); 
    // console.log(response.data)
      return response.data; 
      

    } catch (error) {
      console.log(error.response.data);
      return error.response?.data;
    }
  };



  export const checkLoginStatus = async () => {
    try {
      const res = await useget("/User/get-id");
      console.log(res) 
      return res;
       // ✅ just return the response
    } catch (error) {
      console.error("Login check failed:", error);
       throw error;
    }
  };
  
  export const logOut=async ()=>{
    try{
         const result= await axiosapi.post("/User/logout");
         return result.data;
    }
    catch(error){
        console.error("Login check failed:", error);
      return null;

    }
  }

   
   export const cancelBookings= async(data)=>{
      try{
      const responce=await usePatch(`/Booking/${data.bookingId}/status/${data.status}`,data)
      return responce.data
      }
      catch(error){
        console.log(error)
      }
    }
   
  