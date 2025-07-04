import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-4 mt-10">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} <span className="font-semibold text-white">TaskFlow</span>. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Built for productivity and team collaboration.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
