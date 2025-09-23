
import React from 'react';

const Categories = () => {
  // Mock data for cake categories
  const categories = [
    {
      id: 1,
      name: 'Birthday Cakes',
      description: 'Make your celebration special',
      image: 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      count: 24,
    },
    {
      id: 2,
      name: 'Wedding Cakes',
      description: 'Elegant designs for your special day',
      image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      count: 18,
    },
    {
      id: 3,
      name: 'Cupcakes',
      description: 'Perfect bite-sized treats',
      image: 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      count: 32,
    },
    {
      id: 4,
      name: 'Chocolate Cakes',
      description: 'Rich and decadent flavors',
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      count: 29,
    },
  ];

  return (
    <section className="section bg-gray-50 mt-10">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-4 tracking-tight">
          Browse By Category
        </h2>
        <p className="text-lg md:text-xl text-gray-600 text-center max-w-2xl mx-auto leading-relaxed mb-4">
          Explore our wide range of <span className="text-pink-500 font-semibold">delicious cakes</span> for every taste and occasion.
        </p>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-2">
          {categories.map((category) => (
            <a
              key={category.id}
              // href={`/category/${category.id}`}
              className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              {/* Category Image */}
              <div className="h-72 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Category Info Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
                <h3 className="font-serif font-bold text-xl mb-1">{category.name}</h3>
                <p className="text-sm text-gray-200 mb-2">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                    {category.count} Products
                  </span>
                  <span className="text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                    View All
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
