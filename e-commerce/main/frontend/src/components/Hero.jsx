 import React, { useEffect, useRef } from 'react';
import { FaCircle } from "react-icons/fa";
import gsap from 'gsap';

function Hero({ heroData, heroCount, setHeroCount }) {
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const dotsRef = useRef([]);

  useEffect(() => {
    // Animate text when heroCount changes
    gsap.fromTo(text1Ref.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
    
    gsap.fromTo(text2Ref.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, delay: 0.2, duration: 0.8, ease: 'power3.out' }
    );
    
    // Animate dots
    dotsRef.current.forEach((dot, i) => {
      gsap.fromTo(dot, 
        { scale: 0.7, opacity: 0.5 }, 
        { scale: 1, opacity: 1, delay: 0.1 * i, duration: 0.3, ease: 'back.out(1.7)' }
      );
    });
  }, [heroCount]);

  return (
    <div className="w-full md:w-[60%] lg:w-[40%] h-full relative">
      {/* Hero Text */}
      <div className="absolute text-[#0c7f99] left-[10%] top-[10%] md:top-[90px] lg:top-[130px] space-y-2">
        <p ref={text1Ref} className="text-lg md:text-3xl lg:text-5xl font-bold leading-tight drop-shadow">
          {heroData.text1}
        </p>
        <p ref={text2Ref} className="text-base md:text-xl lg:text-3xl font-medium drop-shadow-sm">
          {heroData.text2}
        </p>
      </div>

      {/* Dots Navigation */}
      <div className="absolute md:top-[400px] lg:top-[500px] top-[160px] left-[10%] flex items-center justify-center gap-[10px]">
        {[0, 1, 2, 3].map((i) => (
          <FaCircle
            key={i}
            ref={el => dotsRef.current[i] = el}
            className={`w-[14px] cursor-pointer transition-all duration-300 ${heroCount === i ? "fill-orange-400" : "fill-white"}`}
            onClick={() => setHeroCount(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default Hero;
