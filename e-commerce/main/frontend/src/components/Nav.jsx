import React, { useContext, useState, useRef, useEffect } from 'react';
import logo from '../assets/logof.png';
import { IoSearchCircleOutline, IoSearchCircleSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { RiContactsLine } from "react-icons/ri";
import { BsMoon, BsSun } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userDataContext } from '../context/UserContext';
import { authDataContext } from '../context/authContext';
import { shopDataContext } from '../context/ShopContext';
import { ThemeContext } from '../context/ThemeContext';
import gsap from 'gsap';

function Nav() {
  const { getCurrentUser, userData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const { showSearch, setShowSearch, search, setSearch, getCartCount } = useContext(shopDataContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const logoRef = useRef(null);
  const navRef = useRef(null);
  const iconsRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    gsap.from(logoRef.current, { opacity: 0, x: -50, duration: 1, ease: 'power2.out' });
    gsap.from(navRef.current, { opacity: 0, y: -20, duration: 1, delay: 0.3, ease: 'power2.out' });
    gsap.from(iconsRef.current, { opacity: 0, y: -20, duration: 1, delay: 0.5, ease: 'power2.out' });
  }, []);

  useEffect(() => {
    if (showProfile && profileRef.current) {
      gsap.fromTo(profileRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'power1.out' });
    }
  }, [showProfile]);

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true });
      getCurrentUser();
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 shadow-md bg-white/80 dark:bg-[#111] backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-[1440px] mx-auto px-4 py-3 flex justify-between items-center">
        <div ref={logoRef} className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <img src={logo} alt="logo" className="w-8" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            SwiftCart
          </h1>
        </div>

        <nav ref={navRef} className="hidden md:flex gap-6 text-sm font-medium text-gray-700 dark:text-gray-200">
          {['Home', 'Collection', 'About', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => navigate(`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`)}
              className="hover:text-black dark:hover:text-white hover:underline underline-offset-4 transition-all"
            >
              {item}
            </button>
          ))}
        </nav>

        <div ref={iconsRef} className="flex items-center gap-4 relative">
          {!showSearch ? (
            <IoSearchCircleSharp className="w-7 h-7 text-gray-800 dark:text-white cursor-pointer" onClick={() => { setShowSearch(true); navigate("/collection"); }} />
          ) : (
            <IoSearchCircleOutline className="w-7 h-7 text-gray-800 dark:text-white cursor-pointer" onClick={() => setShowSearch(false)} />
          )}

          <button onClick={toggleTheme} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition" title="Toggle Theme">
            {theme === "dark" ? <BsSun className="text-yellow-400 text-lg" /> : <BsMoon className="text-blue-600 text-lg" />}
          </button>

          {!userData ? (
            <FaUserCircle className="w-7 h-7 text-gray-800 dark:text-white cursor-pointer" onClick={() => setShowProfile(!showProfile)} />
          ) : (
            <div className="w-8 h-8 bg-gray-800 text-white text-sm flex items-center justify-center rounded-full cursor-pointer" onClick={() => setShowProfile(!showProfile)}>
              {userData.name.slice(0, 1).toUpperCase()}
            </div>
          )}

          <div className="relative">
            <MdOutlineShoppingCart className="w-7 h-7 text-gray-800 dark:text-white cursor-pointer hidden md:block" onClick={() => navigate("/cart")} />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] px-1 rounded-full">
                {getCartCount()}
              </span>
            )}
          </div>
        </div>
      </div>

      {showSearch && (
        <div className="w-full px-4 py-2 bg-[#e8f8fa] dark:bg-[#222] flex justify-center">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full md:w-[50%] px-6 py-2 rounded-full text-white bg-[#1a373c] dark:bg-gray-800 placeholder:text-white/70 dark:placeholder:text-gray-400 outline-none"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
      )}

      {showProfile && (
        <div ref={profileRef} className="absolute top-[70px] right-5 w-52 bg-white dark:bg-gray-900 shadow-xl rounded-xl border border-gray-200 dark:border-gray-700 z-40">
          <ul className="text-sm text-gray-700 dark:text-gray-200">
            {!userData && (
              <li className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={() => { navigate("/login"); setShowProfile(false); }}>
                Login
              </li>
            )}
            {userData && (
              <li className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={() => { handleLogout(); setShowProfile(false); }}>
                Logout
              </li>
            )}
            <li className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={() => { navigate("/order"); setShowProfile(false); }}>Orders</li>
            <li className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={() => { navigate("/about"); setShowProfile(false); }}>
              About
            </li>
          </ul>
        </div>
      )}

      <div className="fixed bottom-0 left-0 w-full md:hidden h-[65px] bg-[#191818] text-white flex items-center justify-around z-40">
        <button onClick={() => navigate("/")} className="flex flex-col items-center">
          <IoMdHome className="w-5 h-5" />
          <span className="text-xs">Home</span>
        </button>
        <button onClick={() => navigate("/collection")} className="flex flex-col items-center">
          <HiOutlineCollection className="w-5 h-5" />
          <span className="text-xs">Collection</span>
        </button>
        <button onClick={() => navigate("/contact")} className="flex flex-col items-center">
          <RiContactsLine className="w-5 h-5" />
          <span className="text-xs">Contact</span>
        </button>
        <button className="relative flex flex-col items-center" onClick={() => navigate("/cart")}>
          <MdOutlineShoppingCart className="w-5 h-5" />
          <span className="text-xs">Cart</span>
          {getCartCount() > 0 && (
            <span className="absolute top-0 right-[-6px] bg-white text-black text-[10px] px-1 rounded-full">
              {getCartCount()}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

export default Nav;