import React, { useEffect, useState } from "react";
import SidebarFilters from "./sidebarFilters";
import { dbRealtime, ref, get } from "./../../../firebase";

// 🌀 Swiper (Image Slider)
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// ⭐ Icons
import { FaMapMarkerAlt, FaUsers, FaStar } from "react-icons/fa";

export default function Index() {
    const [homes, setHomes] = useState([]);
    const [filteredHomes, setFilteredHomes] = useState([]);

    const [location, setLocation] = useState([]);
    const [price, setPrice] = useState({ min: "", max: "" });
    const [people, setPeople] = useState(null);
    const [rooms, setRooms] = useState(null);

    // ✅ Fetch from Firebase Realtime Database
    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await get(ref(dbRealtime, "homes"));
                if (snapshot.exists()) {
                    const data = Object.values(snapshot.val());
                    setHomes(data);
                    setFilteredHomes(data);
                } else {
                    console.log("No data found");
                }
            } catch (error) {
                console.error("Firebase fetch error:", error);
            }
        };

        fetchData();
    }, []);

    // ✅ Filter logic
    const applyFilters = () => {
        let filtered = [...homes];

        if (location.length > 0)
            filtered = filtered.filter((home) => location.includes(home.address));

        if (price.min) filtered = filtered.filter((h) => h.price >= Number(price.min));
        if (price.max) filtered = filtered.filter((h) => h.price <= Number(price.max));

        if (people) filtered = filtered.filter((h) => h.peopleCount >= Number(people));

        if (rooms && rooms !== "Բոլորը") {
            if (rooms === "3+") filtered = filtered.filter((h) => h.rooms >= 3);
            else filtered = filtered.filter((h) => h.rooms === Number(rooms));
        }

        setFilteredHomes(filtered);
    };

    return (
        <div className="flex gap-8 p-8 bg-gray-50 min-h-screen">
            {/* 🧭 Sidebar Filters */}
            <SidebarFilters
                location={location}
                setLocation={setLocation}
                price={price}
                setPrice={setPrice}
                people={people}
                setPeople={setPeople}
                rooms={rooms}
                setRooms={setRooms}
                applyFilters={applyFilters}
            />

            {/* 🏡 Home Cards */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHomes.map((home, i) => (
                    <div
                        key={i}
                        className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                        {/* 🖼️ Image Slider */}
                        <Swiper
                            navigation
                            pagination={{ clickable: true }}
                            modules={[Navigation, Pagination]}
                            className="w-full h-56"
                        >
                            {home.images?.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={img}
                                        alt={home.address}
                                        className="w-full h-56 object-cover"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* 🏠 Info */}
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-1">
                                <h4 className="font-semibold text-lg text-gray-800 truncate">
                                    {home.address}
                                </h4>
                                <div className="flex items-center gap-1 bg-orange-100 text-orange-600 px-2 py-1 rounded-md text-sm font-medium">
                                    <FaStar className="text-orange-500" />
                                    {home.starCount || 5}
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                                <span className="flex items-center gap-1">
                                    <FaMapMarkerAlt className="text-indigo-500" />
                                    {home.address}
                                </span>
                                <span className="flex items-center gap-1">
                                    <FaUsers className="text-indigo-500" />
                                    {home.peopleCount}
                                </span>
                            </div>

                            <p className="text-xl font-semibold text-gray-800">
                                {home.price.toLocaleString()} ֏
                            </p>
                        </div>
                    </div>
                ))}

                {filteredHomes.length === 0 && (
                    <div className="col-span-full text-gray-500 text-center mt-20">
                        😕 Համապատասխան արդյունքներ չկան
                    </div>
                )}
            </div>
        </div>
    );
}
