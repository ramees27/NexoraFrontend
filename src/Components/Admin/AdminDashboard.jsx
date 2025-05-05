import React from 'react'
import AdminRequest from './AdminRequest';
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardContent, CardDescription,CardHeader,CardTitle} from "../ui/card"
import { ChartContainer,ChartTooltip,ChartTooltipContent} from "../ui/chart"

const chartData = [
  { month: "January", revenue: 186, expense: 80 },
  { month: "February", revenue: 305, expense: 200 },
  { month: "March", revenue: 237, expense: 120 },
  { month: "April", revenue: 73, expense: 190 },
  { month: "May", revenue: 209, expense: 130 },
  { month: "June", revenue: 214, expense: 140 },
];
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
  const bookingStatus = [
    { color: "bg-yellow-400", label: "Pending", count: 8 },
    { color: "bg-blue-400", label: "Requested payment", count: 5 },
    { color: "bg-green-500", label: "Completed", count: 5 },
    { color: "bg-gray-400", label: "Cancelled", count: 1 },
    { color: "bg-pink-500", label: "Rejected", count: 4 },
    { color: "bg-purple-400", label: "Upcoming", count: 1 },
  ];
  return (
    <>
    <div className="p-4 md:p-8">
      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-xl font-semibold">₹14000</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Expenses</p>
          <p className="text-xl font-semibold">12600</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Profit</p>
          <p className="text-xl font-semibold">₹1400</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Active Counselors</p>
          <p className="text-xl font-semibold">19</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Active Students</p>
          <p className="text-xl font-semibold">23</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Total Bookings</p>
          <p className="text-xl font-semibold">23</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Booking by Status */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Booking by Status</h2>
          <ul className="space-y-2">
            {bookingStatus.map((item, index) => (
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

        {/* Placeholder for Revenue Chart */}
        <div className="bg-white shadow rounded-lg p-4 h-64 flex items-center justify-center">
      
     
      
        <ChartContainer config={chartConfig} className="h-[100%] w-full">
  <BarChart data={chartData}>
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
    <AdminRequest/>
    </>
  )
}

export default AdminDahboard