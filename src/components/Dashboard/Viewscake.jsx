import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Heart, ShoppingCart, Star, Truck, RotateCcw } from "lucide-react"
import logo from '../../assets/logo.png'
import { FaSpinner } from "react-icons/fa";
import { API_URLS } from "../../utils/apiConfig";
// import ukData from "../../../public/ukData.json";


const Viewscake = () => {
  // const { id } = useParams();
  // console.log(id, "my page id");

  // const [cake, setCake] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchCakeDetails = async () => {
  //     try {
  //       const res = await axios.get(`http://localhost:4500/admin/getsingleplan/${id}`);
  //       setCake(res.data);
  //     } catch (error) {
  //       console.log("Error fetching cake:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCakeDetails();
  // }, [id]);

  // const [ukData, setUkData] = useState([]);
  // const [selectedRegion, setSelectedRegion] = useState("");
  // const [filteredCities, setFilteredCities] = useState([]);
  // const [selectedCity, setSelectedCity] = useState("");
  // const [deliveryAddress, setDeliveryAddress] = useState("");


  // useEffect(() => {
  //   fetch("/ukData.json")
  //     .then((res) => {
  //       if (!res.ok) throw new Error("Failed to load JSON");
  //       return res.json();
  //     })
  //     .then((data) => setUkData(data))
  //     .catch((err) => console.error("Error loading JSON:", err));
  // }, []);

  // // Extract all unique regions
  // const uniqueRegions = [...new Set(ukData.map((item) => item.admin_name))];

  // // Whenever region changes, update available cities
  // useEffect(() => {
  //   if (selectedRegion) {
  //     const cities = ukData
  //       .filter((item) => item.admin_name === selectedRegion)
  //       .map((item) => item.city);
  //     setFilteredCities(cities);
  //     setSelectedCity(""); // reset city selection
  //   } else {
  //     setFilteredCities([]);
  //   }
  // }, [selectedRegion, ukData]);


  // const oldPrices = JSON.parse(localStorage.getItem("oldPrices") || "{}");
  // const oldPrice = cake && oldPrices[cake._id]?.oldPrice; // ✅ access .oldPrice safely



  // if (loading) {
  //   return (
  //     <div className=" py-20 flex justify-center items-center h-[60vh] text-lg font-medium text-gray-600">
  //       <FaSpinner className="animate-spin text-4xl text-pink-500" />
  //     </div>
  //   );
  // }

  // if (!cake) {
  //   return (
  //     <div className="text-center mt-20 text-red-500 font-bold">
  //       Cake not found.
  //     </div>
  //   );
  // }

  const { id } = useParams();
  const [cake, setCake] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ukData, setUkData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Fetch Cake Details
  useEffect(() => {
    const fetchCakeDetails = async () => {
      try {
        const res = await axios.get(API_URLS.getsingleplan(id));
        setCake(res.data);
      } catch (error) {
        console.log("Error fetching cake:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCakeDetails();
  }, [id]);

  // ✅ Load UK Data from JSON
  useEffect(() => {
    fetch("/ukData.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load JSON");
        return res.json();
      })
      .then((data) => setUkData(data))
      .catch((err) => console.error("Error loading JSON:", err));
  }, []);

  // ✅ Extract Unique Regions
  const uniqueRegions = [...new Set(ukData.map((item) => item.admin_name))];

  // ✅ Filter cities based on selected region
  useEffect(() => {
    if (selectedRegion) {
      const cities = ukData
        .filter((item) => item.admin_name === selectedRegion)
        .map((item) => item.city);
      setFilteredCities(cities);
      setSelectedCity("");
    } else {
      setFilteredCities([]);
    }
  }, [selectedRegion, ukData]);

  // ✅ Get old price from localStorage
  const oldPrices = JSON.parse(localStorage.getItem("oldPrices") || "{}");
  const oldPrice = cake && oldPrices[cake._id]?.oldPrice;

  // ✅ Handle Add to Cart
  const handleAddToCart = async () => {
    const userData = JSON.parse(localStorage.getItem("UserData"));

    if (!userData) {
      return Swal.fire("Login Required", "Please log in to continue", "warning");
    }

    if (!selectedRegion || !selectedCity || !deliveryAddress) {
      return Swal.fire("Incomplete Info", "Please fill in your delivery details", "info");
    }

    try {
      setIsSubmitting(true);
      const storedUser = JSON.parse(localStorage.getItem("UserData"));
      const userId = storedUser?.id; // ✅ use .id instead of ._id
      const res = await axios.post(API_URLS.useraddorder, {
        userId,
        planId: cake._id,
        region: selectedRegion,
        city: selectedCity,
        address: deliveryAddress,
      });

      // console.log(res, "response");


      // Swal.fire({
      //   title: "Order Added!",
      //   text: "Your order has been successfully added.",
      //   icon: "success",
      //   timer: 2000,
      //   showConfirmButton: false,
      // });

      // Beautiful toast notification at the bottom
      Swal.fire({
        toast: true,                // enable toast mode
        position: 'bottom-end',     // bottom right corner
        icon: 'success',
        title: 'Order added successfully!',
        showConfirmButton: false,
        timer: 10000,               // display for 10 seconds
        timerProgressBar: true,     // show progress bar
        background: '#f6339a',      // soft green background
        color: '#fff',              // white text
        showClass: {
          popup: 'animate__animated animate__fadeInUp',    // animate.css fade in
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutDown', // fade out
        }
      });
      console.log("Order created:", res.data);
      // Clear delivery selection after successful order
      setSelectedRegion("");
      setSelectedCity("");
      setDeliveryAddress("");
    } catch (error) {
      console.error("Error saving order:", error);
      Swal.fire("Error", "Unable to add order. Please try again.", "error");
    }
    finally {
      setIsSubmitting(false);
    }
  };


  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center h-[60vh] text-lg font-medium text-gray-600">
        <FaSpinner className="animate-spin text-4xl text-pink-500" />
      </div>
    );
  }

  if (!cake) {
    return (
      <div className="text-center mt-20 text-red-500 font-bold">
        Cake not found.
      </div>
    );
  }



  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg p-4 sticky top-6">
                <img
                  src={cake.image || "/placeholder.svg"}
                  alt={cake.image}
                  className="w-full h-80 object-cover rounded-lg mb-4"
                />

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm font-semibold text-gray-800 mb-3">SHARE THIS PRODUCT</p>
                  <div className="flex gap-3 justify-center">
                    <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
                      <span className="text-lg">f</span>
                    </button>
                    <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
                      <span className="text-lg">𝕏</span>
                    </button>
                    <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
                      <span className="text-lg">💬</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Center Column - Product Details */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg p-6">
                {/* Title and Wishlist */}
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-2xl font-bold text-gray-900 flex-1">{cake.name}</h1>
                  <button className="text-red-400 hover:text-red-500 ml-4">
                    <Heart size={24} fill="#f6339a" />
                  </button>
                </div>

                {/* Price Section */}
                <div className="mb-4">
                  {cake && (
                    <div className="flex items-center gap-3 mt-3">
                      <p className="text-pink-500 font-bold text-xl">
                        ₦ {Number(cake.price).toLocaleString()}
                      </p>
                      {oldPrice && (
                        <span className="text-lg line-through text-gray-400">
                          ₦ {Number(oldPrice).toLocaleString()}
                        </span>
                      )}
                    </div>
                  )}


                  <p className="text-orange-500 font-semibold text-sm">{cake.description}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex gap-1">
                    {/* {[...Array(4)].map((_, i) => ( */}
                    <Star fill="#f6339a" stroke="#f6339a" />
                    {/* ))} */}
                    <Star size={20} stroke="#D1D5DB" />
                  </div>
                  <span className="text-sm text-gray-600"> verified ratings</span>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={isSubmitting}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 mb-6 transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin" /> Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={20} /> Add to Cart
                    </>
                  )}
                </button>



                {/* Promotions */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-bold text-gray-900 mb-4">PROMOTIONS</h3>
                  <div className="space-y-3">
                    <div className="flex gap-3 items-start">
                      <span className="text-orange-500 text-xl">⭐</span>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">WhatsApp on 07034501354 To Place Your Order</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <span className="text-orange-500 text-xl">⭐</span>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          Enjoy cheaper delivery fees when you select a PickUp Nearby.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Delivery & Returns */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg p-6 space-y-6">
                {/* Header */}
                <div>
                  <h2 className="font-bold text-gray-900 mb-0">DELIVERY & RETURNS</h2>
                  <div className="flex items-center mb-0 text-sm">
                    Sweet Delights <img src={logo} alt="Logo" className="h-15 w-15" />
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    The BEST products, delivered faster. Now PAY on DELIVERY, Cash or Bank Transfer Anywhere, Zero Wahala!{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Details
                    </a>
                  </p>
                </div>

                <div>
                  <div className="space-y-3">
                    {/* Choose Region */}
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Choose your region</h3>
                      <select
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="">Select a region</option>
                        {uniqueRegions.map((region, idx) => (
                          <option key={idx} value={region}>
                            {region}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Choose City */}
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Choose your city</h3>
                      <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        disabled={!selectedRegion}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100"
                      >
                        <option value="">
                          {selectedRegion ? "Select a city" : "Select a region first"}
                        </option>
                        {filteredCities.map((city, idx) => (
                          <option key={idx} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* ✅ Address Textarea */}
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Delivery Address</h3>
                      <textarea
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        rows="3"
                        placeholder="Enter your full delivery address (e.g., Flat 2B, 14 Oxford Street, London)"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                      />

                    </div>

                    {/* Display selection summary */}
                    {selectedCity && selectedRegion && (
                      <p className="mt-4 text-gray-700">
                        You selected <strong>{selectedCity}</strong> in{" "}
                        <strong>{selectedRegion}</strong>.
                      </p>
                    )}
                  </div>
                </div>


                {/* Pickup Station */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Truck size={24} className="text-gray-700" />
                      <div>
                        <p className="font-bold text-gray-900">Pickup Station</p>
                        <p className="text-sm text-gray-600">Delivery Fees ₦ 1,500</p>
                      </div>
                    </div>
                    <a href="#" className="text-blue-600 text-xs hover:underline">
                      Details
                    </a>
                  </div>
                  <p className="text-xs text-gray-700 ml-12">
                    Ready for pickup between 31 October and 04 November if you place your order within the next 6hrs
                    10mins
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Truck size={24} className="text-gray-700" />
                      <div>
                        <p className="font-bold text-gray-900">Door Delivery</p>
                        <p className="text-sm text-gray-600">Delivery Fees ₦ 2,500</p>
                      </div>
                    </div>
                    <a href="#" className="text-blue-600 text-xs hover:underline">
                      Details
                    </a>
                  </div>
                  <p className="text-xs text-gray-700 ml-12">
                    Ready for delivery between 31 October and 04 November if you place your order within the next 6hrs
                    10mins
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <RotateCcw size={24} className="text-gray-700" />
                    <div>
                      <p className="font-bold text-gray-900">Return Policy</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-700 ml-12">
                    Free return within 7 days for ALL eligible items{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Details
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Viewscake;
