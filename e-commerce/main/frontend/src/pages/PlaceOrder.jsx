import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import razopay from "../assets/rozo.jpg";
import { shopDataContext } from '../context/ShopContext';
import { authDataContext } from '../context/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PlaceOrder() {
  const [method, setMethod] = useState('cod');
  let navigate=useNavigate()
  const { cartItem, setCartItem, getCartAmount, delivery_fee, product:products } = useContext(shopDataContext);
  const { serverUrl } = useContext(authDataContext);

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData(data => ({ ...data, [name]: value }));

  };

 const initPay = (order) => {
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: "Order Payment",
    description: "Pay securely with Razorpay",
    order_id: order.id, // Must be order.id, not receipt
    handler: async (response) => {
      console.log("✅ Razorpay Payment Success:", response);
   
      // navigate("/order");
      const{data} =await axios.post(serverUrl + '/api/order/verifyrazorpay',response,{withCredentials:true})
      if(data){
        navigate("/order")
           setCartItem({});
      }
    },
    prefill: {
      name: formData.firstname + " " + formData.lastname,
      email: formData.email,
      contact: formData.phone
    },
    theme: { color: "#3399cc" }
  };
console.log("⚙️ Razorpay config:", options);

  const rzp = new window.Razorpay(options);
  rzp.open();
};

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let orderItems = [];

      for (const productId in cartItem) {
        for (const size in cartItem[productId]) {
          if (cartItem[productId][size] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === productId));
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItem[productId][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        paymentMethod: method,
        status: 'Placed' // ✅ Required by backend
      };

      switch (method) {
        case 'cod':
          const result = await axios.post(`${serverUrl}/api/order/placeorder`, orderData, { withCredentials: true });
          console.log('✅ Order placed:', result.data);
         if(result.data){
            setCartItem({})
            navigate("/order")
         }else{
            console.log(result.data.message);
            
         }

         
          break;

        case 'razorpay':
          const resultRazorpay =await axios.post(serverUrl + "/api/order/razorpay",orderData,{withCredentials:true})
          if(resultRazorpay.data){
            console.log(resultRazorpay.data);
            initPay(resultRazorpay.data);
            
          }
          break;

        default:
          console.warn('Unknown payment method');
          break;
      }

    } catch (error) {
      console.error('❌ Error placing order:', error);
    }
  };

  return (
    <div className='w-[100vw] min-h-[100vh] flex items-center justify-center md:flex-row flex-col gap-[50px] relative bg-gradient-to-l from-[#141414] to-[#0c2025]'>
      {/* Form */}
      <div className='lg:w-[50%] w-[100%] h-[100%] mt-[90px] flex items-center justify-center lg:mt-[0px]'>
        <form onSubmit={onSubmitHandler} className='lg:w-[70%] w-[95%]'>
          <div className='py-[10px]'>
            <Title text1={'DELIVERY'} text2={'INFORMATION'} />
          </div>

          <div className='w-full flex gap-4 px-2 mb-3'>
            <input type="text" name="firstname" value={formData.firstname} onChange={onChangeHandler} placeholder='First name' className='w-1/2 h-[50px] bg-slate-700 text-white px-[20px] rounded-md shadow' required />
            <input type="text" name="lastname" value={formData.lastname} onChange={onChangeHandler} placeholder='Last name' className='w-1/2 h-[50px] bg-slate-700 text-white px-[20px] rounded-md shadow' required />
          </div>

          <div className='w-full px-2 mb-3'>
            <input type="email" name="email" value={formData.email} onChange={onChangeHandler} placeholder='Email address' className='w-full h-[50px] bg-slate-700 text-white px-[20px] rounded-md shadow' required />
          </div>

          <div className='w-full px-2 mb-3'>
            <input type="text" name="street" value={formData.street} onChange={onChangeHandler} placeholder='Street' className='w-full h-[50px] bg-slate-700 text-white px-[20px] rounded-md shadow' required />
          </div>

          <div className='w-full flex gap-4 px-2 mb-3'>
            <input type="text" name="city" value={formData.city} onChange={onChangeHandler} placeholder='City' className='w-1/2 h-[50px] bg-slate-700 text-white px-[20px] rounded-md shadow' required />
            <input type="text" name="state" value={formData.state} onChange={onChangeHandler} placeholder='State' className='w-1/2 h-[50px] bg-slate-700 text-white px-[20px] rounded-md shadow' required />
          </div>

          <div className='w-full flex gap-4 px-2 mb-3'>
            <input type="text" name="pincode" value={formData.pincode} onChange={onChangeHandler} placeholder='Pincode' className='w-1/2 h-[50px] bg-slate-700 text-white px-[20px] rounded-md shadow' required />
            <input type="text" name="country" value={formData.country} onChange={onChangeHandler} placeholder='Country' className='w-1/2 h-[50px] bg-slate-700 text-white px-[20px] rounded-md shadow' required />
          </div>

          <div className='w-full px-2 mb-6'>
            <input type="text" name="phone" value={formData.phone} onChange={onChangeHandler} placeholder='Phone' className='w-full h-[50px] bg-slate-700 text-white px-[20px] rounded-md shadow' required />
          </div>

          <div className='text-center'>
            <button type='submit' className='bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg text-lg shadow'>
              PLACE ORDER
            </button>
          </div>
        </form>
      </div>

      {/* Cart & Payment */}
      <div className='lg:w-[50%] w-[100%] min-h-[100%] flex items-center justify-center gap-[30px]'>
        <div className='lg:w-[70%] w-[90%] flex flex-col items-center justify-center gap-[10px]'>
          <CartTotal />

          <div className='py-[10px]'>
            <Title text1={'PAYMENT'} text2={'METHOD'} />
          </div>

          <div className='w-full h-[100px] flex items-center justify-center gap-[50px]'>
            <button type="button" onClick={() => setMethod('razorpay')} className={`w-[150px] h-[50px] ${method === 'razorpay' ? 'border-[5px] border-blue-900' : ''}`}>
              <img src={razopay} alt="Razorpay" className='w-full h-full object-cover rounded-sm' />
            </button>

            <button type="button" onClick={() => setMethod('cod')} className={`w-[200px] h-[50px] bg-gradient-to-t from-[#95b3f8] to-white text-sm px-[20px] rounded-sm text-[#332f6f] font-bold ${method === 'cod' ? 'border-[5px] border-blue-900' : ''}`}>
              CASH ON DELIVERY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
