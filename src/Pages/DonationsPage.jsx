import React from "react";
function DonationsPage() {
  return (
    <div className="max-w-3xl mx-auto pt-28 px-6 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">
        Donate to Sustainability Projects
      </h1>
      <p className="mb-8 text-lg leading-relaxed">
        Your contributions go directly to trusted environmental organizations.
        Every dollar helps fund cleanups, conservation efforts, and waste
        reduction programs.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Choose a Cause</h2>
      <div className="space-y-3">
        <a
          href="#"
          className="block px-6 py-4 rounded-lg bg-green-100 text-green-900 font-medium hover:bg-green-200 transition"
        >
          🌱 Reforestation Projects
        </a>
        <a
          href="#"
          className="block px-6 py-4 rounded-lg bg-blue-100 text-blue-900 font-medium hover:bg-blue-200 transition"
        >
          🏖️ Beach Cleanups
        </a>
        <a
          href="#"
          className="block px-6 py-4 rounded-lg bg-yellow-100 text-yellow-900 font-medium hover:bg-yellow-200 transition"
        >
          🐾 Wildlife Protection
        </a>
        <a
          href="#"
          className="block px-6 py-4 rounded-lg bg-rose-100 text-rose-900 font-medium hover:bg-rose-200 transition"
        >
          🏡 Community Gardens
        </a>
      </div>

      <div className="mt-8">
        <button className="px-6 py-3 bg-green-700 text-white font-semibold rounded hover:bg-green-800 transition">
          Donate Now
        </button>
      </div>
    </div>
  );
}

export default DonationsPage;
