
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
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
        }`}
    >
      <div className="container-custom flex items-center justify-between mx-4">
        {/* Logo */}
        <div className="flex items-center">
          <a className="flex items-center">
            <span className="font-cursive text-2xl md:text-3xl font-bold text-primary-dark">Sweet Delights</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link className="font-medium hover:text-primary-dark transition-colors">Home</Link>
          <Link className="font-medium hover:text-primary-dark transition-colors">Shop</Link>
          <Link className="font-medium hover:text-primary-dark transition-colors">About</Link>
          <Link className="font-medium hover:text-primary-dark transition-colors">Contact</Link>

        </nav>

        {/* Right Side Icons */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Search */}
          <button className="hover:text-primary-dark transition-colors">
            {/* <FaSearch size={18} /> */}
            <div className="flex items-center space-x-2 w-full max-w-sm bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200">
                <FaSearch className="text-gray-500" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent outline-none w-full text-sm text-gray-700 placeholder-gray-400"
                />
              </div>
          </button>

          {/* Cart */}
          <p className="relative hover:text-primary-dark transition-colors">
            <FaShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary-dark text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {/* {cartCount} */}
              </span>
            )}
          </p>

          {/* CTA Button */}
          <Link to="/adlogin" className="font-medium hover:text-primary-dark transition-colors py-2 border-b border-gray-100">
            <p to="/adlogin" className="btn btn-primary">
              Admin
            </p>
          </Link>

        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          {/* Cart for Mobile */}
          <p className="relative hover:text-primary-dark transition-colors">
            <FaShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary-dark text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </p>

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
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full text-center">
          <div className="container-custom py-4 flex flex-col space-y-4">
            <Link to="/" className="font-medium hover:text-primary-dark transition-colors py-2 border-b border-gray-100">Home</Link>
            <Link className="font-medium hover:text-primary-dark transition-colors py-2 border-b border-gray-100">Shop</Link>
            <Link className="font-medium hover:text-primary-dark transition-colors py-2 border-b border-gray-100">About</Link>
            <Link className="font-medium hover:text-primary-dark transition-colors py-2 border-b border-gray-100">Contact</Link>

            <div className="flex items-center justify-between py-3 px-4 bg-white">
              {/* Search Section */}
              <div className="flex items-center space-x-2 w-full max-w-sm bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200">
                <FaSearch className="text-gray-500" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent outline-none w-full text-sm text-gray-700 placeholder-gray-400"
                />
              </div>

              {/* Admin Link */}
              <Link
                to="/adlogin"
                className="ml-4 font-medium text-gray-700 hover:text-blue-600 transition-colors border border-gray-200 px-4 py-1.5 rounded-full hover:bg-blue-50"
              >
                Admin
              </Link>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
