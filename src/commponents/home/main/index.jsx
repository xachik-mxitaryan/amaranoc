import React, { useEffect, useState, useMemo } from "react";
import SidebarFilters from "./sidebarFilters";
import { dbRealtime, ref, get } from "../../../firebase";
import { FaMapMarkerAlt, FaUsers, FaStar, FaSwimmingPool } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


export default function Home() {
  const [homes, setHomes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
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

  const [filteredHomes, setFilteredHomes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await get(ref(dbRealtime, "homes"));
        if (snapshot.exists()) {
          const dataObj = snapshot.val();
          let items = Array.isArray(dataObj) ? dataObj : Object.values(dataObj);
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

  useEffect(() => {
    let data = [...homes];
    if (filters.regions.length) {
      data = data.filter(h => filters.regions.includes(h.addres));
    }
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
  const totalPages = Math.ceil(filteredHomes.length / 10);
  const paginatedHomes = useMemo(() => {
    const start = (currentPage - 1) * 10;
    const end = start + 10;
    return filteredHomes.slice(start, end);
  }, [filteredHomes, currentPage]);
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
              <h1 className="text-2xl font-bold">Լավագույն առաջարկներ</h1>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHomes.length === 0 && (
              <div className="col-span-full text-center text-gray-500 mt-10">
                Համապատասխան արդյունքներ չկան
              </div>
            )}

            {paginatedHomes.map((h, idx) => (
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
                    {h.images.length ? (
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
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex justify-center gap-3 items-center">
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-[#fd993a]" />{" "}
                        {h.addres}
                      </span>

                      <span className="flex items-center gap-1">
                        <FaUsers className="text-gray-400" /> {h.peopleCaunt}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 bg-[#fd993a] text-white px-2 py-1 rounded-lg text-sm font-medium">
                      <FaStar className="text-white" /> {h.star || 0}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">

                    <div className="text-[20px] font-bold text-[#575b65] transition">
                      {Number(h.price || 0).toLocaleString()} ֏
                    </div>
                  </div>




                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-10">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                ←
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-full ${currentPage === i + 1
                    ? "bg-[#f97316] text-white font-semibold"
                    : "bg-gray-100 hover:bg-gray-200"
                    }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                →
              </button>
            </div>
          )}


        </div>
      </div>
    </div>
  );
}
