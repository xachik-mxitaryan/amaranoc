// src/pages/Home.jsx
import React, { useEffect, useState, useMemo } from "react";
import SidebarFilters from "./sidebarFilters";
import { dbRealtime, ref, get } from "../../../firebase";
import { FaMapMarkerAlt, FaUsers, FaStar, FaSwimmingPool } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/*
  Uses DB fields exactly as you provided:
  addres, advantages (array), allSurface, baseyn (string),
  homeSurface, id, images (array), isSleep (boolean),
  peopleCaunt, peopleSleepCaunt, price, rooms, sleepPrice, star, tualets
*/

export default function Home() {
  const [homes, setHomes] = useState([]);
  const [filters, setFilters] = useState({
    regions: [],        // array of selected regions
    minPrice: 0,
    maxPrice: 9999999,
    rooms: null,        // number or null
    bathrooms: null,    // number or null
    peopleDay: null,
    peopleNight: null,
    pool: null,         // "Փակ" | "Բաց" | "Տաքացվող" | null
    sleep: null,        // true | false | null
    advantages: [],     // array of strings
    stars: null         // number or null
  });

  const [filteredHomes, setFilteredHomes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await get(ref(dbRealtime, "homes"));
        if (snapshot.exists()) {
          // snapshot.val() could be an object keyed by id — convert to array
          const dataObj = snapshot.val();
          let items = Array.isArray(dataObj) ? dataObj : Object.values(dataObj);
          // Defensive: ensure arrays exist
          items = items.map(h => ({
            ...h,
            advantages: h.advantages || [],
            images: h.images || [],
            star: h.star || h.stars || 0
          }));
          setHomes(items);
          setFilteredHomes(items);
        } else {
          setHomes([]);
          setFilteredHomes([]);
        }
      } catch (err) {
        console.error("Firebase fetch error:", err);
      }
    };

    fetchData();
  }, []);

  // Apply filters immediately whenever filters or homes change
  useEffect(() => {
    let data = [...homes];

    // Regions (multiple)
    if (filters.regions.length) {
      data = data.filter(h => filters.regions.includes(h.addres));
    }

    // Price range
    data = data.filter(h => {
      const price = Number(h.price || 0);
      return price >= Number(filters.minPrice || 0) && price <= Number(filters.maxPrice || 9999999);
    });

    if (filters.rooms) {
      data = data.filter(h => Number(h.rooms || 0) >= Number(filters.rooms));
    }
    if (filters.bathrooms) {
      data = data.filter(h => Number(h.tualets || 0) >= Number(filters.bathrooms));
    }
    if (filters.peopleDay) {
      data = data.filter(h => Number(h.peopleCaunt || 0) >= Number(filters.peopleDay));
    }
    if (filters.peopleNight) {
      data = data.filter(h => Number(h.peopleSleepCaunt || 0) >= Number(filters.peopleNight));
    }

    if (filters.pool) {
      data = data.filter(h => (h.baseyn || "").includes(filters.pool));
    }

    if (filters.sleep !== null) {
      data = data.filter(h => Boolean(h.isSleep) === Boolean(filters.sleep));
    }
    if (filters.advantages.length) {
      data = data.filter(h =>
        filters.advantages.every(a => (h.advantages || []).includes(a))
      );
    }

    if (filters.stars) {
      data = data.filter(h => Number(h.star || 0) >= Number(filters.stars));
    }

    setFilteredHomes(data);
  }, [filters, homes]);
  const regionsList = useMemo(() => {
    const setR = new Set(homes.map(h => h.addres).filter(Boolean));
    return Array.from(setR);
  }, [homes]);
  const resetFilters = () => {
    setFilters({
      regions: [],
      minPrice: 0,
      maxPrice: 9999999,
      rooms: null,
      bathrooms: null,
      peopleDay: null,
      peopleNight: null,
      pool: null,
      sleep: null,
      advantages: [],
      stars: null
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto flex gap-6">
        <SidebarFilters
          filters={filters}
          setFilters={setFilters}
          homes={homes}
          regionsList={regionsList}
          resetFilters={resetFilters}
        />

        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#53079d]">Արդյունքներ</h1>
              <p className="text-sm text-gray-500">{filteredHomes.length} արդյունք</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHomes.length === 0 && (
              <div className="col-span-full text-center text-gray-500 mt-10">
                Համապատասխան արդյունքներ չկան
              </div>
            )}

            {filteredHomes.map((h, idx) => (
              <div
                key={h.id || idx}
                className="bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-xl duration-300"
              >
                <div className="relative">
                  <Swiper
                    navigation
                    pagination={{ clickable: true }}
                    modules={[Navigation, Pagination]}
                    className="h-56 rounded-t-2xl"
                  >
                    {(h.images || []).length ? (
                      h.images.map((img, i) => (
                        <SwiperSlide key={i}>
                          <img
                            src={img}
                            alt={h.addres}
                            className="w-full h-56 object-cover"
                          />
                        </SwiperSlide>
                      ))
                    ) : (
                      <SwiperSlide>
                        <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-gray-400">
                          No image
                        </div>
                      </SwiperSlide>
                    )}
                  </Swiper>

                  {/* Like Button */}
                  <button className="absolute top-3 right-3 bg-white/80 hover:bg-white p-2 rounded-full shadow-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-gray-600 hover:text-red-500 transition"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 
               4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 
               4.5 0 010-6.364z"
                      />
                    </svg>
                  </button>
                </div>

                <div className="p-4">
                  {/* Top info */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{h.addres}</h3>
                      <div className="text-sm text-gray-500 mt-1 flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <FaMapMarkerAlt className="text-gray-400" /> {h.addres}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaUsers className="text-gray-400" /> {h.peopleCaunt}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 bg-orange-100 text-orange-600 px-2 py-1 rounded-lg text-sm font-medium">
                      <FaStar className="text-orange-500" /> {h.star || 0}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      {h.rooms} սենյակ • {h.tualets} լոգարան
                    </div>
                    <div className="text-2xl font-bold text-[#53079d]">
                      {Number(h.price || 0).toLocaleString()} ֏
                    </div>
                  </div>


                  {/* Advantages */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {h.baseyn && (
                      <span className="text-xs px-2 py-1 border border-gray-200 rounded-full bg-gray-50 text-gray-700">
                        {h.baseyn}
                      </span>
                    )}
                    {(h.advantages || []).slice(0, 4).map((a, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 border border-gray-200 rounded-full bg-gray-50 text-gray-700"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}
