import React from 'react'
import axiosapi from './axiosinstance';


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