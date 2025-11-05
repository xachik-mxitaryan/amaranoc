import React from "react";

export default function SidebarFilters({
  location,
  setLocation,
  price,
  setPrice,
  people,
  setPeople,
  rooms,
  setRooms,
  applyFilters,
}) {
  const regions = [
    "Երևան",
    "Արագածոտն",
    "Արարատ",
    "Արմավիր",
    "Գեղարքունիք",
    "Կոտայք",
    "Լոռի",
    "Շիրակ",
    "Էջմիածին",
    "Աբովյան",
    "Շահումյան",
    "Մասիս",
    "Վանաձոր",
    "Գյումրի",
    "Ստեփանավան",
    "Սևան",
  ];

  const toggleRegion = (region) => {
    setLocation((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region]
    );
  };

  const handlePriceChange = (e, type) => {
    const value = e.target.value;
    setPrice((prev) => ({ ...prev, [type]: value }));
  };

  const handleRoomClick = (num) => {
    setRooms(num === "Բոլորը" ? null : num);
  };

  return (
    <div className="w-64 bg-white shadow rounded-xl p-4 space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Տարածաշրջան</h3>
        <div className="space-y-2">
          {regions.map((region) => (
            <label
              key={region}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={location.includes(region)}
                onChange={() => toggleRegion(region)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              {region}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Գին</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={price.min || ""}
            onChange={(e) => handlePriceChange(e, "min")}
            className="w-20 border rounded-lg px-2 py-1 text-sm focus:ring-1 focus:ring-indigo-500"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            placeholder="Max"
            value={price.max || ""}
            onChange={(e) => handlePriceChange(e, "max")}
            className="w-20 border rounded-lg px-2 py-1 text-sm focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          Մարդկանց թույլատրելի քանակ
        </h3>
        <button className="size-10 w-2.5rem h-2.5rem bg-gray-200 rounded-4xl">-</button>
        <input
          type="number"
          value={people || ""}
          onChange={(e) => setPeople(e.target.value)}
          placeholder="Քանակ"
          className="w-10 border rounded-lg px-2 py-1 text-sm focus:ring-1 focus:ring-indigo-500"
        />
        <button className="size-10 w-2.5rem h-2.5rem bg-gray-200 rounded-4xl">+</button>
      </div>
          <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          Մարդկանց թույլատրելի քանակը գիշերակացով
        </h3>
        <button className="size-10 w-2.5rem h-2.5rem bg-gray-200 rounded-4xl">-</button>
        <input
          type="number"
          value={people || ""}
          onChange={(e) => setPeople(e.target.value)}
          placeholder="Քանակ"
          className="w-10 border rounded-lg px-2 py-1 text-sm focus:ring-1 focus:ring-indigo-500"
        />
        <button className="size-10 w-2.5rem h-2.5rem bg-gray-200 rounded-4xl">+</button>
      </div>
      <div className="flex flex-wrap gap-2">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          Գիշերակացի առկայություն
        </h3>
          {["Բոլորը","Այո","Ոչ"].map((num) => (
            <button
              key={num}
              onClick={() => handleRoomClick(num)}
              className={`px-3 py-1 text-sm rounded-full border ${rooms === num
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "border-gray-300 text-gray-700 hover:bg-indigo-50 hover:border-indigo-400"
                }`}
            >
              {num}
            </button>
          ))}
        </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          Սենյակների քանակը
        </h3>
        <div className="flex flex-wrap gap-2">
          {["Բոլորը", 1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onClick={() => handleRoomClick(num)}
              className={`px-3 py-1 text-sm rounded-full border ${rooms === num
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "border-gray-300 text-gray-700 hover:bg-indigo-50 hover:border-indigo-400"
                }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          Սանհանգույցների  քանակը
        </h3>
        <div className="flex flex-wrap gap-2">
          {["Բոլորը", 1, 2, "3+"].map((num) => (
            <button
              key={num}
              onClick={() => handleRoomClick(num)}
              className={`px-3 py-1 text-sm rounded-full border ${rooms === num
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "border-gray-300 text-gray-700 hover:bg-indigo-50 hover:border-indigo-400"
                }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
          Լողավազան
        </h3>
        <div className="flex flex-wrap gap-2">
          {["Բոլորը","Բաց","Փակ","Տաքացվող","Առանց լողավազանի"].map((num) => (
            <button
              key={num}
              onClick={() => handleRoomClick(num)}
              className={`px-3 py-1 text-sm rounded-full border ${rooms === num
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "border-gray-300 text-gray-700 hover:bg-indigo-50 hover:border-indigo-400"
                }`}
            >
              {num}
            </button>
            
          ))}
          
        </div>
          </div>
      <div>
        <button
          onClick={applyFilters}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Փնտրել
        </button>
      </div>
    </div>
  );
}
