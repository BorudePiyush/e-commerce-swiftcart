import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { shopDataContext } from '../context/ShopContext';
import { RiDeleteBin6Line } from "react-icons/ri";
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import gsap from 'gsap';
import { toast } from 'react-toastify';

function Cart() {
  const { product, currency, cartItem, UpdateQuantity } = useContext(shopDataContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    for (const productId in cartItem) {
      for (const size in cartItem[productId]) {
        const quantity = cartItem[productId][size];
        if (quantity > 0) {
          tempData.push({
            _id: productId,
            size: size,
            quantity: quantity,
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItem]);

  useEffect(() => {
    const items = document.querySelectorAll(".cart-item");
    if (items.length > 0) {
      gsap.from(items, {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out"
      });
    }
  }, [cartData]);

  if (!product || product.length === 0) {
    return <p className="text-white text-center mt-10 text-lg animate-pulse">⏳ Loading products...</p>;
  }

  return (
    <div className='w-[99vw] min-h-[100vh] p-[20px] overflow-hidden bg-gradient-to-l from-[#141414] to-[#0c2025]'>
      <div className='h-[8%] w-[100%] text-center mt-[80px]'>
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div className='w-full h-full flex flex-col gap-6 mt-8'>
        {cartData.length === 0 ? (
          <p className="text-white text-center mt-10 text-lg">🛒 Your cart is empty.</p>
        ) : (
          cartData.map((item, index) => {
            const productData = product.find(p => p._id === item._id);

            if (!productData) {
              return (
                <div key={index} className="text-red-400 text-sm border p-4 rounded bg-[#1c1c1c]">
                  ⚠️ Product with ID `{item._id}` not found.
                </div>
              );
            }

            return (
              <div key={index} className='cart-item border border-gray-600 rounded-xl p-4 text-white flex flex-col md:flex-row justify-between items-center shadow-md bg-white/5 backdrop-blur-md hover:scale-[1.01] transition-all duration-300'>
                <div className='flex items-center gap-4 w-full md:w-2/3'>
                  <img
                    src={productData.image1 || '/fallback.jpg'}
                    onError={(e) => e.target.src = '/fallback.jpg'}
                    alt={productData.name}
                    className='w-20 h-20 object-cover rounded-md shadow-md border border-white/10'
                  />
                  <div>
                    <h2 className='text-lg font-semibold'>{productData.name}</h2>
                    <p className='text-sm text-cyan-300'>Size: {item.size}</p>
                    <p className='text-sm'>Price: {currency}{productData.price}</p>
                  </div>
                </div>

                <div className='flex items-center gap-4 mt-4 md:mt-0'>
                  <button
                    onClick={() => {
                      UpdateQuantity(item._id, item.size, item.quantity - 1);
                      toast.info("Item quantity decreased");
                    }}
                    className='bg-cyan-700 hover:bg-cyan-600 px-3 py-1 rounded-full text-white transition'
                  >−</button>

                  <span className='font-bold'>{item.quantity}</span>

                  <button
                    onClick={() => {
                      UpdateQuantity(item._id, item.size, item.quantity + 1);
                      toast.success("Item quantity increased");
                    }}
                    className='bg-cyan-700 hover:bg-cyan-600 px-3 py-1 rounded-full text-white transition'
                  >+</button>

                  <button
                    onClick={() => {
                      UpdateQuantity(item._id, item.size, 0);
                      toast.error("Item removed from cart");
                    }}
                    className='text-red-400 hover:text-red-300 transition'
                  >
                    <RiDeleteBin6Line className='w-6 h-6' />
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Checkout Section */}
      <div className='flex justify-center items-end mt-16'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <button
            className='mt-6 w-full text-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-3 rounded-full shadow-lg transition-all duration-300'
            onClick={() => {
              if (cartData.length > 0) {
                navigate("/placeorder");
              } else {
                toast.warning("Your cart is empty!");
              }
            }}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
