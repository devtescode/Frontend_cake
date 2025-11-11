
import React from 'react';
import { FaShoppingCart, FaHeart, FaStar } from 'react-icons/fa';

const FeaturedCakes = () => {
  // Mock data for featured cakes
  const featuredCakes = [
    {
      id: 1,
      name: 'Chocolate Delight',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
      rating: 4.9,
      reviews: 124,
      isNew: true,
      isBestSeller: false,
    },
    {
      id: 2,
      name: 'Strawberry Dream',
      price: 44.99,
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
      rating: 4.7,
      reviews: 98,
      isNew: false,
      isBestSeller: true,
    },
    {
      id: 3,
      name: 'Vanilla Bliss',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
      rating: 4.8,
      reviews: 87,
      isNew: false,
      isBestSeller: false,
    },
    {
      id: 4,
      name: 'Red Velvet',
      price: 49.99,
      image: 'https://imgs.search.brave.com/pTwrqrTZ_fM4VGJVg95HNlVlzL2UkzbO4sUQq4IazGU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzExLzg0LzU4Lzcy/LzM2MF9GXzExODQ1/ODcyMDhfTTJzd0th/SDVMa3NBNEl3NkhH/WW5Ic1B5MDVKQThD/bE0uanBn',
      rating: 5.0,
      reviews: 156,
      isNew: false,
      isBestSeller: true,
    }
  ];

  return (
    <section className="section  mt-5">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center mb-1">
          Our Featured Cakes
        </h2>
        <p className="text-lg md:text-xl text-gray-600 text-center max-w-2xl mx-auto leading-relaxed">
          Handcrafted with love and the finest ingredients, our cakes are perfect for any occasion.
        </p>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-2 mt-4">
          {featuredCakes.map((cake) => (
            <div key={cake.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden group">
              {/* Product Image with Badges */}
              <div className="relative overflow-hidden">
                <img
                  src={cake.image}
                  alt={cake.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {cake.isNew && (
                    <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                      New
                    </span>
                  )}
                  {cake.isBestSeller && (
                    <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                      Best Seller
                    </span>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-white rounded-full p-2 shadow-md hover:bg-primary-light transition-colors">
                    <FaHeart className="text-primary" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <div className="flex items-center text-yellow-400">
                    <FaStar />
                    <span className="ml-1 text-sm font-medium text-gray-700">{cake.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">({cake.reviews} reviews)</span>
                </div>

                <h3 className="font-serif font-bold text-lg mb-1">{cake.name}</h3>
                <p className="font-bold text-primary-dark text-lg mb-3">£{cake.price}</p>

                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium hover:text-primary-dark transition-colors">
                    View Details
                  </p>
                  <button className="btn btn-primary py-1.5 px-4 flex items-center text-sm">
                    <FaShoppingCart className="mr-1" /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <p className="btn btn-secondary">
            View All Cakes
          </p>
          {/* <a href="/shop" className="btn btn-secondary">
            View All Cakes
          </a> */}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCakes;
