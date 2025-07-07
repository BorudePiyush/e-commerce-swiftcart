import React, { useState, useEffect, useContext } from 'react';
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { SiEbox } from "react-icons/si";

function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { serverUrl } = useContext(authDataContext);

  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      const result = await axios.post(serverUrl + "/api/order/list", {}, { withCredentials: true });
      setOrders(result.data.reverse());
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setLoading(false);
    }
  };


  const statusHandler =async(e, orderId)=>{
    try {
      const result= await axios.post(serverUrl + "/api/order/status",{orderId,status:e.target.value},{withCredentials:true})
      if(result.data){
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error);
      
      
    }
  }
  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white'>
      <Nav />
      <div className='w-full h-full flex items-start lg:justify-center'>
        <Sidebar />
        <div className='lg:w-[85%] md:w-[70%] h-full lg:ml-[310px] md:ml-[250px] mt-[70px] flex flex-col gap-8 overflow-x-hidden py-[50px] px-4'>

          <h2 className='text-2xl md:text-4xl font-semibold mb-4 text-white'>ALL Orders List</h2>

          {loading ? (
            <p className="text-gray-300 text-lg">Loading orders...</p>
          ) : orders.length === 0 ? (
            <p className="text-gray-400 text-xl">No orders found.</p>
          ) : (
            orders.map((order, index) => (
              <div key={order._id || index} className='w-full bg-[#2c3e50] rounded-xl flex items-start gap-4 p-4 text-sm text-white'>

                {/* Product Icon */}
                <SiEbox className='w-12 h-12 text-black p-1.5 bg-white rounded-lg' />

                {/* Order Info */}
                <div className='flex flex-col md:flex-row justify-between w-full'>

                  {/* Left: Product + Address */}
                  <div className='flex flex-col gap-1 w-full md:w-[70%]'>
                    {/* Product Items */}
                    <p className='text-[#56dbfc] font-semibold'>
                      {order.items?.map((item, idx) => (
                        <span key={idx}>
                          {item.name.toUpperCase()} * {item.quantity} <span>{item.size}</span>
                          {idx < order.items.length - 1 && ", "}
                        </span>
                      ))}
                    </p>

                    {/* Address */}
                    <div className='text-[15px] text-green-100 leading-6'>
                      <p className='font-semibold'>
                        {order.address.firstname} {order.address.lastname}
                      </p>
                      <p>{order.address.street},</p>
                      <p>
                        {order.address.city}, {order.address.state}, {order.address.country} - {order.address.pincode}
                      </p>
                      <p className='text-white font-medium'>{order.address.phone}</p>
                    </div>
                  </div>

                  {/* Right: Order Meta */}
                  <div className='flex flex-col gap-1 mt-4 md:mt-0 text-right w-full md:w-[30%] text-[14px]'>
                    <p>Items : {order.items?.length || 0}</p>
                    <p>Method : {order.paymentMethod || 'COD'}</p>
                    <p>Payment : {order.paymentStatus || 'Pending'}</p>
                    <p>Date : {new Date(order.createdAt).toLocaleDateString('en-GB')}</p>
                    <p className='text-[20px] text-white font-bold'>₹{order.amount.toLocaleString("en-IN")}</p>
                  </div>

                  {/* Order Status Dropdown */}
                 

                </div>
                    <select
                    value={order.status}
                    className='px-[15px] py-[10px] bg-slate-500 rounded-lg border-[1px] border-[#96eef3] mt-4  
                    '
                    onChange={(e)=>statusHandler(e, order._id)}
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Order;
