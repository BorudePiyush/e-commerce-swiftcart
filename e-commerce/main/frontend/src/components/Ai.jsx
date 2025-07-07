import React, { useContext, useState } from 'react';
import robot from "../assets/airobot.gif";
import { shopDataContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import sound from "../assets/swift-sound.mp3";

function Ai() {
  const { showSearch, setShowSearch } = useContext(shopDataContext);
  const navigate = useNavigate();
  const [activeAi, setActiveAi] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [hasWelcomed, setHasWelcomed] = useState(false);

  const openingSound = new Audio(sound);

  const speak = (message) => {
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  };

  const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = speechRecognition ? new speechRecognition() : null;

  if (!recognition) {
    console.log("❌ Speech recognition not supported in this browser.");
  }

  const handleVoiceCommand = () => {
    if (!recognition) return;

    recognition.start();
    openingSound.play();
    setActiveAi(true);

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript.trim().toLowerCase();

      if (transcript.includes("search") && transcript.includes("open") && !showSearch) {
        speak("Opening search");
        setShowSearch(true);
        navigate("/collection");
      } else if (transcript.includes("search") && transcript.includes("close") && showSearch) {
        speak("Closing search");
        setShowSearch(false);
      } else if (transcript.includes("collection") || transcript.includes("products")) {
        speak("Opening collection page");
        navigate("/collection");
      } else if (transcript.includes("about")) {
        speak("Opening about page");
        navigate("/about");
        setShowSearch(false);
      } else if (transcript.includes("home")) {
        speak("Opening home page");
        navigate("/");
        setShowSearch(false);
      } else if (transcript.includes("cart")) {
        speak("Opening your cart");
        navigate("/cart");
        setShowSearch(false);
      } else if (transcript.includes("contact")) {
        speak("Opening contact page");
        navigate("/contact");
        setShowSearch(false);
      } else if (transcript.includes("order") || transcript.includes("my orders")) {
        speak("Opening your order page");
        navigate("/order");
        setShowSearch(false);
      } else {
        toast.error("Sorry, I didn't understand. Try again.");
      }
    };

    recognition.onend = () => {
      setActiveAi(false);
    };
  };

  const handleRobotClick = () => {
  setShowChat((prev) => !prev); // Toggle chat box

  if (!hasWelcomed) {
    handleVoiceCommand();      // Start voice only on first click
    speak("Welcome to Swift Cart");
    setHasWelcomed(true);
  }
};


  return (
    <div>
      <div
        className='fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%] z-50'
        onClick={handleRobotClick}
      >
        <img
          src={robot}
          alt="AI Assistant Robot"
          className={`w-[160px] h-[160px] cursor-pointer ${activeAi ? 'translate-x-[10%] translate-y-[10%] scale-125' : 'scale-100'} transition-transform hover:scale-105`}
          style={{ filter: activeAi ? "drop-shadow(0px 30px #00d2fc)" : "drop-shadow(0px 20px black)" }}
        />
      </div>

      {showChat && (
        <div className="fixed bottom-[140px] left-[140px] w-[300px] h-[400px] bg-white rounded-xl shadow-lg p-4 z-50">
          <h3 className="text-lg font-bold text-gray-800">Hi! I'm Swift AI 🤖</h3>
          <p className="text-sm text-gray-600 mt-2">Ask me anything about products or your orders!</p>
          {/* Add future chatbot features here */}
        </div>
      )}
    </div>
  );
}

export default Ai;
