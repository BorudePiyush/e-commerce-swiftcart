import React, { useContext, useEffect, useState } from 'react';
import Title from './Title';
import Card from './Card';
import { shopDataContext } from '../context/ShopContext';

function BestSeller() {
  const { product } = useContext(shopDataContext);
  const [bestseller, setBestseller] = useState([]);

  useEffect(() => {
    const filterProduct = product.filter(item => item.bestseller);
    setBestseller(filterProduct.slice(0, 4)); // Show top 4 bestsellers
  }, [product]);

  return (
    <div className="w-full py-16 px-4 bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] text-white">
      {/* Section Heading */}
      <div className="text-center mb-10">
        <Title text1="BEST" text2="SELLER" />
        <p className="text-blue-100 mt-2 text-sm md:text-lg">
          Tried, Loved — Discover Our All-Time Best Sellers.
        </p>
      </div>

      {/* Best Sellers Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {bestseller.length > 0 ? (
          bestseller.map((item, index) => (
            <Card
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image1}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-300">No best sellers yet.</p>
        )}
      </div>
    </div>
  );
}

export default BestSeller;
