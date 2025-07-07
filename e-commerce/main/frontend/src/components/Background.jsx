import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import background1 from '../assets/ban5.png';
import background2 from '../assets/ban2.png';
import background3 from '../assets/ban3.png';
import background4 from '../assets/ban4.png';

function Background({ heroCount }) {
  const bgRef = useRef(null);

  // Select image based on heroCount
  const backgrounds = [background1, background2, background3, background4];
  const currentBackground = backgrounds[heroCount] || background1;

  useEffect(() => {
    // Animate the image on heroCount change
    gsap.fromTo(
      bgRef.current,
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }
    );
  }, [heroCount]);

  return (
    <img
      ref={bgRef}
      src={currentBackground}
      alt="Hero Background"
      className="w-full h-full object-cover absolute top-0 left-0 z-0 transition-all duration-500"
    />
  );
}

export default Background;
