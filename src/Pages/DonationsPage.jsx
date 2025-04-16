import React, { useState } from "react";
import donations from '../assets/donations.jpeg'; 
import Footer from '../Components/Footer';

function DonationsPage() {
  const [expanded, setExpanded] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedCause, setSelectedCause] = useState("");
  const [donationFrequency, setDonationFrequency] = useState("One-time");
 


  const toggleCause = (section) => {
    setExpanded((prev) => (prev === section ? null : section));
  };

  const handleCauseClick = (causeLabel) => {
    setSelectedCause(causeLabel);
    setShowForm(true);
  };

  return (
    <div className= "h-screen w-full text-gray-800 gap-6 py-28">
      <div className="flex items-center justify-center bg-gray-100 shadow-lg p-10 h-96"
      style={{ backgroundImage: `url(${donations})` }}>
        <h1 className="text-4xl font-bold">Donate to Sustainability Projects</h1>
      </div>

      <div className="mx-30">
      <p className="text-center text-lg m-5">
        Your contributions go directly to trusted environmental organizations. Every dollar helps fund cleanups, conservation efforts, and waste reduction programs.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Choose a Cause</h2>
      <div className="space-y-4 mb-30">
        {/* Cause: Reforestation */}
        <div className="rounded-lg bg-green-100 text-green-900">
          <button
            onClick={() => toggleCause("reforestation")}
            onDoubleClick={() => handleCauseClick("🌱 Reforestation Projects")}
            className="w-full text-left px-6 py-4 font-medium hover:bg-green-200 transition"
          >
            🌱 Reforestation Projects
          </button>
          <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
      expanded === "reforestation" ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
    }`}
  >
            <div className="px-6 pb-4 text-sm text-gray-700">
              <p className="mb-2">
                Help plant native trees across Utah's wildfire recovery zones.
              </p>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => {
                    handleCauseClick("Utah Open Lands");
                    window.open("https://www.utahopenlands.org/donate", "_blank");
                  }}
                  className="text-left text-blue-600 hover:underline"
                >
                  Utah Open Lands
                </button>

                <button
                  onClick={() => {
                    handleCauseClick("Sageland Collaborative");
                    window.open("https://sagelandcollaborative.org/donate", "_blank");
                  }}
                  className="text-left text-blue-600 hover:underline"
                >
                  Sageland Collaborative
                </button>

                <button
                  onClick={() => {
                    handleCauseClick("US Forest Service Plant-A-Tree Program");
                    window.open("https://sagelandcollaborative.org/donate", "_blank");
                  }}
                  className="text-left text-blue-600 hover:underline"
                >
                  US Forest Service Plant-A-Tree Program
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cause: Beach Cleanups */}
        <div className="rounded-lg bg-blue-100 text-blue-900">
          <button
            onClick={() => toggleCause("cleanups")}
            onDoubleClick={() => handleCauseClick("🏖️ Beach Cleanups")}
            className="w-full text-left px-6 py-4 font-medium hover:bg-blue-200 transition"
          >
            🏖️ Beach Cleanups
          </button>
          <div
    className={`overflow-hidden transition-all duration-500 ease-in-out ${
      expanded === "cleanups" ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
    }`}
  >
            <div className="px-6 pb-4 text-sm text-gray-700">
              <p>Support shoreline cleanups around Utah Lake, Bear Lake, and more.</p>
              <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => {
                      handleCauseClick("Utah Rivers Council");
                      window.open("https://utahrivers.org/donate", "_blank");
                    }}
                    className="text-left text-blue-600 hover:underline"
                  >
                    Utah Rivers Council
                  </button>
                
                  <button
                    onClick={() => {
                      handleCauseClick("Conserve Utah Valley");
                      window.open("https://conserveutahvalley.org/donate-give/", "_blank");
                    }}
                    className="text-left text-blue-600 hover:underline"
                  >
                    Conserve Utah Valley
                  </button>
                  <button
                    onClick={() => {
                      handleCauseClick("Bear Lake Watch");
                      window.open("https://bearlakewatch.org/donate", "_blank");
                    }}
                    className="text-left text-blue-600 hover:underline">
                    Bear Lake Watch
                    </button>
                  <button
                    onClick={() => {
                      handleCauseClick("Utah Lake Commission");
                      window.open("https://utahlakecommission.org/donate", "_blank");
                    }}
                    className="text-left text-blue-600 hover:underline">
                    Utah Lake Commission
                    </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cause: Wildlife */}
        <div className="rounded-lg bg-yellow-100 text-yellow-900">
          <button
            onClick={() => toggleCause("wildlife")}
            onDoubleClick={() => handleCauseClick("🐾 Wildlife Protection")}
            className="w-full text-left px-6 py-4 font-medium hover:bg-yellow-200 transition"
          >
            🐾 Wildlife Protection
          </button>
          <div
    className={`overflow-hidden transition-all duration-500 ease-in-out ${
      expanded === "wildlife" ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
    }`}
  >
            <div className="px-6 pb-4 text-sm text-gray-700">
              <p>Protect Utah's wildlife with tracking tools and migration corridors.</p>
              <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => {
                      handleCauseClick("WildEarth Guardians");
                      window.open("https://wildearthguardians.org/donate/", "_blank");
                    }}
                    className="text-left text-blue-600 hover:underline"
                  >
                    WildEarth Guardians
                  </button>
                
                  <button
                    onClick={() => {
                      handleCauseClick("HEAL Utah");
                      window.open("https://www.healutah.org/donate/", "_blank");
                    }}
                    className="text-left text-blue-600 hover:underline"
                  >
                    HEAL Utah
                  </button>
                  <button
                    onClick={() => {
                      handleCauseClick("Utah Wildlife Federation");
                      window.open("https://uwf.org/donate", "_blank");
                    }}
                    className="text-left text-blue-600 hover:underline">
                    Utah Wildlife Federation
                    </button>
                    <button
                    onClick={() => {
                      handleCauseClick("Utah Division of Wildlife Resources");
                      window.open("https://wildlife.utah.gov/donate.html", "_blank");
                    }}
                    className="text-left text-blue-600 hover:underline">
                    Utah Division of Wildlife Resources
                    </button>
                </div>
            </div>
          </div>
        </div>

        {/* Cause: Community Gardens */}
        <div className="rounded-lg bg-rose-100 text-rose-900">
          <button
            onClick={() => toggleCause("gardens")}
            onDoubleClick={() => handleCauseClick("🏡 Community Gardens")}
            className="w-full text-left px-6 py-4 font-medium hover:bg-rose-200 transition"
          >
            🏡 Community Gardens
          </button>
          <div
    className={`overflow-hidden transition-all duration-500 ease-in-out ${
      expanded === "gardens" ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
    }`}
  >
            <div className="px-6 pb-4 text-sm text-gray-700">
              <p>Help fund urban gardens and school planting programs.</p>
              <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => {
                      handleCauseClick("Conserve Utah Valley");
                      window.open("https://conserveutahvalley.org/donate-give/", "_blank");
                    }}
                    className="text-left text-blue-600 hover:underline"
                  >
                    Conserve Utah Valley
                  </button>
                  <button
                    onClick={() => {
                      handleCauseClick("Utah State University Extension");
                      window.open("https://extension.usu.edu/donate", "_blank");
                    }}
                    className="text-left text-blue-600 hover:underline"
                  >
                    Utah State University Extension
                  </button>
                  <button
                    onClick={() => {
                      handleCauseClick("Utah Community Gardens");
                      window.open("https://utahcommunitygardens.org/donate", "_blank");
                    }}
                    className="text-left text-blue-600 hover:underline">
                    Utah Community Gardens
                    </button>
                    <button
                    onClick={() => {
                      handleCauseClick("Utah Food Bank");
                      window.open("https://www.utahfoodbank.org/donate/", "_blank");
                    }}
                    className="text-left text-blue-600 hover:underline">
                    Utah Food Bank
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default DonationsPage;
