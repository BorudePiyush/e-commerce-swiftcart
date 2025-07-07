import React from 'react';
import Title from './Title';
import { RiExchangeFundsLine } from "react-icons/ri";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";

function OurPolicy() {
  const policies = [
    {
      icon: <RiExchangeFundsLine className="w-14 h-14 text-cyan-400 group-hover:scale-110 transition" />,
      title: "Easy Exchange Policy",
      desc: "Exchange Made Easy - Quick, Simple, and Customer-friendly Process.",
    },
    {
      icon: <TbRosetteDiscountCheckFilled className="w-14 h-14 text-cyan-400 group-hover:scale-110 transition" />,
      title: "7-Day Return Policy",
      desc: "Shop with Confidence - 7 Days Easy Return Guarantee.",
    },
    {
      icon: <BiSupport className="w-14 h-14 text-cyan-400 group-hover:scale-110 transition" />,
      title: "Best Customer Support",
      desc: "Trusted Customer Support - Your Satisfaction Is Our Priority.",
    }
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#0f172a] to-[#0c4a6e] flex flex-col items-center py-20 text-white">
      <div className="text-center mb-6">
        <Title text1="OUR" text2="POLICY" />
        <p className="text-sm md:text-lg text-cyan-100 mt-2 px-4 max-w-xl mx-auto">
          Customer-Friendly Policies — Committed to YOUR Satisfaction and Safety
        </p>
      </div>

      <div className="w-full flex flex-wrap justify-center gap-10 px-6">
        {policies.map((policy, i) => (
          <div key={i} className="group w-full max-w-sm bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 text-center border border-white/10">
            <div className="mb-4">{policy.icon}</div>
            <h3 className="text-xl font-bold text-cyan-200">{policy.title}</h3>
            <p className="text-sm text-gray-100 mt-2">{policy.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurPolicy;
