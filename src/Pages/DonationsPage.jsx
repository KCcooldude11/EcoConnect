import React, { useState } from "react";

function DonationsPage() {
  const [expanded, setExpanded] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedCause, setSelectedCause] = useState("");
  const [donationFrequency, setDonationFrequency] = useState("One-time");
  const [donationAmount, setDonationAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);


  const toggleCause = (section) => {
    setExpanded((prev) => (prev === section ? null : section));
  };

  const handleCauseClick = (causeLabel) => {
    setSelectedCause(causeLabel);
    setShowForm(true);
  };

  return (
    <div className= "h-screen w-full text-gray-800 gap-6 py-28">
      <div className="flex items-center justify-center bg-gray-100 shadow-lg p-10">
        <h1 className="text-4xl font-bold">Donate to Sustainability Projects</h1>
      </div>

      <div className="mx-20">
      <p className="text-center text-lg m-5">
        Your contributions go directly to trusted environmental organizations. Every dollar helps fund cleanups, conservation efforts, and waste reduction programs.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Choose a Cause</h2>
      <div className="space-y-4">
        {/* Cause: Reforestation */}
        <div className="rounded-lg bg-green-100 text-green-900">
          <button
            onClick={() => toggleCause("reforestation")}
            onDoubleClick={() => handleCauseClick("🌱 Reforestation Projects")}
            className="w-full text-left px-6 py-4 font-medium hover:bg-green-200 transition"
          >
            🌱 Reforestation Projects
          </button>
          {expanded === "reforestation" && (
            <div className="px-6 pb-4 text-sm text-gray-700">
              <p className="mb-2">
                Help plant native trees across Utah's wildfire recovery zones.
              </p>
              <ul className="list-disc ml-5">
                <li>
                  <button
                    onClick={() => {
                      handleCauseClick("Utah Open Lands");
                      window.open("https://www.utahopenlands.org/donate", "_blank");
                    }}
                    className="text-left text-blue-600 hover:underline"
                  >
                    Utah Open Lands
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleCauseClick("Sageland Collaborative");
                      window.open("https://sagelandcollaborative.org/donate", "_blank");
                    }}
                    className="text-left text-blue-600 hover:underline"
                  >
                    Sageland Collaborative
                  </button>
                </li>
              </ul>
            </div>
          )}
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
          {expanded === "cleanups" && (
            <div className="px-6 pb-4 text-sm text-gray-700">
              <p>Support shoreline cleanups around Utah Lake, Bear Lake, and more.</p>
              <ul className="list-disc ml-5">
                <li>
                  <button
                    onClick={() => {
                      handleCauseClick("Utah Rivers Council");
                      window.open("https://utahrivers.org/donate", "_blank");
                    }}
                    className="text-left text-blue-600 hover:underline"
                  >
                    Utah Rivers Council
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleCauseClick("Conserve Utah Valley");
                      window.open("https://conserveutahvalley.org/donate-give/", "_blank");
                    }}
                    className="text-left text-blue-600 hover:underline"
                  >
                    Conserve Utah Valley
                  </button>
                </li>
              </ul>
            </div>
          )}
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
          {expanded === "wildlife" && (
            <div className="px-6 pb-4 text-sm text-gray-700">
              <p>Protect Utah's wildlife with tracking tools and migration corridors.</p>
              <ul className="list-disc ml-5">
                <li>
                  <button
                    onClick={() => {
                      handleCauseClick("WildEarth Guardians");
                      window.open("https://wildearthguardians.org/donate/", "_blank");
                    }}
                    className="text-left text-blue-600 hover:underline"
                  >
                    WildEarth Guardians
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleCauseClick("HEAL Utah");
                      window.open("https://www.healutah.org/donate/", "_blank");
                    }}
                    className="text-left text-blue-600 hover:underline"
                  >
                    HEAL Utah
                  </button>
                </li>
              </ul>
            </div>
          )}
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
          {expanded === "gardens" && (
            <div className="px-6 pb-4 text-sm text-gray-700">
              <p>Help fund urban gardens and school planting programs.</p>
              <ul className="list-disc ml-5">
                <li>
                  <button
                    onClick={() => {
                      handleCauseClick("Conserve Utah Valley");
                      window.open("https://conserveutahvalley.org/donate-give/", "_blank");
                    }}
                    className="text-left text-blue-600 hover:underline"
                  >
                    Conserve Utah Valley
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>



      {/* Manual Donate Now Button */}
      <div className="mt-10 text-center">
        <button
          onClick={() => setShowForm(prev => !prev)}
          className="px-6 py-3 bg-green-700 text-white font-semibold rounded hover:bg-green-800 transition"
        >
          {showForm ? "Hide Donation Form" : "Donate Now"}
        </button>
      </div>

      {/* Donation Form */}
      {showForm && (
  <div className="mt-10 border rounded-lg p-6 bg-white shadow-md animate-fadeIn">
    <h3 className="text-xl font-semibold mb-4 text-green-800">Choose amount</h3>

    {/* Cause Input */}
    <div className="mb-4">
      <label className="block font-medium text-green-700 mb-1">Cause you're donating to</label>
      <input
        value={selectedCause}
        onChange={(e) => setSelectedCause(e.target.value)}
        className="w-full px-4 py-2 border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
        placeholder="Type or select a cause"
      />
    </div>

    {/* Recurring Options */}
    <div className="flex flex-wrap gap-2 mb-6">
      {["One-time", "Monthly", "Quarterly", "Annually"].map((freq) => (
        <button
          key={freq}
          onClick={() => setDonationFrequency(freq)}
          className={`px-4 py-2 rounded border font-medium transition ${
            donationFrequency === freq
              ? "bg-green-700 text-white"
              : "bg-white text-green-800 border-green-400 hover:bg-green-100"
          }`}
        >
          {freq}
        </button>
      ))}
    </div>

    {/* Amount Options */}
    <div className="grid grid-cols-2 gap-3 mb-6">
      {[25, 50, 100, 250].map((amount) => (
        <button
          key={amount}
          onClick={() => {
            setDonationAmount(amount);
            setCustomAmount("");
          }}
          className={`px-4 py-2 border rounded font-medium transition ${
            donationAmount === amount
              ? "bg-green-700 text-white"
              : "bg-white text-green-800 border-green-400 hover:bg-green-100"
          }`}
        >
          ${amount}
        </button>
      ))}
      <input
        value={customAmount}
        onChange={(e) => {
          setCustomAmount(e.target.value);
          setDonationAmount(null);
        }}
        placeholder="$ Custom Amount"
        className="col-span-2 px-4 py-2 border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
      />
    </div>

    {/* Optional: Comment */}
    <div className="space-y-3 mb-6">
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={showCommentBox}
          onChange={(e) => setShowCommentBox(e.target.checked)}
        />
        <span className="text-green-800">Write us a comment</span>
      </label>

      {showCommentBox && (
        <textarea
          className="w-full px-4 py-2 border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          rows="3"
          placeholder="Leave your comment here..."
        />
      )}
    </div>

    <div className="text-right">
      <button className="px-6 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition font-semibold">
        Next →
      </button>
    </div>
  </div>
)}


      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `}
      </style>
    </div>
    </div>
  );
}

export default DonationsPage;