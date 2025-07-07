import React, { useState, useContext, useEffect } from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'

function Home() {
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const { serverUrl } = useContext(authDataContext)

  const fetchCounts = async () => {
    try {
      const productRes = await axios.get(`${serverUrl}/api/product/list`, { withCredentials: true })
      setTotalProducts(productRes.data.length)

      const orderRes = await axios.post(`${serverUrl}/api/order/list`, {}, { withCredentials: true })
      setTotalOrders(orderRes.data.length)
    } catch (error) {
      console.log("Failed to fetch counts", error)
    }
  }

  useEffect(() => {
    fetchCounts()
  }, [])

  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-bl from-[#0f0c29] via-[#302b63] to-[#24243e] text-white relative'>
      <Nav />
      <Sidebar />
      <div className='w-[70vw] h-[100vh] absolute left-[25%] flex items-start justify-start flex-col gap-[40px] py-[100px]'>
        <h1 className='text-[35px] text-[#afe2f2]'>Swiftcart Admin Panel</h1>
        <div className='flex items-center justify-start gap-[50px] flex-col md:flex-row'>
          <div className='text-[#dcfafd] w-[400px] max-w-[90%] h-[200px] bg-[#0000002e] flex items-center justify-center flex-col gap-[20px] rounded-lg shadow-sm shadow-black backdrop:blur-lg md:text-[25px] text-[20px] border-[1px] border-[#969595]'>
            Total No. Products: <span>{totalProducts}</span>
          </div>

          <div className='text-[#dcfafd] w-[400px] max-w-[90%] h-[200px] bg-[#0000002e] flex items-center justify-center flex-col gap-[20px] rounded-lg shadow-sm shadow-black backdrop:blur-lg md:text-[25px] text-[20px] border-[1px] border-[#969595]'>
            Total No. Orders: <span>{totalOrders}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
