
import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple email validation
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    // Mock submission - in a real app, this would call an API
    setIsSubmitted(true);
    setError('');
    setEmail('');

    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section className="section bg-primary-light mt-8 ">
      <div className="container-custom">
        <div className="bg-white rounded-2xl rounded-0xl md:rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative h-72 md:h-96 rounded-0xl md:rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                alt="Delicious cupcakes"
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-pink-700/50"></div>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <h3 className="font-cursive text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                  Sweet Deals
                </h3>
                <p className="text-lg md:text-xl text-gray-100 mb-6 max-w-xl">
                  Get exclusive offers and cake inspiration for every occasion.
                </p>
                <a
                  href="/shop"
                  className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-8 rounded-full shadow-md transition duration-300"
                >
                  Shop Now
                </a>
              </div>
            </div>


            {/* Right side - Form */}
            <div className="p-8 md:p-3">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3">
                Get 10% OFF Your First Order!
              </h2>
              <p className="text-gray-600 mb-6">
                Subscribe to our newsletter and receive exclusive offers, cake inspiration, and be the first to know about new flavors and seasonal specials.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                
                  <div className="space-y-2">
                    {/* Name Field */}
                   

                    {/* Email Field */}
                    {/* <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label> */}
                    <input
                      type="email"
                      id="email"
                      // value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className={`w-full px-4 py-3 rounded-lg border ${error ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-700`}
                    />

                    {/* Message Textarea */}
                    {/* <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label> */}
                    <textarea
                      id="message"
                      // value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Your Message..."
                      rows="4"
                      className={`w-full px-4 py-3 rounded-lg border ${error ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-700`}
                    ></textarea>

                    {/* Error Message */}
                    {error && (
                      <p className="text-red-500 text-sm mt-1">{error}</p>
                    )}


                  </div>

                </div>

                <div className="flex items-center">
                  <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                    I agree to receive email newsletters from Sweet Delights
                  </label>
                </div>
                {/* bg- */}
                <div className='ext-center'>
                  <button
                    type="submit"
                    className="w-50 text-white rounded-md bg-gray-900 py-3"
                  >
                    Subscribe Now
                  </button>
                </div>

                {isSubmitted && (
                  <div className="bg-green-50 text-green-800 px-4 py-3 rounded-lg text-sm">
                    Thank you for subscribing! Your 10% discount code has been sent to your email.
                  </div>
                )}

                
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
