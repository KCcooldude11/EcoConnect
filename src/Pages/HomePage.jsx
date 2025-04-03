import nature from '../assets/nature.png';
import mountain from '../assets/mountain2.png';
import giving from '../assets/giving.png';
import donate from '../assets/donate.png';
import MapSection from '../Components/MapSection';
import 'mapbox-gl/dist/mapbox-gl.css';
import leaf1 from '../assets/leaves/leaf_1.png';
import leaf2 from '../assets/leaves/leaf_2.png';
import leaf3 from '../assets/leaves/leaf_3.png';
import leaf4 from '../assets/leaves/leaf_4.png';
import leaf5 from '../assets/leaves/leaf_5.png';
import leaf6 from '../assets/leaves/leaf_6.png';
import leaf7 from '../assets/leaves/leaf_7.png';
import leaf8 from '../assets/leaves/leaf_8.png';
import leaf9 from '../assets/leaves/leaf_9.png';
import leaf10 from '../assets/leaves/leaf_10.png';
import leaf11 from '../assets/leaves/leaf_11.png';
import leaf12 from '../assets/leaves/leaf_12.png';
import leaf13 from '../assets/leaves/leaf_13.png';
import leaf14 from '../assets/leaves/leaf_14.png';
import leaf15 from '../assets/leaves/leaf_15.png';
import logo from '../assets/logo.png';

import { useState } from 'react';

const leafImages = [
  leaf1, leaf2, leaf3, leaf4, leaf5,
  leaf6, leaf7, leaf8, leaf9, leaf10,
  leaf11, leaf12, leaf13, leaf14, leaf15,
];

function HomePage() {
  const [showMissionDetails, setShowMissionDetails] = useState(false);

  
  const sections = [
    { image: nature },
    {
      heading: "Our Mission",
      text: "EcoConnect helps people take action for the planet.",
      image: mountain,
    },
    {
      heading: "Find Events & Communities",
      text: "Join sustainability projects near you.",
      image: giving,
    },
    {
      heading: "Donate to Trusted Organizations",
      text: "Support real environmental projects around the world.",
      image: donate,
    },
  ];

  return (
    <div className="scroll-smooth relative">
      <div>
        {sections.map((section, index) => (
          <div key={index}>
            <div
              id={`section${index + 1}`}
              className="w-full bg-fixed bg-cover bg-center relative"
              style={{ backgroundImage: `url(${section.image})` }}
            >
              {/* 🌿 First Section */}
              {index === 0 && (
                <div className="relative h-screen overflow-hidden text-white text-center">
                  {/* Falling Leaves */}
                  <div
                    className="absolute top-0 left-0 w-full h-full pointer-events-none z-20"
                    id="leaves"
                  >
                    {Array.from({ length: 45 }).map((_, i) => {
                      const left = Math.floor(Math.random() * 100);
                      const delay = Math.random() * 5;
                      const width = Math.floor(Math.random() * 20 + 20);
                      const style = {
                        left: `${left}%`,
                        animationDelay: `${delay}s`,
                        width: `${width}px`,
                        height: "auto",
                        position: "absolute",
                        pointerEvents: "none",
                      };

                      return (
                        <img
                          key={i}
                          src={leafImages[i % leafImages.length]}
                          alt="falling leaf"
                          className={`animate-fall${(i % 3) + 1}`}
                          style={style}
                        />
                      );
                    })}
                  </div>
                  {/* Centered Brush Ring with Logo and Overlapping Text */}
                    <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 z-10">
                      {/* Spinning Brush Ring */}
                      <img
                        src="/assets/brush-ring.png"
                        alt="Brush Ring"
                        className="absolute inset-0 w-full h-full animate-[spin_15s_linear_infinite] pointer-events-none"
                      />

                      {/* Big Logo in Center */}
                      <img
                        src={logo}
                        alt="EcoConnect Logo"
                        className="absolute top-1/2 left-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 z-10"
                      />

                      {/* Text Positioned Over the Logo */}
                      <div className="absolute top-[65%] left-1/2 -translate-x-1/2 text-center z-20">
                        <h1 className="text-5xl md:text-6xl font-bold">EcoConnect</h1>
                        <p className="text-lg md:text-xl mt-1">Growing a Greener Tomorrow</p>
                      </div>
                    </div>
                </div>
              )}

              {/* Map Section */}
              {index === 2 ? (
                <div className="flex flex-col items-center justify-start min-h-screen py-12 px-6 text-white">
                  <div className="text-center drop-shadow-lg mb-10">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">{section.heading}</h1>
                    <p className="text-lg md:text-2xl font-medium max-w-2xl mx-auto">
                      {section.text}
                    </p>
                  </div>
                  <div className="w-full mt-6 px-4 md:px-8 lg:px-16">
                    <div className="w-full h-[60vh] md:h-[70vh] lg:h-[80vh] relative overflow-hidden rounded-2xl shadow-xl">
                      <MapSection />
                    </div>
                  </div>
                </div>
              ) : index === 1 ? (
                // 🌿 Mission Section with Expandable Info
                <div className="h-screen flex flex-col items-center justify-center text-center px-6 text-white drop-shadow-lg">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">{section.heading}</h1>
                  <p className="text-lg md:text-2xl font-medium max-w-2xl mx-auto">{section.text}</p>

                  {/* Toggle Button */}
                  <button
                    onClick={() => setShowMissionDetails(!showMissionDetails)}
                    className="mt-4 flex items-center justify-center gap-2 text-green-200 hover:text-white transition text-lg"
                  >
                    <span>{showMissionDetails ? "Hide Details" : "Learn More"}</span>
                    <svg
                      className={`w-5 h-5 transform transition-transform duration-300 ${
                        showMissionDetails ? "rotate-180" : "rotate-0"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Expandable Content */}
                  <div
                    className={`mt-4 max-w-3xl mx-auto transition-all duration-500 ease-in-out overflow-hidden ${
                      showMissionDetails ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-base md:text-lg text-green-100">
                      EcoConnect is committed to fostering sustainability through local action.
                      We connect people to grassroots environmental initiatives — from community gardens to
                      cleanups — and help them make a real difference. Our goal is to turn awareness into action,
                      and small efforts into a global movement.
                    </p>
                  </div>
                </div>
              ) : index === 3 ? (
                // 💚 Donations Section
                <div className="h-screen flex flex-col items-center justify-center text-center px-6 text-white drop-shadow-lg">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">{section.heading}</h1>
                  <p className="text-lg md:text-2xl font-medium max-w-2xl mx-auto">{section.text}</p>
                  <a
                    href="/donations"
                    className="mt-4 inline-block px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-full hover:bg-green-600 transition duration-200"
                  >
                    Donate Now
                  </a>
                </div>
              ) : null}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
