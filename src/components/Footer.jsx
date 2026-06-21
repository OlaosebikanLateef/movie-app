import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-12 py-6 text-center text-gray-400 border-t border-gray-700">
      <p>
        © {new Date().getFullYear()}  MovieApp  <span>•</span>  All rights reserved
      </p>

      <div className="flex justify-center gap-6 mt-3">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
      </div>
    </footer>
  );
};

export default Footer;