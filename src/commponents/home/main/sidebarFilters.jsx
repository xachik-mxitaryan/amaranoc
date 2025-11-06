// src/components/SidebarFilters.jsx
import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

/*
 Props:
  - filters (object)
  - setFilters (fn)
  - homes (array)
  - regionsList (array)
  - resetFilters (fn)
*/

const PRIMARY = "#53079d";

const Chip = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 rounded-full text-sm border transition min-w-[44px] text-center ${
      active ? `bg-[${PRIMARY}] text-white border-[${PRIMARY}]` : `bg-white text-[${PRIMARY}] border-gray-200 hover:bg-purple-50`
    }`}
  >
    {children}
  </button>
);

export default function SidebarFilters({ filters, setFilters, homes, regionsList = [], resetFilters }) {
  // Advantages candidates (you can keep or derive from DB)
  const advantagesList = Array.from(new Set(homes.flatMap(h => h.advantages || [])));
  // pool options
  const poolOptions = ["Փակ", "Բաց", "Տաքացվող"];
  // rooms and toilets chips
  const roomOptions = [1, 2, 3, 4, 5, 6];
  const toiletOptions = [1, 2, 3, 4];

  // toggle region in filters.regions (array)
  const toggleRegion = (region) => {
    const arr = filters.regions || [];
    const next = arr.includes(region) ? arr.filter(r => r !== region) : [...arr, region];
    setFilters({ ...filters, regions: next });
  };

  const toggleAdvantage = (adv) => {
    const arr = filters.advantages || [];
    const next = arr.includes(adv) ? arr.filter(a => a !== adv) : [...arr, adv];
    setFilters({ ...filters, advantages: next });
  };

  const toggleChipValue = (key, value) => {
    // if same -> clear, else set value
    setFilters(prev => ({ ...prev, [key]: prev[key] === value ? null : value }));
  };

  const setNumeric = (key, val) => {
    setFilters(prev => ({ ...prev, [key]: val === "" ? null : Number(val) }));
  };

  const incDec = (key, inc = 1) => {
    const cur = Number(filters[key] || 0);
    const next = Math.max(0, cur + inc);
    setFilters(prev => ({ ...prev, [key]: next || null }));
  };

  return (
    <aside className="w-72 bg-white rounded-2xl p-5 shadow border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-[#53079d]">Ֆիլտրեր</h3>
        <button
          onClick={resetFilters}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Սկիզբ
        </button>
      </div>

      {/* Regions (multiple checkboxes) */}
      <div className="mb-4">
        <div className="text-sm font-semibold mb-2">Տարածաշրջան</div>
        <div className="space-y-1 max-h-36 overflow-auto pr-1">
          {regionsList.length === 0 && <div className="text-xs text-gray-400">Տվյալներ լռվաց չեն</div>}
          {regionsList.map((r, i) => (
            <label key={i} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.regions?.includes(r)}
                onChange={() => toggleRegion(r)}
                className="h-4 w-4 rounded"
              />
              <span>{r}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price quick chips + manual */}
      <div className="mb-4">
        <div className="text-sm font-semibold mb-2">Գին (դր․)</div>
        <div className="flex gap-2 flex-wrap mb-2">
          {[50000, 90000, 150000, 250000].map(v => (
            <Chip
              key={v}
              active={filters.maxPrice === v}
              onClick={() => setFilters(prev => ({ ...prev, maxPrice: prev.maxPrice === v ? 9999999 : v }))}
            >
              {v.toLocaleString()} ֏
            </Chip>
          ))}
        </div>

        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Мин"
            className="w-24 border px-2 py-1 rounded"
            value={filters.minPrice || ""}
            onChange={e => setFilters(prev => ({ ...prev, minPrice: e.target.value ? Number(e.target.value) : 0 }))}
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            placeholder="Մաքս"
            className="w-24 border px-2 py-1 rounded"
            value={filters.maxPrice === 9999999 ? "" : filters.maxPrice}
            onChange={e => setFilters(prev => ({ ...prev, maxPrice: e.target.value ? Number(e.target.value) : 9999999 }))}
          />
        </div>
      </div>

      {/* People day */}
      <div className="mb-4">
        <div className="text-sm font-semibold mb-2">Մարդկանց քանակ (Օրը)</div>
        <div className="flex items-center gap-2">
          <button onClick={() => incDec("peopleDay", -1)} className="p-2 rounded-full border"><FaMinus /></button>
          <input
            type="number"
            className="w-16 text-center border rounded px-2 py-1"
            value={filters.peopleDay || ""}
            onChange={e => setNumeric("peopleDay", e.target.value)}
            placeholder="—"
          />
          <button onClick={() => incDec("peopleDay", 1)} className="p-2 rounded-full border"><FaPlus /></button>
        </div>
      </div>

      {/* People night */}
      <div className="mb-4">
        <div className="text-sm font-semibold mb-2">Մարդկանց քանակ (Գիշեր)</div>
        <div className="flex items-center gap-2">
          <button onClick={() => incDec("peopleNight", -1)} className="p-2 rounded-full border"><FaMinus /></button>
          <input
            type="number"
            className="w-16 text-center border rounded px-2 py-1"
            value={filters.peopleNight || ""}
            onChange={e => setNumeric("peopleNight", e.target.value)}
            placeholder="—"
          />
          <button onClick={() => incDec("peopleNight", 1)} className="p-2 rounded-full border"><FaPlus /></button>
        </div>
      </div>

      {/* Rooms chips */}
      <div className="mb-4">
        <div className="text-sm font-semibold mb-2">Սենյակներ</div>
        <div className="flex gap-2 flex-wrap">
          {roomOptions.map(r => (
            <Chip key={r} active={filters.rooms === r} onClick={() => toggleChipValue("rooms", r)}>
              {r}
            </Chip>
          ))}
        </div>
      </div>

      {/* Bathrooms chips */}
      <div className="mb-4">
        <div className="text-sm font-semibold mb-2">Լոգարաններ</div>
        <div className="flex gap-2 flex-wrap">
          {toiletOptions.map(t => (
            <Chip key={t} active={filters.bathrooms === t} onClick={() => toggleChipValue("bathrooms", t)}>
              {t}
            </Chip>
          ))}
        </div>
      </div>

      {/* Pool chips */}
      <div className="mb-4">
        <div className="text-sm font-semibold mb-2">Լողավազան</div>
        <div className="flex gap-2 flex-wrap">
          {poolOptions.map(p => (
            <Chip key={p} active={filters.pool === p} onClick={() => toggleChipValue("pool", p)}>
              {p}
            </Chip>
          ))}
          <Chip active={!filters.pool} onClick={() => setFilters(prev => ({ ...prev, pool: null }))}>
            Բոլորը
          </Chip>
        </div>
      </div>

      {/* Sleep (yes/no) */}
      <div className="mb-4">
        <div className="text-sm font-semibold mb-2">Գիշերելու հնարավորություն</div>
        <div className="flex gap-2">
          <Chip active={filters.sleep === true} onClick={() => toggleChipValue("sleep", true)}>Այո</Chip>
          <Chip active={filters.sleep === false} onClick={() => toggleChipValue("sleep", false)}>Ոչ</Chip>
          <Chip active={filters.sleep === null} onClick={() => setFilters(prev => ({ ...prev, sleep: null }))}>Բոլորը</Chip>
        </div>
      </div>

      {/* Stars */}
      <div className="mb-4">
        <div className="text-sm font-semibold mb-2">Աստղեր (min)</div>
        <div className="flex gap-2">
          {[1,2,3,4,5].map(s => (
            <Chip key={s} active={filters.stars === s} onClick={() => setFilters(prev => ({ ...prev, stars: prev.stars === s ? null : s }))}>
              {s}
            </Chip>
          ))}
        </div>
      </div>

      {/* Advantages (checkbox list) */}
      <div className="mb-4">
        <div className="text-sm font-semibold mb-2">Հարմարություններ</div>
        <div className="space-y-1 max-h-36 overflow-auto pr-1">
          {advantagesList.length === 0 && <div className="text-xs text-gray-400">—</div>}
          {advantagesList.map((a, i) => (
            <label key={i} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.advantages?.includes(a)}
                onChange={() => toggleAdvantage(a)}
              />
              {a}
            </label>
          ))}
        </div>
      </div>

      {/* Reset button */}
      <div className="mt-3">
        <button
          onClick={resetFilters}
          className="w-full py-2 rounded-lg text-white"
          style={{ backgroundColor: PRIMARY }}
        >
          Հեռացնել ֆիլտրները
        </button>
      </div>
    </aside>
  );
}
