
import React from 'react';
import { FaLeaf, FaTruck, FaMoneyBillWave, FaBirthdayCake } from 'react-icons/fa';

const WhyChooseUs = () => {
  // Features data
  const features = [
    {
      id: 1,
      icon: <FaLeaf className="text-4xl text-primary" />,
      title: 'Fresh & Quality Ingredients',
      description: 'We use only the finest and freshest ingredients in all our cakes and pastries.',
    },
    {
      id: 2,
      icon: <FaTruck className="text-4xl text-primary" />,
      title: 'Fast & Safe Delivery',
      description: 'Our special packaging ensures your cake arrives in perfect condition.',
    },
    {
      id: 3,
      icon: <FaMoneyBillWave className="text-4xl text-primary" />,
      title: 'Affordable Prices',
      description: 'Quality cakes at reasonable prices that wont break your budget.',
    },
    {
      id: 4,
      icon: <FaBirthdayCake className="text-4xl text-primary" />,
      title: 'Custom Designs Available',
      description: 'Get a personalized cake designed specifically for your special occasion.',
    },
  ];

  return (
    <section className="section bg-white mt-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=936&q=80" 
                alt="Baker preparing cake" 
                className="w-full h-auto"
              />
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-light-300 backdrop-blur-md text-white p-6 rounded-full shadow-lg hidden md:block">
              <div className="text-center">
                <div className="font-cursive text-xl">Since</div>
                <div className="font-bold text-2xl">2017</div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 h-24 w-24 bg-secondary-light rounded-full opacity-50 hidden md:block"></div>
            <div className="absolute -bottom-8 left-1/4 h-16 w-16 bg-accent-light rounded-full opacity-50 hidden md:block"></div>
          </div>
          
          {/* Right Side - Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Why Choose Our Cakes?</h2>
            <p className="text-gray-700 mb-8">
              At Sweet Delights, we're passionate about creating the most delicious and beautiful cakes for your special moments. 
              With over 8 years of experience, our master bakers combine artistry and flavor to deliver unforgettable treats.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div key={feature.id} className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-serif font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
