
import React from 'react';
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1789&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/60"></div>
      </div>

      <div className="container-custom relative z-10 mx-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Hero Content */}
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-4 leading-tight">
              Freshly Baked Cakes for Every Occasion
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg">
              Order your favorite cake today! Handcrafted with love using only the finest ingredients.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex space-x-4">
                {/* Register Button */}
                <Link
                  to="/register"
                  className="px-6 py-2 md:px-8 md:py-3 bg-pink-600 hover:bg-pink-900 text-white font-semibold rounded-full shadow-md transition duration-300 text-base md:text-lg"
                >
                  Register
                </Link>

                {/* Login Button */}
                <Link
                  to="/login"
                  className="px-6 py-2 md:px-8 md:py-3 border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white font-semibold rounded-full shadow-md transition duration-300 text-base md:text-lg"
                >
                  Login
                </Link>
              </div>

              {/* <Link to="/categories" className="btn bg-white border border-gray-300 text-gray-800 hover:bg-gray-100 text-base md:text-lg">
                Browse Cakes
              </Link> */}
            </div>

            {/* Features */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <div className="text-green-500 h-10 w-10 rounded-full bg-primary-light flex items-center justify-center mr-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-medium">Delivery</span>
              </div>
              <div className="flex items-center">
                <div className="text-green-500 h-10 w-10 rounded-full bg-primary-light flex items-center justify-center mr-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-medium">Premium Quality</span>
              </div>
            </div>
          </div>

          {/* Hero Image (visible on mobile but hidden on desktop as we have background) */}
          {/* <div className="md:hidden">
            <img 
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1789&q=80" 
              alt="Delicious cake" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div> */}
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-24">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,140.83,94.17,208.18,70.28,289.4,40.17,283.09,63.45,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
