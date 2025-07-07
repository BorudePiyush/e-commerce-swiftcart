import React, { useContext, useEffect, useState } from 'react';
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';

function List() {
  const [list, setList] = useState([]);
  const { serverUrl } = useContext(authDataContext);

  const fetchList = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/product/list");
      setList(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const removelist = async (id) => {
    try {
      const result = await axios.post(`${serverUrl}/api/product/remove/${id}`, {}, { withCredentials: true });
      if (result.data) fetchList();
      else console.log("Failed to remove product");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="w-screen h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white overflow-x-hidden flex relative">
      <Nav />
      <Sidebar />

      <div className="w-full md:ml-[230px] lg:ml-[320px] mt-[70px] px-6 py-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-6">All Listed Products</h1>

        {list?.length > 0 ? (
          list.map((item, index) => (
            <div
              key={index}
              className="w-full md:w-[90%] lg:w-[80%] bg-[#2d2d2d70] rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 p-4 mb-6"
            >
              <img
                src={item.image1}
                className="w-[100px] h-[100px] object-cover rounded-lg"
                alt={item.name}
              />

              <div className="flex flex-col items-start justify-center flex-1">
                <div className="text-lg md:text-xl font-semibold text-[#bef0f3]">{item.name}</div>
                <div className="text-sm md:text-md text-[#bef3da]">{item.category}</div>
                <div className="text-sm md:text-md text-[#bef3da]">₹{item.price}</div>
              </div>

              <button
                onClick={() => removelist(item._id)}
                className="bg-red-600 hover:bg-red-400 text-white font-semibold py-2 px-4 rounded-md text-sm"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <div className="text-white text-lg">No products available</div>
        )}
      </div>
    </div>
  );
}

export default List;
