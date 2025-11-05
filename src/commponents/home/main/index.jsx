import React, { useEffect, useState } from "react";
import SidebarFilters from "./sidebarFilters";
import { dbRealtime, ref, get } from "./../../../firebase";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { FaMapMarkerAlt, FaUsers, FaStar } from "react-icons/fa";

export default function Index() {
    
    const main = [
        { id: "mansion", title: "Առանձնատներ", icon: "https://api.amaranoc.am/home.svg" },
        { id: "frame houses", title: "Frame houses", icon: "https://api.amaranoc.am/frame_house.svg" },
        { id: "homes", title: "Տնակներ", icon: "https://api.amaranoc.am/cabins.svg" },
        { id: "swimming pool", title: "Փակ լողավազան", icon: "https://api.amaranoc.am/close_pool.svg" },
        { id: "silent", title: "Աղմուկից հեռու", icon: "https://api.amaranoc.am/far_from_noise.svg" },
        { id: "magnificent view", title: "Շքեղ տեսարան", icon: "https://api.amaranoc.am/view.svg" },
        { id: "required", title: "Պահանջված", icon: "https://api.amaranoc.am/nobel.svg" },
        { id: "pavilion", title: "Տաղավար", icon: "https://api.amaranoc.am/pavilion.svg" },
        { id: "hotels", title: "Հյուրանոցներ", icon: "https://api.amaranoc.am/hotel.svg" },
    ];
    const [homes, setHomes] = useState([]);
    const [filteredHomes, setFilteredHomes] = useState([]);

    const [location, setLocation] = useState([]);
    const [price, setPrice] = useState({ min: "", max: "" });
    const [people, setPeople] = useState(null);
    const [rooms, setRooms] = useState(null);
    const [active, setActive] = useState("mansion");

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
  <div className="p-4 bg-gray-50 min-h-screen">

    <div className="w-full border-b pb-2 mb-6">
      <div className="flex items-center gap-6 overflow-x-auto no-scrollbar px-2 py-3">
        {main.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActive(item.id);

              const filtered = homes.filter((h) =>
                (h.category || "").toLowerCase().includes(item.id.toLowerCase())
              );
              setFilteredHomes(item.id ? filtered : homes);
            }}
            className="flex flex-col items-center gap-1 shrink-0 group"
          >
            <img
              src={item.icon}
              alt={item.title}
              className="w-6 h-6 opacity-80 group-hover:opacity-100 transition"
            />
            <span
              className={`text-xs whitespace-nowrap ${
                active === item.id ? "text-black font-medium" : "text-gray-500"
              }`}
            >
              {item.title}
            </span>

            <span
              className={`h-2px w-6 mt-1 rounded-full transition ${
                active === item.id ? "bg-orange-500" : "bg-transparent group-hover:bg-gray-300"
              }`}
            ></span>
          </button>
        ))}
      </div>
    </div>

    <div className="flex gap-8">
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

      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHomes.map((home, i) => (
          <div
            key={i}
            className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
          >
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
  </div>
    );
}