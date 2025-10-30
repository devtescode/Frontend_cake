import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cakespage = () => {
    const [cakes, setCakes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCakes = async () => {
            try {
                const res = await axios.get("http://localhost:4500/admin/admingetplan");
                // console.log(res, "get responde");

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

    // ✅ Main function: checks if price changed before regenerating
    const getOldPrice = (cakeId, currentPrice) => {
        const savedData = JSON.parse(localStorage.getItem("oldPrices") || "{}");

        const existing = savedData[cakeId];

        // If we have a record and price hasn't changed → return saved one
        if (existing && existing.currentPrice === currentPrice) {
            return existing.oldPrice;
        }

        // Otherwise, regenerate a new old price
        const oldPrice = generateOldPrice(currentPrice);

        // Save both oldPrice and currentPrice for future comparison
        savedData[cakeId] = { oldPrice, currentPrice };
        localStorage.setItem("oldPrices", JSON.stringify(savedData));

        return oldPrice;
    };


    const navigate = useNavigate();

    // const handleViewCake = (cake) => {
    //     navigate(`/viewscakes/${cake._id}`);
    //     console.log(cake, "our cakes");

    // };








    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh] text-lg font-medium text-gray-600">
                Loading cakes...
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

                                <p className="text-gray-900 text-md mt-2">{cake.name}</p>

                                <div className="flex items-center gap-2 mt-1">
                                    <p className="font-bold text-pink-500">
                                        ₦ {Number(cake.price).toLocaleString()}
                                    </p>
                                    <p className="text-gray-400 line-through text-sm">
                                        ₦ {Number(oldPrice).toLocaleString()}
                                    </p>
                                </div>

                                {/* ✅ View to Add button */}
                                {/* <button
                                    onClick={() => handleViewCake(cake)}
                                    className="mt-3 w-full bg-pink-500 text-white py-2 rounded-lg text-sm hover:bg-pink-600 transition-colors"
                                >
                                    View to Add
                                </button> */}


                                <button
                                    onClick={() => {
                                        navigate(`/userdashboard/viewscake/${cake._id}`)
                                    }}
                                    className="mt-3 bg-pink-500 text-white px-3 py-2 rounded-lg text-sm">
                                    View to Add
                                </button>


                            </div>
                        );
                    })}
                </div>
            )}
        </div>

    );
};

export default Cakespage;
