import React, { useState, useContext } from 'react';
import Logo from "../assets/logof.png";
import { useNavigate } from "react-router-dom";
import google from '../assets/with.png';
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { authDataContext } from '../context/authContext';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { userDataContext } from '../context/UserContext';

function Registration() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { serverUrl } = useContext(authDataContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { getCurrentUser } = useContext(userDataContext);
  const navigate = useNavigate();

  // Manual Registration
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/registration`,
        { name, email, password },
        { withCredentials: true }
      );
      getCurrentUser();
      navigate('/');
      console.log(result.data);
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google Signup
  const googleSignup = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;

      const name = user.displayName;
      const email = user.email;
      const googleId = user.uid; // ✅ This is what your backend expects

      const result = await axios.post(
        `${serverUrl}/api/auth/googlelogin`,
        { name, email, googleId },
        { withCredentials: true }
      );

      console.log(result.data);
      getCurrentUser();
      navigate('/');
    } catch (error) {
      console.error("Google Signup Error:", error);
      alert("Google login failed.");
    }
  };

  return (
    <div className='min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-bl from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans relative overflow-hidden'>

      {/* Background Circles */}
      <div className="absolute w-[300px] h-[300px] bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse top-[-100px] left-[-100px]"></div>
      <div className="absolute w-[400px] h-[400px] bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-spin-slow top-[60%] left-[80%]"></div>

      {/* Logo & Heading */}
      <div className='w-full h-[80px] px-6 flex items-center gap-4 cursor-pointer z-10' onClick={() => navigate("/")}>
        <img src={Logo} alt="Logo" className='w-[60px] drop-shadow-md hover:scale-105 transition-transform duration-300' />
        <h1 className='text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-wide'>
          SWIFT CART
        </h1>
      </div>

      {/* Heading */}
      <div className='text-center my-6 z-10'>
        <h2 className='text-4xl font-bold tracking-tight mb-2'>Create your account</h2>
        <p className='text-gray-300'>Join Swift Cart and start your shopping journey!</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSignup} className='w-[90%] max-w-[500px] px-8 py-10 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 flex flex-col items-center gap-6 z-10'>

        {/* Google Login Button */}
        <button type="button" onClick={googleSignup} className='w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-md '>
          <img src={google} alt="Google" className='w-5 h-5' />
          <span className='text-white font-medium tracking-wide'>Continue with Google</span>
        </button>

        {/* Divider */}
        <div className='flex items-center w-full gap-3 text-gray-400 text-sm'>
          <div className='flex-1 h-px bg-white/20'></div>
          OR
          <div className='flex-1 h-px bg-white/20'></div>
        </div>

        {/* Name Input */}
        <input
          type="text"
          placeholder="Username"
          className='w-full px-5 py-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400'
          required
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          className='w-full px-5 py-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400'
          required
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <div className='w-full relative'>
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            className='w-full px-5 py-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400'
            required
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {show ? (
            <IoEye className='absolute top-1/2 right-4 transform -translate-y-1/2 text-white cursor-pointer' onClick={() => setShow(false)} />
          ) : (
            <IoEyeOutline className='absolute top-1/2 right-4 transform -translate-y-1/2 text-white cursor-pointer' onClick={() => setShow(true)} />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className='w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 font-semibold text-white tracking-wide shadow-lg disabled:opacity-50'
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        {/* Login Redirect */}
        <p className='text-sm text-gray-300'>
          Already have an account?
          <span className='ml-2 text-blue-400 hover:underline cursor-pointer font-medium' onClick={() => navigate("/login")}>Login</span>
        </p>
      </form>
    </div>
  );
}

export default Registration;
