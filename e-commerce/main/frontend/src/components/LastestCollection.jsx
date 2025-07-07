import React, { useContext } from 'react';
import { shopDataContext } from '../context/ShopContext';
import Card from './Card';
import Title from './Title';

function LatestCollection() {
  const { product } = useContext(shopDataContext);

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#0f172a] to-[#1e3a8a] py-16 px-6">
      {/* Section Title */}
      <div className="text-center mb-12">
        <Title text1="TRENDING" text2="STYLES" />
        <p className="text-gray-300 mt-2 text-lg">Handpicked fresh arrivals you'll love</p>
      </div>

      {/* Product Grid */}
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {product && product.length > 0 ? (
          product.map((item) => (
            <Card
              key={item._id}
              name={item.name}
              image={item.image1}
              id={item._id}
              price={item.price}
            />
          ))
        ) : (
          <p className="text-white col-span-full text-center">No products found.</p>
        )}
      </div>
    </div>
  );
}

export default LatestCollection;
