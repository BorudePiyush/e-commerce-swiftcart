import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import { shopDataContext } from '../context/ShopContext';
import { authDataContext } from '../context/authContext';
import axios from 'axios';

function Order() {
  const [orderData, setOrderData] = useState([]);
  const { currency } = useContext(shopDataContext);
  const { serverUrl } = useContext(authDataContext);

  const loadOrderData = async () => {
    try {
      const result = await axios.post(
        serverUrl + '/api/order/userorder',
        {},
        { withCredentials: true }
      );

      if (result.data) {
        let allOrdersItem = [];
        result.data.forEach((order) => {
          order.items.forEach((item) => {
            item.status = order.status;
            item.payment = order.payment;
            item.paymentMethod = order.paymentMethod;
            item.date = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, []);

  // Robust matching logic to ensure tracker doesn't break
  const getNormalizedStatusIndex = (status) => {
    if (!status) return -1;
    const normalized = status.toLowerCase();

    if (normalized.includes('place')) return 0;
    if (normalized.includes('pack')) return 1;
    if (normalized.includes('ship')) return 2;
    if (normalized.includes('out')) return 3;
    if (normalized.includes('deliver')) return 4;

    return -1;
  };

  const statusSteps = [
    'Order Placed',
    'Packing',
    'Shipped',
    'Out for delivery',
    'Delivered'
  ];

  return (
    <div className='w-[99vw] min-h-[100vh] p-[20px] pb-[150px] bg-gradient-to-l from-[#141414] to-[#0c2025]'>
      <div className='text-center mt-[180px]'>
        <Title text1='MY' text2='ORDER' />
      </div>

      <div className='w-full flex flex-col gap-[20px] mt-10'>
        {orderData.length === 0 ? (
          <p className='text-white text-center'>No orders found.</p>
        ) : (
          orderData.map((item, index) => (
            <div
              key={index}
              className='w-full flex items-start gap-6 bg-[#51808048] py-4 px-6 rounded-2xl text-white shadow-lg'
            >
              <img
                src={item.image1}
                alt='Product'
                className='w-[130px] h-[130px] object-cover rounded-md'
              />

              <div className='flex flex-col gap-3 w-full'>
                <p className='text-xl font-semibold'>{item.name}</p>
                <p>Price: {currency} {item.price}</p>
                <p>Payment: {item.payment ? 'Paid' : 'Pending'} ({item.paymentMethod})</p>
                <p>Date: {new Date(item.date).toLocaleString()}</p>

                {/* Order Status Tracker */}
                <div className='mt-2'>
                  <p className='mb-1 font-semibold'>Tracking:</p>
                  <div className='flex items-center gap-2 flex-wrap'>
                    {statusSteps.map((step, idx) => {
                      const currentStatusIndex = getNormalizedStatusIndex(item.status);
                      const isCompleted = idx <= currentStatusIndex;

                      return (
                        <div key={idx} className='flex items-center gap-1'>
                          <div
                            className={`w-4 h-4 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-gray-400'}`}
                          ></div>
                          <span className='text-sm'>{step}</span>
                          {idx < statusSteps.length - 1 && (
                            <div
                              className={`w-6 h-[2px] ${isCompleted ? 'bg-green-500' : 'bg-gray-500'} mx-1`}
                            ></div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Order;
