
import React from 'react';
import { FaFacebook, FaInstagram, FaPinterest, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1 - About */}
          <div>
            <h3 className="font-cursive text-2xl text-primary mb-4">Sweet Delights</h3>
            <p className="text-gray-400 mb-6">
              Crafting delicious moments since 2010. We specialize in custom cakes for all occasions, made with love and the finest ingredients.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-primary transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-primary transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="https://pinterest.com" className="text-gray-400 hover:text-primary transition-colors">
                <FaPinterest size={20} />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-primary transition-colors">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-400 hover:text-primary transition-colors">About Us</a>
              </li>
              <li>
                <a href="/shop" className="text-gray-400 hover:text-primary transition-colors">Shop</a>
              </li>
              <li>
                <a href="/faq" className="text-gray-400 hover:text-primary transition-colors">FAQs</a>
              </li>
              <li>
                <a href="/delivery" className="text-gray-400 hover:text-primary transition-colors">Delivery Information</a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>
          
          {/* Column 3 - Contact Info */}
          <div>
            <h4 className="text-lg font-medium mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-primary mt-1 mr-3" />
                <span className="text-gray-400">123 Cake Street, Sweet City, SC 12345</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-primary mr-3" />
                <span className="text-gray-400">(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-primary mr-3" />
                <span className="text-gray-400">info@sweetdelights.com</span>
              </li>
              <li className="flex items-start">
                <FaClock className="text-primary mt-1 mr-3" />
                <div className="text-gray-400">
                  <p>Mon-Fri: 8:00 AM - 8:00 PM</p>
                  <p>Sat-Sun: 9:00 AM - 6:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
          
          {/* Column 4 - Instagram Feed */}
          <div>
            <h4 className="text-lg font-medium mb-4">Instagram</h4>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <a 
                  key={item} 
                  href="https://instagram.com" 
                  className="block overflow-hidden rounded-md group"
                >
                  <img 
                    src={`https://source.unsplash.com/random/150x150/?cake&sig=${item}`} 
                    alt="Instagram post" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </a>
              ))}
            </div>
            <a href="https://instagram.com" className="inline-block mt-4 text-sm text-primary hover:underline">
              @sweetdelights
            </a>
          </div>
        </div>
        
        {/* Payment Methods */}
        <div className="border-t border-gray-800 pt-8 pb-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h5 className="text-sm font-medium mb-2">Payment Methods</h5>
              <div className="flex space-x-3">
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-gray-800 font-bold text-xs">VISA</span>
                </div>
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-gray-800 font-bold text-xs">MASTER</span>
                </div>
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-gray-800 font-bold text-xs">PAYPAL</span>
                </div>
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-gray-800 font-bold text-xs">APPLE PAY</span>
                </div>
              </div>
            </div>
            
            <div>
              <a href="/app" className="flex items-center bg-white text-gray-800 rounded-lg px-4 py-2 hover:bg-gray-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">Download Our App</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Sweet Delights. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="/privacy" className="text-xs text-gray-500 hover:text-primary transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-xs text-gray-500 hover:text-primary transition-colors">Terms of Service</a>
            <a href="/cookies" className="text-xs text-gray-500 hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
