import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bgAlpha, setBgAlpha] = useState(0.9); // Start opaque
  const dropdownRef = useRef();

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll effect for background transparency
  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      const maxScroll = 1000; // Takes 600px to reach full fade
      const minAlpha = 0.1; // or 0.1 if you want to keep some visibility
      const maxAlpha = 1;
  
      const alpha = Math.max(minAlpha, maxAlpha - (scrollY / maxScroll) * maxAlpha);
      setBgAlpha(alpha);
    }
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  

  const navbarStyle = {
    backgroundColor: `rgba(34, 197, 94, ${bgAlpha})`,
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)"
  };

  return (
    <header
      style={navbarStyle}
      className="fixed top-0 left-0 w-full z-50 transition-colors duration-300"
    >
      <div className="flex justify-between items-center px-8 py-6 h-28 w-full relative">
        {/* 🌱 Logo + Title */}
        <Link to="/" className="flex items-center gap-1">
          <img src={logo} alt="EcoConnect Logo" className="h-16 w-16" />
          <span className="text-white font-extrabold text-3xl tracking-tight -ml-1">
            EcoConnect
          </span>
        </Link>
        {/* 🍔 Hamburger */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white hover:text-green-400 focus:outline-none"
          >
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* 🔽 Dropdown */}
          {menuOpen && (
            <div className="absolute right-0 mt-3 w-52 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50">
              <Link to="/" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Home</Link>
              <Link to="/map" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Map</Link>
              <Link to="/donations" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Donations</Link>
              <Link to="/about" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">About</Link>
              <hr className="my-1" />
              <button className="w-full text-left px-4 py-2 text-green-700 hover:bg-gray-100">Login</button>
              <button className="w-full text-left px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-b">Sign Up</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navigation;
