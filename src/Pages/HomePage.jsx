import nature from '../assets/nature.png';
import mountain from '../assets/mountain2.png';
import giving from '../assets/giving.png';
import donate from '../assets/donate.png';
import SimpleMap from '../Components/SimpleMap';
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
import { useInView } from 'react-intersection-observer';


import { useState, useEffect, useRef } from 'react';

const leafImages = [
  leaf1, leaf2, leaf3, leaf4, leaf5,
  leaf6, leaf7, leaf8, leaf9, leaf10,
  leaf11, leaf12, leaf13, leaf14, leaf15,
];

function HomePage() {
  const [showMissionDetails, setShowMissionDetails] = useState(false);
  const [missionVisible, setMissionVisible] = useState(false);
  const missionRef = useRef(null);  
  const [activeSlide, setActiveSlide] = useState(0);
  const [showCarousel, setShowCarousel] = useState(false);

  const { ref: mapRef, inView: mapVisible } = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setMissionVisible(isVisible);
  
        // Close carousel when you scroll away
        if (!isVisible && showCarousel) {
          setShowCarousel(false);
        }
      },
      { threshold: 0.6 } // tweak if needed
    );
  
    if (missionRef.current) observer.observe(missionRef.current);
    return () => {
      if (missionRef.current) observer.unobserve(missionRef.current);
    };
  }, [showCarousel]);

  const slides = [
    {
      title: "Support Real Causes",
      content: "EcoConnect lets you donate directly to trusted environmental organizations like Utah Open Lands and Conserve Utah Valley. Choose your cause, pick your amount, and make an impact today.",
    },
    {
      title: "Discover Sustainable Places",
      content: "Use our interactive map to find local recycling centers, zero waste shops, farmers markets, plant stores, and more — all across Utah. Filter by category and explore eco-friendly options near you.",
    },
    {
      title: "Join Cleanups & Events",
      content: "Browse nearby nature walks, community cleanups, and sustainability workshops. Whether you're into wildlife support or plastic reduction, there's something for everyone.",
    },
    {
      title: "Learn & Share",
      content: "EcoConnect is about more than just action — it's about community. Get personalized tips, attend educational events, and share your sustainability wins on social media.",
    },
  ];
  
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
                <div
                ref={mapRef}
                className="flex flex-col items-center justify-start min-h-screen py-12 px-6 text-white"
              >
                <div className="text-center drop-shadow-lg mb-10">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">{section.heading}</h1>
                  <p className="text-lg md:text-2xl font-medium max-w-2xl mx-auto">
                    {section.text}
                  </p>
                </div>
                <div className="w-full mt-6 px-4 md:px-8 lg:px-16">
                  <div className="w-full h-[60vh] md:h-[70vh] lg:h-[80vh] relative overflow-hidden rounded-2xl shadow-xl">
                    {mapVisible && <SimpleMap />}
                  </div>
                </div>
              </div>
            ) : index === 1 ? (
                // 🌿 Mission Section with Expandable Info
                <div
                className="h-screen flex items-center justify-center text-center px-6 text-white relative"
                ref={missionRef}
              >
                <div className="relative z-10 max-w-2xl w-full">
                  {/* Animated Background Box */}
                  {/* Animated Splat Background Box */}
                  <div
                    className={`absolute inset-0 rounded-3xl bg-green-600 -z-10
                      transition-all duration-[800ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
                      ${missionVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"}
                    `}
                  />

              
                  {/* Text Content */}
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">{section.heading}</h1>
                  <p className="text-lg md:text-2xl font-medium mb-4">{section.text}</p>
              
                  {/* Toggle Button */}
                  <button
                    onClick={() => setShowCarousel(!showCarousel)}
                    className="mt-4 flex items-center justify-center gap-2 text-green-200 hover:text-white transition text-lg mx-auto"
                  >
                    <span>{showCarousel ? "Hide Info" : "Learn More"}</span>
                    <svg
                      className={`w-5 h-5 transform transition-transform duration-300 ${
                        showCarousel ? "rotate-180" : "rotate-0"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Carousel Panel */}
                  <div
                    className={`relative mt-6 w-full max-w-4xl mx-auto bg-green-700/90 rounded-2xl shadow-xl transform transition-all duration-700 ease-in-out overflow-hidden
                      ${showCarousel ? "max-h-[400px] opacity-100 scale-100 translate-y-0" : "max-h-0 opacity-0 scale-95 translate-y-4"}
                    `}
                  >
                    <div className="p-6 transition-opacity duration-700 delay-100">
                      {/* Slide Content */}
                      <div className="relative overflow-hidden w-full">
                        <div
                          className="flex transition-transform duration-700 ease-in-out"
                          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                        >
                          {slides.map((slide, i) => (
                            <div key={i} className="w-full flex-shrink-0 text-white text-center min-h-[150px] px-4">
                              <h2 className="text-2xl font-semibold mb-2">{slide.title}</h2>
                              <p className="text-base md:text-lg">{slide.content}</p>
                            </div>
                          ))}
                        </div>
                      </div>


                      {/* Slide Controls */}
                      <div className="flex justify-between items-center mt-6">
                        <button
                          onClick={() =>
                            setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
                          }
                          className="text-white hover:text-green-300 text-2xl px-4 py-2 transition"
                        >
                          ←
                        </button>
                        <div className="flex gap-2">
                          {slides.map((_, i) => (
                            <div
                              key={i}
                              className={`w-3 h-3 rounded-full ${
                                i === activeSlide ? "bg-white" : "bg-green-300/40"
                              }`}
                            />
                          ))}
                        </div>
                        <button
                          onClick={() =>
                            setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
                          }
                          className="text-white hover:text-green-300 text-2xl px-4 py-2 transition"
                        >
                          →
                        </button>
                      </div>
                    </div>
                  </div>


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
