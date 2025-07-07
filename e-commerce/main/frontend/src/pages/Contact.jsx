import React, { useEffect, useRef } from 'react';
import Title from '../components/Title';
import tech from "../assets/contact.us.mp4";
import NewLetterBox from '../components/NewLetterBox';
import gsap from 'gsap';

function Contact() {
  const videoRef = useRef(null);
  const infoRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    gsap.from(videoRef.current, {
      x: -100,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    });

    gsap.from(infoRef.current, {
      x: 100,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: "power2.out"
    });

    gsap.from(buttonRef.current, {
      scale: 0.8,
      opacity: 0,
      delay: 0.8,
      duration: 0.8,
      ease: "back.out(1.7)"
    });
  }, []);

  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-[#0f172a] to-[#0c4a6e] pt-20 flex flex-col items-center text-white'>

      {/* Title */}
      <Title text1="CONTACT" text2="US" />

      {/* Content Section */}
      <div className='w-full flex flex-col lg:flex-row items-center justify-center px-6 lg:px-16 py-10 gap-10'>

        {/* Video */}
        <div ref={videoRef} className='lg:w-[50%] w-full flex justify-center'>
          <video
            muted
            autoPlay
            loop
            src={tech}
            className='w-[90%] max-w-[500px] rounded-xl shadow-2xl border border-white/10'
          />
        </div>

        {/* Contact Details */}
        <div ref={infoRef} className='lg:w-[50%] w-full flex flex-col gap-4'>

          {/* Store Info */}
          <div>
            <h3 className='text-lg lg:text-xl font-bold text-cyan-300 mb-1'>Our Store</h3>
            <p className='text-gray-300 text-sm md:text-base'>
              12345 Random Station<br />
              Random City, State, India
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className='text-lg lg:text-xl font-bold text-cyan-300 mb-1'>Contact Us</h3>
            <p className='text-gray-300 text-sm md:text-base'>
              Phone: +91-9307342318<br />
              Email: <span className='underline'>admin@swiftcart.com</span>
            </p>
          </div>

          {/* Career Section */}
          <div className='mt-4'>
            <h3 className='text-lg lg:text-xl font-bold text-cyan-300 mb-1'>Careers at SwiftCart</h3>
            <p className='text-gray-300 text-sm md:text-base mb-4'>
              Learn more about our team and exciting job openings.
            </p>
            <button
              ref={buttonRef}
              className='bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-md transition'
            >
              Explore Jobs
            </button>
          </div>

        </div>
      </div>

      {/* Newsletter */}
      <NewLetterBox />
    </div>
  );
}

export default Contact;
