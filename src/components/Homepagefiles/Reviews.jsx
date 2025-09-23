
import React, { useState } from 'react';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Reviews = () => {
  // Mock data for customer reviews
  const allReviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 5,
      date: 'August 15, 2025',
      review: 'The birthday cake I ordered was absolutely stunning and tasted even better! Everyone at the party was impressed. The delivery was on time and the cake arrived in perfect condition.',
      product: 'Chocolate Delight Cake',
    },
    {
      id: 2,
      name: 'Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5,
      date: 'July 23, 2025',
      review: 'I ordered a custom wedding cake and it exceeded all my expectations. The design was exactly what we wanted and the taste was incredible. Our guests couldnt stop talking about it!',
      product: 'Custom Wedding Cake',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
      rating: 4,
      date: 'August 2, 2025',
      review: 'The cupcakes were delicious and beautifully decorated. Perfect for our office party. Will definitely order again for future events.',
      product: 'Assorted Cupcakes',
    },
    {
      id: 4,
      name: 'David Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/86.jpg',
      rating: 5,
      date: 'July 30, 2025',
      review: 'Ordered the Red Velvet cake for my wife birthday and she loved it! The cream cheese frosting was perfect - not too sweet. Will be our go-to cake shop from now on.',
      product: 'Red Velvet Cake',
    },
  ];

  // State for current review index
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeReviews, setActiveReviews] = useState(allReviews.slice(0, 3));

  // Handle navigation
  const handlePrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setActiveReviews(allReviews.slice(newIndex, newIndex + 3));
    }
  };

  const handleNext = () => {
    if (currentIndex < allReviews.length - 3) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setActiveReviews(allReviews.slice(newIndex, newIndex + 3));
    }
  };

  // Render stars based on rating
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <FaStar
        key={i}
        className={i < rating ? 'text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <section className="section bg-secondary-light">
      <div className="container-custom mt-15">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-3">
          What Our Customers Say
        </h2>
        <p className="text-base md:text-lg text-gray-600 text-center max-w-xl mx-auto leading-relaxed">
          Don’t just take our word for it  see what our happy customers have to say about our cakes.
        </p>


        <div className="relative">
          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {activeReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-lg shadow-md p-6 relative"
              >
                {/* Quote icon */}
                <div className="absolute top-6 right-6 text-primary-light opacity-30">
                  <FaQuoteLeft size={32} />
                </div>

                {/* Customer info */}
                <div className="flex items-center mb-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-medium">{review.name}</h4>
                    <div className="flex items-center mt-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </div>

                {/* Review text */}
                <p className="text-gray-700 mb-4">
                  {review.review}
                </p>

                {/* Product and date */}
                <div className="flex justify-between items-center text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
                  <span>{review.product}</span>
                  <span>{review.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center mt-10 space-x-4">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`p-3 rounded-full ${currentIndex === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white shadow-md hover:bg-primary hover:text-black transition-colors'
                }`}
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= allReviews.length - 3}
              className={`p-3 rounded-full ${currentIndex >= allReviews.length - 3
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white shadow-md hover:bg-primary hover:text-black transition-colors'
                }`}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-5">
          <p className="text-primary-dark font-medium hover:underline">
            Read All Reviews
          </p>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
