import React, { useContext, useEffect, useState } from 'react'
import AdminRequest from './AdminRequest';
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { useget } from '../../api/authapi';
import { parseISO, format } from "date-fns";
import { UsersContext } from '../Context/UserContext';

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#3b82f6", // Tailwind blue-500
  },
  expense: {
    label: "Expense",
    color: "#60a5fa", // Tailwind blue-400
  },
};



const AdminDahboard = () => {
  const{paymentDetails,getPaymentdetails}=useContext(UsersContext)
  
  const [councelorCount, setCouncelorCount] = useState(0)
  const [studentCount, setstudentCount] = useState(0)
  const [bookingCount, setBookingCount] = useState(0)
  const [statusCount, setStatusCount] = useState([])
  const [monthlyreports, setMonthlyreports] = useState([])
 const[pay,setPay]=useState({})
  const statusColorMap = {
    pending: 'bg-yellow-400',
    request_payment: 'bg-purple-500',
    accepted: 'bg-blue-500',
    declined: 'bg-red-500',
    cancelled: 'bg-gray-500',
    completed: 'bg-green-500',
  };



  const fetchStatusCount = async () => {
    try {
      const res = await useget("/DashBoard/Get-Status-Count")
      const formatted = res.data.map(item => ({
        label: item.status.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase()),
        count: item.count,
        color: statusColorMap[item.status] || 'bg-gray-400',
      }));
      setStatusCount(formatted);
    } catch (err) {
      console.error('Failed to fetch booking status summary:', err);
    }
  };

 

  const getactiveCouncelors = async () => {
    try {
      const responce = await useget("/DashBoard/Get-Councelor-Count")
      setCouncelorCount(responce.data)


    }
    catch (error) {
      console.log(error);

    }

  }
  const getactiveStudents = async () => {
    try {
      const responce = await useget("/DashBoard/Get-Student-Count")
      setstudentCount(responce.data)


    }
    catch (error) {
      console.log(error);

    }

  }
  const getBookingCount = async () => {
    try {
      const responce = await useget("/DashBoard/Get-Booking-Count")
      setBookingCount(responce.data)
 

    }
    catch (error) {
      console.log(error);

    }

  }


  const getMonthlyDetails=async()=>{
    try{
      const response= await useget("/DashBoard/Get-Monthly-income");
      setMonthlyreports(response.data)
  
    }
    catch(error){
      console.log(error);
      
    }
  }
  const formattedChartData = monthlyreports.map(item => ({
  month: format(parseISO(item.month + '-01'), 'MMM yyyy'), // e.g., "May 2025"
  revenue: item.revenue,
  expense: item.expense
}));

 

  // const getBookingStatus = async () => {
  //   try {
  //     const responce = await useget("/DashBoard/Get-Status-Count")
  //     setStatusCount(responce.data)
  //     console.log(responce.data);

  //   }
  //   catch (error) {
  //     console.log(error);

  //   }

  // }
  const GetPay=async()=>{
 const getDetails= await getPaymentdetails();
 setPay(getDetails)
  }
  
  useEffect(() => {
    GetPay();
    getactiveCouncelors();
    getactiveStudents();
    getBookingCount();
    fetchStatusCount();
    getMonthlyDetails();
   
  }, [])
  return (
    <>
      <div className="p-4 md:p-8">
        {/* Top Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <p className="text-sm text-gray-500">Total Received</p>
            <p className="text-xl font-semibold">${pay?.counselor_amount + pay?.commission_amount}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <p className="text-sm text-gray-500">Expenses</p>
            <p className="text-xl font-semibold">${pay?.counselor_amount}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <p className="text-sm text-gray-500">Profit</p>
            <p className="text-xl font-semibold">${pay?.commission_amount}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <p className="text-sm text-gray-500">Active Counselors</p>
            <p className="text-xl font-semibold">{councelorCount}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <p className="text-sm text-gray-500">Active Students</p>
            <p className="text-xl font-semibold">{studentCount}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <p className="text-sm text-gray-500">Total Bookings</p>
            <p className="text-xl font-semibold">{bookingCount}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Booking by Status */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Booking by Status</h2>
            <ul className="space-y-2">
              {statusCount.map((item, index) => (
                <li key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${item.color}`}></span>
                    <span>{item.label}</span>
                  </div>
                  <span className="font-semibold">{item.count}</span>
                </li>
              ))}
            </ul>
          </div>


          <div className="bg-white shadow rounded-lg p-4 h-64 flex items-center justify-center">



            <ChartContainer config={chartConfig} className="h-[100%] w-full">
              <BarChart data={formattedChartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="revenue" fill="#1fcc00" radius={4} />
                <Bar dataKey="expense" fill="#ff0000" radius={4} />
              </BarChart>
            </ChartContainer>



          </div>
        </div>
      </div>
      <AdminRequest />
    </>
  )
}

export default AdminDahboard