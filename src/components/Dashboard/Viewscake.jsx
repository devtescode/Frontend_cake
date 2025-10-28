import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Viewscake = () => {
  const { id } = useParams();
  console.log(id, "my page id");
  
  const [cake, setCake] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCakeDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:4500/admin/getsingleplan/${id}`);
        console.log(res, "get response");
        
        // ✅ FIX HERE
        setCake(res.data); 
      } catch (error) {
        console.log("Error fetching cake:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCakeDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <p className="text-gray-500">Loading...</p>
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
    <div className="max-w-3xl mx-auto px-4 py-6">
      <img
        src={cake.image}
        alt={cake.name}
        className="w-full h-80 object-cover rounded-lg"
      />

      <h2 className="text-2xl font-bold mt-4">{cake.name}</h2>

      <p className="text-gray-600 mt-2">{cake.description}</p>

      <div className="flex items-center gap-3 mt-3">
        <p className="text-pink-500 font-bold text-xl">
          ₦ {Number(cake.price).toLocaleString()}
        </p>
        <p className="line-through text-gray-400">
          ₦ {(Number(cake.price) + 5000).toLocaleString()}
        </p>
      </div>

      <button className="mt-6 bg-pink-500 text-white px-5 py-2 rounded-lg hover:bg-pink-600 transition-colors">
        Add to Cart
      </button>
    </div>
    </>
  );
};

export default Viewscake;
