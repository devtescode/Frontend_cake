
import React, { useState, useEffect } from 'react';
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom'


const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(2); // Mock cart count

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex items-center justify-between mx-4">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <span className="font-cursive text-2xl md:text-3xl font-bold text-primary-dark">Sweet Delights</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="font-medium hover:text-primary-dark transition-colors">Home</Link>
          <Link to="/shop" className="font-medium hover:text-primary-dark transition-colors">Shop</Link>
          <Link to="/about" className="font-medium hover:text-primary-dark transition-colors">About</Link>
          <Link to="/contact" className="font-medium hover:text-primary-dark transition-colors">Contact</Link>

        </nav>

        {/* Right Side Icons */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Search */}
          <button className="hover:text-primary-dark transition-colors">
            <FaSearch size={18} />
          </button>
          
          {/* Cart */}
          <a to="/cart" className="relative hover:text-primary-dark transition-colors">
            <FaShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary-dark text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {/* {cartCount} */}
              </span>
            )}
          </a>
          
          {/* CTA Button */}
          <Link to="/adlogin" className="font-medium hover:text-primary-dark transition-colors py-2 border-b border-gray-100">Admin</Link>
          {/* <p to="/adlogin" className="btn btn-primary">
            Admin
          </p> */}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          {/* Cart for Mobile */}
          <a href="/cart" className="relative hover:text-primary-dark transition-colors">
            <FaShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary-dark text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </a>
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-800 hover:text-primary-dark"
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
        
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full">
          <div className="container-custom py-4 flex flex-col space-y-4">
            <Link to="/" className="font-medium hover:text-primary-dark transition-colors py-2 border-b border-gray-100">Home</Link>
            <Link to="/shop" className="font-medium hover:text-primary-dark transition-colors py-2 border-b border-gray-100">Shop</Link>
            <Link to="/about" className="font-medium hover:text-primary-dark transition-colors py-2 border-b border-gray-100">About</Link>
            <Link to="/contact" className="font-medium hover:text-primary-dark transition-colors py-2 border-b border-gray-100">Contact</Link>
            
            <div className="flex items-center justify-between py-2">
              <button className="hover:text-primary-dark transition-colors">
                <FaSearch size={18} />
                <span className="ml-2">Search</span>
              </button>
              
              <Link to="/shop" className="btn btn-primary">
                Order Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
