import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#5C8A48] text-white py-6 px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left: Branding */}
        <div>
          <h2 className="text-xl font-bold">EcoConnect</h2>
          <p className="text-sm mt-1">© 2025 EcoConnect. All rights reserved.</p>
        </div>

        {/* Right: Social Icons */}
        <div className="flex gap-4 text-white text-2xl">
          <a 
            href="https://x.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-gray-300"
          >
            <i className="fab fa-x-twitter" />
          </a>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-gray-300"
          >
            <i className="fab fa-instagram" />
          </a>
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-gray-300"
          >
            <i className="fab fa-facebook-f" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
