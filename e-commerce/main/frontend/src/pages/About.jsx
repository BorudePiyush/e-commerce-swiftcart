import React, { useRef } from 'react';
import Title from '../components/Title';
import NewletterBox from '../components/NewletterBox';
import vid from '../assets/about.us.mp4';

function About() {
  const videoRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef([]);

  const features = [
    {
      title: 'QUALITY ASSURANCE',
      text: 'Every product is carefully selected and inspected to meet our high standards of durability, comfort, and style.'
    },
    {
      title: 'CONVENIENCE',
      text: 'Shop anytime, anywhere. Enjoy the comfort of home delivery, secure checkout, and easy returns.'
    },
    {
      title: 'EXCEPTIONAL CUSTOMER SERVICE',
      text: "You're not just a customer — you're family. We provide fast, friendly support to make your shopping experience great."
    }
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#0f172a] to-[#0c4a6e] pt-20 overflow-x-hidden text-white">
      
      {/* Title */}
      <div className="flex justify-center">
        <Title text1="ABOUT" text2="US" />
      </div>

      {/* Video + Text */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 px-6 py-12">
        {/* Video */}
        <div ref={videoRef} className="w-full lg:w-1/2 flex justify-center">
          <video
            src={vid}
            autoPlay
            loop
            muted
            className="w-full max-w-[500px] rounded-xl shadow-2xl border border-white/10"
          />
        </div>

        {/* Text */}
        <div ref={textRef} className="w-full lg:w-1/2 flex flex-col gap-5 text-white">
          <p className="text-base text-gray-300 leading-relaxed text-justify">
            <strong className="text-cyan-300 font-semibold">SwiftCart</strong> is a modern, responsive e-commerce platform designed to deliver a seamless and intuitive shopping experience.
          </p>
          <p className="text-base text-gray-300 leading-relaxed text-justify">
            With speed, simplicity, and elegance in mind, SwiftCart helps users explore curated collections, search in real-time, and shop with confidence in a sleek, user-friendly interface.
          </p>
          <h3 className="text-xl font-bold text-cyan-400 mt-4">Our Mission</h3>
          <p className="text-base text-gray-200 leading-relaxed text-justify">
            To make fashion accessible, affordable, and effortless — blending quality, technology, and personal expression into everyday shopping.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="w-full py-12 bg-gradient-to-br from-[#0c4a6e] to-[#134e4a]">
        <div className="flex justify-center mb-8">
          <Title text1="WHY" text2="CHOOSE US" />
        </div>

        <div className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, i) => (
            <div
              key={i}
              ref={el => {
                if (el) cardsRef.current[i] = el;
              }}
              className="bg-white/5 text-white p-6 rounded-xl shadow-xl backdrop-blur-sm border border-white/10 hover:scale-105 hover:shadow-cyan-400/30 hover:bg-white/10 transition-all duration-300"
            >
              <h4 className="text-lg font-semibold text-cyan-300 mb-3 text-center tracking-wide uppercase">
                {item.title}
              </h4>
              <p className="text-sm text-gray-300 text-center leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <NewletterBox />
    </div>
  );
}

export default About;
