import React, { useContext, useEffect, useState, useRef } from 'react';
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import Title from '../components/Title';
import { shopDataContext } from '../context/ShopContext';
import Card from '../components/Card';
import gsap from 'gsap';

function Collections() {
  const [showFilter, setShowFilter] = useState(false);
  const { product, search, showSearch } = useContext(shopDataContext);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const contentRef = useRef(null);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productCopy = product.slice();
    if (showSearch && search) {
      productCopy = productCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      productCopy = productCopy.filter(item => category.includes(item.category));
    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory));
    }
    setFilterProduct(productCopy);
  };

  const sortProduct = () => {
    let sorted = [...filterProduct];
    if (sortType === 'low-high') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortType === 'high-low') {
      sorted.sort((a, b) => b.price - a.price);
    } else {
      applyFilter();
      return;
    }
    setFilterProduct(sorted);
  };

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  useEffect(() => {
    setFilterProduct(product);
  }, [product]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch]);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    }
  }, [filterProduct]);

  return (
    <div className='min-h-screen bg-gradient-to-l from-[#0f2027] via-[#203a43] to-[#2c5364] pt-[70px] overflow-x-hidden pb-20'>
      <div className={`fixed z-10 top-[70px] left-0 bg-[#122f3e] md:w-[20vw] w-full p-5 text-[#aaf5fa] border-r border-gray-500 shadow-lg ${showFilter ? "h-fit" : "h-[60px]"} md:h-auto`}>
        <p
          className='text-[22px] font-semibold flex items-center justify-between cursor-pointer md:block'
          onClick={() => setShowFilter(prev => !prev)}
        >
          FILTERS
          <span className='md:hidden ml-2'>
            {showFilter ? <FaChevronDown /> : <FaChevronRight />}
          </span>
        </p>

        <div className={`mt-4 ${showFilter ? "block" : "hidden"} md:block`}>
          <div className='mb-6'>
            <p className='text-lg font-bold mb-2'>Category</p>
            {["Men", "Women", "Kid"].map((cat, i) => (
              <label key={i} className='flex items-center gap-2 text-sm mb-1'>
                <input type="checkbox" value={cat} onChange={toggleCategory} className='accent-cyan-400' />
                {cat}
              </label>
            ))}
          </div>

          <div>
            <p className='text-lg font-bold mb-2'>Sub-Category</p>
            {["TopWear", "BottomWear", "WinterWear"].map((sub, i) => (
              <label key={i} className='flex items-center gap-2 text-sm mb-1'>
                <input type="checkbox" value={sub} onChange={toggleSubCategory} className='accent-cyan-400' />
                {sub}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className='md:ml-[20vw] px-6 mt-10' ref={contentRef}>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8'>
          <Title text1={"ALL"} text2={"COLLECTION"} />
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className='bg-slate-700 text-white px-4 py-2 rounded-md w-[200px] border border-cyan-300'
          >
            <option value="relavent">Sort By: Relevant</option>
            <option value="low-high">Sort By: Low to High</option>
            <option value="high-low">Sort By: High to Low</option>
          </select>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8'>
          {filterProduct.length > 0 ? (
            filterProduct.map((item, index) => (
              <Card
                key={index}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image1}
              />
            ))
          ) : (
            <p className='text-gray-300 text-center col-span-full'>No products match the filters.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Collections;
