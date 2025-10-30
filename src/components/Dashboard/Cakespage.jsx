import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaSpinner } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { div } from "framer-motion/client";

const Cakespage = () => {
    const [cakes, setCakes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCake, setSelectedCake] = useState(null); // 👈 for modal

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCakes = async () => {
            try {
                const res = await axios.get("http://localhost:4500/admin/admingetplan");
                setCakes(res.data.plans);
            } catch (error) {
                console.log("Error fetching cakes", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCakes();
    }, []);

    // ✅ Helper: generate old price randomly within range
    const generateOldPrice = (currentPrice) => {
        let oldPrice;

        if (currentPrice <= 10000) {
            const min = currentPrice + 2000;
            const max = currentPrice + 8000;
            oldPrice = Math.floor(Math.random() * (max - min + 1)) + min;
        } else if (currentPrice <= 30000) {
            const min = Math.floor(currentPrice * 1.2);
            const max = Math.floor(currentPrice * 1.5);
            oldPrice = Math.floor(Math.random() * (max - min + 1)) + min;
        } else {
            const min = Math.floor(currentPrice * 1.3);
            const max = Math.floor(currentPrice * 1.6);
            oldPrice = Math.floor(Math.random() * (max - min + 1)) + min;
        }

        return oldPrice;
    };

    // ✅ Only regenerate if price has changed
    const getOldPrice = (cakeId, currentPrice) => {
        const savedData = JSON.parse(localStorage.getItem("oldPrices") || "{}");
        const existing = savedData[cakeId];

        if (existing && existing.currentPrice === currentPrice) {
            return existing.oldPrice;
        }

        const oldPrice = generateOldPrice(currentPrice);
        savedData[cakeId] = { oldPrice, currentPrice };
        localStorage.setItem("oldPrices", JSON.stringify(savedData));
        return oldPrice;
    };

    if (loading) {
        return (
            // <div className="flex justify-center items-center h-[60vh] text-lg font-medium text-gray-600">
            //     Loading cakes...
            // </div>
        
            <div className=" py-20 flex justify-center items-center h-[60vh] text-lg font-medium text-gray-600">
                <FaSpinner className="animate-spin text-4xl text-pink-500" />
            </div>
            
        );
    }

    return (
        <div className="">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Order Cakes</h2>

            {cakes.length === 0 ? (
                <p className="text-center text-red-500 font-semibold">No cakes available</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {cakes.map((cake) => {
                        const oldPrice = getOldPrice(cake._id, cake.price);

                        return (
                            <div key={cake._id} className="bg-white p-3 rounded-lg shadow-sm">
                                <img
                                    src={cake.image}
                                    alt={cake.name}
                                    className="w-full h-48 object-cover rounded-lg"
                                />

                                <p className="text-gray-900 text-md mt-2 font-semibold">
                                    {cake.name}
                                </p>

                                <div className="flex items-center gap-2 mt-1">
                                    <p className="font-bold text-pink-500">
                                        ₦ {Number(cake.price).toLocaleString()}
                                    </p>
                                    <p className="text-gray-400 line-through text-sm">
                                        ₦ {Number(oldPrice).toLocaleString()}
                                    </p>
                                </div>

                                <div className="flex justify-between items-center mt-2">
                                    {/* 👇 Opens modal */}
                                    <button
                                        onClick={() => setSelectedCake(cake)}
                                        className="text-sm font-medium hover:text-pink-600 transition-colors"
                                    >
                                        View
                                    </button>

                                    <button
                                        onClick={() =>
                                            navigate(`/userdashboard/viewscake/${cake._id}`)
                                        }
                                        className="btn btn-primary py-1.5 px-4 flex items-center text-sm bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                                    >
                                        <FaShoppingCart className="mr-1" /> View to Add
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* ✅ Modal for viewing cake details */}
            <AnimatePresence>
                {selectedCake && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 relative"
                        >
                            {/* ❌ Close Button */}
                            <button
                                onClick={() => setSelectedCake(null)}
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg"
                            >
                                ✕
                            </button>

                            {/* Cake Image */}
                            <img
                                src={selectedCake.image}
                                alt={selectedCake.name}
                                className="w-full h-64 object-contain rounded-xl mb-4 mt-7 bg-white-100 p-2"
                            />


                            {/* Cake Info */}
                            <h2 className="text-xl font-semibold text-gray-800">
                                {selectedCake.name}
                            </h2>
                            <p className="text-pink-600 font-bold mt-1">
                                Price: ₦ {Number(selectedCake.price).toLocaleString()}
                            </p>
                            <p className="text-gray-600 mt-3">
                                Description : {selectedCake.description || "No description available."}
                            </p>

                            <p className="text-sm text-gray-400 mt-2">
                                Category: {selectedCake.category}
                            </p>

                            <div className="mt-5 flex justify-end">
                                <button
                                    onClick={() => setSelectedCake(null)}
                                    className="px-4 py-2 text-sm bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Cakespage;
