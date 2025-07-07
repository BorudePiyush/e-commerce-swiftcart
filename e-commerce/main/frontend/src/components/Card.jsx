import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { shopDataContext } from '../context/ShopContext';

function Card({ name, image, id, price }) {
  const { currency } = useContext(shopDataContext);
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/productdetail/${id}`)}
      className="bg-[#1e293b] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
    >
      <img
        src={image}
        alt={name}
        onError={(e) => (e.target.src = '/fallback.jpg')}
        className="w-full h-64 object-cover"
      />
      <div className="p-4 text-white">
        <h3 className="font-semibold text-lg truncate">{name}</h3>
        <p className="text-cyan-400 font-bold mt-1">{currency}{price}</p>
      </div>
    </div>
  );
}

export default Card;
