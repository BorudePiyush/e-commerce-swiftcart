import React from 'react';

function NewletterBox() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Subscribed!');
  };

  return (
    <div className='w-full min-h-[30vh] px-4 py-12 flex items-center justify-center bg-gradient-to-l from-[#141414] to-[#0c2025]'>
      <div className='max-w-3xl w-full flex flex-col items-center gap-4'>
        <p className='text-[20px] md:text-[30px] text-[#a5fafa] font-semibold text-center'>
          Stay in the Loop with Our Newsletter
        </p>

        <p className='text-[14px] md:text-[18px] text-center text-blue-100 font-semibold'>
          Subscribe now and enjoy exclusive savings, special deals, and early access to new collections.
        </p>

        <form
          onSubmit={handleSubmit}
          className='w-full flex flex-col md:flex-row items-center justify-center gap-4 mt-4'
        >
          <input
            type="email"
            placeholder='Enter your email'
            aria-label='Email address'
            className='placeholder:text-black bg-slate-300 w-full md:w-[70%] h-[40px] px-4 rounded-lg shadow-sm shadow-black'
            required
          />
          <button
            type="submit"
            className='bg-cyan-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-cyan-600 transition-all duration-300 w-full md:w-auto'
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewletterBox;
