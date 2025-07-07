import React, { useState, useContext } from 'react';
import Logo from "../assets/logof.png";
import google from '../assets/with.png';
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { authDataContext } from '../context/authContext';
import { userDataContext } from '../context/UserContext';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { toast } from 'react-toastify';

function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [preload, setPreload] = useState(true);

  const { serverUrl } = useContext(authDataContext);
  const { getCurrentUser } = useContext(userDataContext);
  const navigate = useNavigate();

  // Remove GSAP animation logic – just use timeout to hide loader
  React.useEffect(() => {
    const timer = setTimeout(() => setPreload(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${serverUrl}/api/auth/login`, { email, password }, { withCredentials: true });
      toast.success("Login Successful");
      setTimeout(() => {
        getCurrentUser();
        navigate('/');
      }, 300);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const googlelogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      await axios.post(`${serverUrl}/api/auth/googlelogin`, {
        name: user.displayName,
        email: user.email
      }, { withCredentials: true });

      toast.success("Google Login Successful");
      setTimeout(() => {
        getCurrentUser();
        navigate('/');
      }, 300);
    } catch (err) {
      toast.error("Google login failed. Try again.");
    }
  };

  return (
    <>
      {preload ? (
        <div
          id="preloader"
          className="fixed inset-0 bg-gradient-to-b from-[#0f0c29] to-[#24243e] flex items-center justify-center z-50 transition-opacity duration-300"
        >
          <img src={Logo} alt="Loader" className="w-20 h-20" />
        </div>
      ) : (
        <div className='min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-bl from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans relative overflow-hidden'>

          <div className="absolute w-[300px] h-[300px] bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 top-[-100px] left-[-100px]"></div>
          <div className="absolute w-[400px] h-[400px] bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-25 top-[60%] left-[80%]"></div>

          <div className='w-full h-[80px] px-6 flex items-center gap-4 cursor-pointer z-10' onClick={() => navigate("/")}>
            <img src={Logo} alt="Logo" className='w-[60px] drop-shadow-md hover:scale-105 transition-transform duration-300' />
            <h1 className='text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-wide'>
              SWIFT CART
            </h1>
          </div>

          <div className='text-center my-6 z-10'>
            <h2 className='text-4xl font-bold tracking-tight mb-2'>Welcome Back!</h2>
            <p className='text-gray-300'>Login to continue shopping with Swift Cart!</p>
          </div>

          <form onSubmit={handleLogin} className='w-[90%] max-w-[500px] px-8 py-10 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 flex flex-col items-center gap-6 z-10'>
            <button type="button" onClick={googlelogin} className='w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-md'>
              <img src={google} alt="Google" className='w-5 h-5' />
              <span className='text-white font-medium tracking-wide'>Continue with Google</span>
            </button>

            <div className='flex items-center w-full gap-3 text-gray-400 text-sm'>
              <div className='flex-1 h-px bg-white/20'></div>
              OR
              <div className='flex-1 h-px bg-white/20'></div>
            </div>

            <input
              type="email"
              placeholder="Email"
              className='w-full px-5 py-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400'
              required
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

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

            <button
              type="submit"
              disabled={loading}
              className='w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 font-semibold text-white tracking-wide shadow-lg disabled:opacity-50'
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className='text-sm text-gray-300'>
              Don’t have an account?
              <span className='ml-2 text-blue-400 hover:underline cursor-pointer font-medium' onClick={() => navigate("/signup")}>Create Account</span>
            </p>
          </form>
        </div>
      )}
    </>
  );
}

export default Login;
