import React, { useEffect, useState, useMemo } from "react";
import SidebarFilters from "./sidebarFilters";
import { dbRealtime, ref, get } from "../../../firebase";
import Card from "./card";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Buttons from "../../buttons";
import { CiGrid2V } from "react-icons/ci";
import { BsGrid3X2GapFill } from "react-icons/bs";

export default function Home({ inputValue, setInputValue }) {
  const [homes, setHomes] = useState([]);
  const [filteredHomes, setFilteredHomes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [active, setActive] = useState(null);
  const [cardView, setCardView] = useState(3);

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
    stars: null,
    category: null,
  });

  useEffect(() => {
    const savedFilters = localStorage.getItem("homeFilters");
    if (savedFilters) {
      const parsed = JSON.parse(savedFilters);
      setFilters(parsed);
      setActive(parsed.category || null);
    }

    const savedView = localStorage.getItem("cardView");
    if (savedView) setCardView(Number(savedView));

    const savedInput = localStorage.getItem("inputValue");
    if (savedInput) setInputValue(savedInput);

    const savedPage = localStorage.getItem("homePage");
    if (savedPage) setCurrentPage(Number(savedPage));
  }, []);

  useEffect(() => {
    localStorage.setItem("homeFilters", JSON.stringify(filters));
  }, [filters]);

  useEffect(() => {
    localStorage.setItem("activeCategory", active);
  }, [active]);

  useEffect(() => {
    localStorage.setItem("cardView", cardView);
  }, [cardView]);

  useEffect(() => {
    localStorage.setItem("inputValue", inputValue || "");
  }, [inputValue]);

  useEffect(() => {
    localStorage.setItem("homePage", currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (inputValue && inputValue.trim() !== "") {
      const filtered = homes.filter(
        (h) =>
          (h.id && h.id.toString().toLowerCase().includes(inputValue.toLowerCase())) ||
          (h.addres && h.addres.toLowerCase().includes(inputValue.toLowerCase())) ||
          (h.category && h.category.toLowerCase().includes(inputValue.toLowerCase()))
      );
      setFilteredHomes(filtered);
      setCurrentPage(1);
    } else {
      setFilteredHomes(homes);
    }
  }, [inputValue, homes]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await get(ref(dbRealtime, "homes"));
        if (snapshot.exists()) {
          const dataObj = snapshot.val();
          let items = Array.isArray(dataObj) ? dataObj : Object.values(dataObj);

          items = items.map((h) => ({
            ...h,
            advantages: h.advantages || [],
            images: h.images || [],
            category: h.category || "",
            star: h.star || h.stars || 0,
          }));

          setHomes(items);
          setFilteredHomes(items);
        }
      } catch (err) {
        console.error("Firebase fetch error:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let data = [...homes];

    if (filters.category) {
      data = data.filter(
        (h) => (h.category || "").toLowerCase() === filters.category.toLowerCase()
      );
    }

    if (filters.regions.length) {
      data = data.filter((h) => filters.regions.includes(h.addres));
    }

    data = data.filter((h) => {
      const price = Number(h.price || 0);
      return price >= filters.minPrice && price <= filters.maxPrice;
    });

    if (filters.rooms) data = data.filter((h) => Number(h.rooms || 0) >= filters.rooms);
    if (filters.bathrooms) data = data.filter((h) => Number(h.tualets || 0) >= filters.bathrooms);
    if (filters.peopleDay) data = data.filter((h) => Number(h.peopleCaunt || 0) >= filters.peopleDay);
    if (filters.peopleNight)
      data = data.filter((h) => Number(h.peopleSleepCaunt || 0) >= filters.peopleNight);

    if (filters.pool) data = data.filter((h) => (h.baseyn || "").includes(filters.pool));

    if (filters.sleep !== null)
      data = data.filter((h) => Boolean(h.isSleep) === Boolean(filters.sleep));

    if (filters.advantages.length)
      data = data.filter((h) =>
        filters.advantages.every((a) => (h.advantages || []).includes(a))
      );

    if (filters.stars) data = data.filter((h) => Number(h.star || 0) >= filters.stars);

    setFilteredHomes(data);
  }, [filters, homes]);


  const regionsList = useMemo(() => {
    const setR = new Set(homes.map((h) => h.addres).filter(Boolean));
    return Array.from(setR);
  }, [homes]);


  const resetFilters = () => {
    const reset = {
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
      stars: null,
      category: null,
    };

    setFilters(reset);
    setActive(null);
    setCurrentPage(1);

    localStorage.setItem("homeFilters", JSON.stringify(reset));
    localStorage.setItem("activeCategory", "");
  };


  const totalPages = Math.ceil(filteredHomes.length / 10);

  const paginatedHomes = useMemo(() => {
    const start = (currentPage - 1) * 10;
    return filteredHomes.slice(start, start + 10);
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
          setInputValue={setInputValue}
        />

        <div className="flex-1">
          <Buttons />

          <div className="w-full border-b pb-2 mb-6">
            <div className="flex items-center gap-6 overflow-x-auto no-scrollbar px-2 py-3">
              {main.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (active === item.id) {
                      setActive(null);
                      resetFilters();
                    } else {
                      setActive(item.id);
                      setFilters((prev) => ({
                        ...prev,
                        category: item.id,
                      }));
                      setCurrentPage(1);
                    }
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
                    className={`h-[2px] w-6 mt-1 rounded-full transition ${
                      active === item.id
                        ? "bg-orange-500"
                        : "bg-transparent group-hover:bg-gray-300"
                    }`}
                  ></span>
                </button>
              ))}
            </div>
          </div>

         <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Լավագույն առաջարկներ</h1>
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => setCardView(2)}
                className={`p-2 rounded-lg ${
                  cardView === 2 ? "bg-black text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                <CiGrid2V size={22} />
              </button>

              <button
                onClick={() => setCardView(3)}
                className={`p-2 rounded-lg ${
                  cardView === 3 ? "bg-black text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                <BsGrid3X2GapFill size={22} />
              </button>
            </div>
          </div>

         <div
            className={`grid gap-6 ${
              cardView === 2
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {filteredHomes.length === 0 && (
              <div className="col-span-full text-center text-gray-500 mt-10">
                Համապատասխան արդյունքներ չեն գտնվել
              </div>
            )}

            {paginatedHomes.map((h, idx) => (
              <Card h={h} idx={idx} key={h.id || idx} />
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
                  className={`px-4 py-2 rounded-full ${
                    currentPage === i + 1
                      ? "bg-[#f97316] text-white font-semibold"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
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
