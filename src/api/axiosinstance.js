import axios from 'axios';

const axiosapi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // send cookies if needed
//   headers: {
//     'Content-Type': 'application/json',
//   },
});

export default axiosapi;
