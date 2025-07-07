import React, { useState, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import Nav from '../components/Nav';
import upset from "../assets/upload.jpg";
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import Loading from '../components/Loading';
import {toast} from 'react-toastify'

function Add() {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("TopWear");
  const [sizes, setSizes] = useState([]);
  const [loading,setLoading]=useState(false)
  const [bestseller, setBestseller] = useState(false);

  const { serverUrl } = useContext(authDataContext);

  const handleAddProduct = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("image1", image1);
      formData.append("image2", image2);
      formData.append("image3", image3);
      formData.append("image4", image4);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestseller", bestseller);

     const result = await axios.post(`${serverUrl}/api/product/addproduct`, formData, {
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data'
  }

});

      console.log(result.data);
      toast.success("ADD Product Sucessfully")
      setLoading(false)
      if (result.data) {
        setName("");
        setDescription("");
        setPrice("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setBestseller(false);
        setCategory("Men");
        setSubCategory("TopWear");
        setSizes([]);
      }
    } catch (error) {
      console.error(error);
      setLoading(false)
      toast.error("ADD PRODUCT FAILED")
    }
  };

  return (
    <div className='w-screen h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white overflow-x-hidden flex relative'>
      <Nav />
      <Sidebar />

      <div className='w-[82%] h-full overflow-y-auto absolute right-0 px-6 py-8'>
        <form onSubmit={handleAddProduct} className='flex flex-col gap-8'>
          <h1 className='text-3xl md:text-4xl font-bold'>Add Product Page</h1>

          {/* Image Upload */}
          <div>
            <p className='text-xl md:text-2xl font-semibold mb-2'>Upload Product Images</p>
            <div className='flex gap-4'>
              {[image1, image2, image3, image4].map((img, i) => (
                <label key={i} htmlFor={`image${i + 1}`} className='cursor-pointer w-24 h-24'>
                  <img
                    src={!img ? upset : URL.createObjectURL(img)}
                    alt=""
                    className='w-full h-full object-cover border-2 border-white rounded-lg'
                  />
                  <input
                    type="file"
                    id={`image${i + 1}`}
                    hidden
                    required
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (i === 0) setImage1(file);
                      if (i === 1) setImage2(file);
                      if (i === 2) setImage3(file);
                      if (i === 3) setImage4(file);
                    }}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <p className='text-xl md:text-2xl font-semibold mb-2'>Product Name</p>
            <input
              type="text"
              placeholder='Product Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className='w-full md:w-[600px] bg-slate-600 border-2 border-white rounded-lg px-4 py-2 text-lg placeholder:text-white/80'
            />
          </div>

          {/* Description */}
          <div>
            <p className='text-xl md:text-2xl font-semibold mb-2'>Product Description</p>
            <textarea
              placeholder='Description...'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='w-full md:w-[600px] h-24 bg-slate-600 border-2 border-white rounded-lg px-4 py-2 text-lg placeholder:text-white/80'
            />
          </div>

          {/* Category and Subcategory */}
          <div className='flex flex-wrap gap-8'>
            <div>
              <p className='text-xl md:text-2xl font-semibold mb-2'>Product Category</p>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className='bg-slate-600 border-2 border-white rounded-lg px-4 py-2 text-lg'
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kid">Kid</option>
              </select>
            </div>
            <div>
              <p className='text-xl md:text-2xl font-semibold mb-2'>Sub-Category</p>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className='bg-slate-600 border-2 border-white rounded-lg px-4 py-2 text-lg'
              >
                <option value="TopWear">TopWear</option>
                <option value="BottomWear">BottomWear</option>
                <option value="WinterWear">WinterWear</option>
              </select>
            </div>
          </div>

          {/* Price */}
          <div>
            <p className='text-xl md:text-2xl font-semibold mb-2'>Product Price</p>
            <input
              type="number"
              placeholder='2000'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className='w-full md:w-[600px] bg-slate-600 border-2 border-white rounded-lg px-4 py-2 text-lg placeholder:text-white/80'
            />
          </div>

          {/* Sizes */}
          <div>
            <p className='text-xl md:text-2xl font-semibold mb-2'>Product Sizes</p>
            <div className='flex flex-wrap gap-4'>
              {["S", "M", "L", "XL", "XXL"].map(size => (
                <div
                  key={size}
                  onClick={() => setSizes(prev =>
                    prev.includes(size)
                      ? prev.filter(s => s !== size)
                      : [...prev, size]
                  )}
                  className={`px-4 py-2 rounded-lg border-2 cursor-pointer text-lg ${
                    sizes.includes(size)
                      ? "bg-green-400 text-black border-[#46d1f7]"
                      : "bg-slate-600 border-white"
                  }`}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          {/* Bestseller Checkbox */}
          <div className='flex items-center gap-4'>
            <input
              type="checkbox"
              id="bestseller"
              checked={bestseller}
              onChange={() => setBestseller(prev => !prev)}
              className='w-6 h-6'
            />
            <label htmlFor="bestseller" className='text-lg md:text-xl font-semibold'>
              Add to Bestseller
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className='w-40 px-6 py-3 bg-[#65d8f7] text-black rounded-2xl text-lg font-semibold hover:bg-[#4bbfd9] active:bg-slate-700 active:text-white border-2 border-white transition-all duration-200 cursor-pointer'
          >
           {loading ? <Loading/> :"ADD Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Add;
