import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className="mt-12 py-6 text-center text-gray-400 border-t border-gray-700">
      <p>
        © {new Date().getFullYear()}  MovieApp  <span>•</span>  All rights reserved
      </p>

      <div className="flex justify-center gap-6 mt-3">
       <ul className="flex gap-6 text-white">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      </div>
    </footer>
  );
};

export default Footer;