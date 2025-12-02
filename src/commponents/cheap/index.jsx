import React, { useState, useRef } from "react";
import Card from "./card";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const [activePrice, setActivePrice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const visibleRef = useRef(6);
  const [visibleCount, setVisibleCount] = useState(6);

  const discounts = [
    {
      percent: "-15%",
      title: "2 կամ ավել ամրագրումի օրերի դեպքում",
      desc: "Ստացեք 5-15% զեղչ կախված ամրագրումի 3- hg մինիմում 20 օր:",
      img: "https://amaranoc.am/images/raffle/special-discounts-image.jpg",
    },
    {
      percent: "-10%",
      title: "Անձնական Reel-ի հրապարակման դեպքում",
      desc: "Կիսվել մեր հյուրանոցում ձեր արձակուրդի օրերից՝ նշելով amaranoc.am և ստացեք 10% զեղչ:",
      img: "https://amaranoc.am/images/raffle/special-discounts-image.jpg",
    },
    {
      percent: "-5%",
      title: "2-րդ այցելության դեպքում",
      desc: "Վերադարձի դեպքում ստացեք 5% զեղչ 3-րդ ամրագրումի դեպքում:",
      img: "https://amaranoc.am/images/raffle/special-discounts-image.jpg",
    },
  ];

  const prices = ["50,000 ֏", "60,000 ֏", "70,000 ֏", "80,000 ֏", "90,000 ֏", "100,000 ֏"];

  const houses = [
    {
      id: 1,
      search:"AT001",
      image: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1759149473223--0.33907271602966693image.webp&w=1920&q=75",
      location: "Բջնի",
      price: "40,000֏",
    },
    {
      id: 2,
      search:"AM274",
      image: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2F1757515466460--0.09006536425830425image_optimized.webp&w=1920&q=75",
      location: "Օհանավան",
      price: "85,000֏",
    },
    {
      id: 3,
      search:"AT162",
      image: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2F1759490696314--0.3957154714543032image_optimized.webp&w=1920&q=75",
      location: "Ծաղկաձոր",
      price: "75,000֏",
    },
    {
      id: 4,
      search:"AT169",
      image: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2F1760189660928--0.10159249890828659image_optimized.webp&w=1920&q=75",
      location: "Հորս",
      price: "80,000֏",
    },
    {
      id: 5,
      search:"AM274",
      image: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1757515466510--0.9370355470461651image.webp&w=1920&q=75",
      location: "Օհանավան",
      price: "85,000֏",
    },
    {
      id: 6,
      search:"AM483",
      image: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2F1761737015506--0.12924964220795254image_optimized.webp&w=1920&q=75",
      location: "Գառնի",
      price: "90,000֏",
    },
    {
      id: 7,
      search:"AM063",
      image: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1712326262412--0.25440242535580326image.webp&w=1920&q=75",
      location: "Նոր Հաճն",
      price: "120,000֏",
    },
    {
      id: 8,
      search:"AM133",
      image: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2F1732616461236--0.6541537220629399image_optimized.webp&w=1920&q=75",
      location: "Ձորաղբյուր",
      price: "130,000֏",
    },
    {
      id: 9,
      search:"AM239",
      image: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2Fcompressed_images%2Fcompressed_1756396894356--0.17186088991677884image.webp&w=1920&q=75",
      location: "Արզնի",
      price: "140,000֏",
    },
  ];
  const showMore = () => {
    visibleRef.current = Math.min(visibleRef.current + 3, houses.length);
    setVisibleCount(visibleRef.current);
  };

  const handleOrder = () => {
    if (activePrice === null) {
      alert("Խնդրում ենք ընտրել նվեր քարտի գումարը։");
      return;
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Ուղարկված հայտ\nԱնուն: ${name}\nՀեռախոս: ${phone}\nԳումար: ${prices[activePrice]}`);
    setName("");
    setPhone("");
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-50">

      <h2 className="text-center text-4xl font-bold my-10">ՀԱՏՈՒԿ ԶԵՂՉԵՐ</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-10 gap-8">
        {discounts.map((item, index) => (
          <div key={index} className="relative rounded-xl overflow-hidden shadow-lg h-[300px] group">
            <img src={item.img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition" />
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-5 text-white">
              <div className="text-5xl font-extrabold mb-3 drop-shadow-md">{item.percent}</div>
              <div className="font-semibold text-lg mb-1">{item.title}</div>
              <p className="text-sm opacity-90">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-10 rounded-2xl shadow-xl">
          <h1 className="text-4xl font-bold leading-snug text-gray-900">
            Պատվիրի՛ր <span className="text-orange-500">Նվեր քարտ</span> <br /> Քո կամ ընկերերիդ համար
          </h1>
          <div className="border-b-2 border-orange-300 my-5 w-40"></div>
          <p className="text-gray-600 text-lg leading-relaxed">
            Բաց մի թող մեր բացառիկ զեղչի քարտերը։
          </p>
        </div>

        <div className="rounded-2xl p-10 shadow-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white flex flex-col items-center">
          <img src="https://amaranoc.am/images/white-logo.svg" className="w-48 mb-10 opacity-90" />

          <div className="flex flex-wrap gap-4 justify-center mb-10">
            {prices.map((price, index) => {
              const isActive = activePrice === index;
              return (
                <button
                  key={index}
                  onClick={() => setActivePrice(index)}
                  className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-200 border-2 ${
                    isActive
                      ? "bg-white text-orange-600 border-white shadow-md"
                      : "border-white hover:bg-white hover:text-orange-600"
                  }`}
                >
                  {price}
                </button>
              );
            })}
          </div>

          <button
            onClick={handleOrder}
            className="px-10 py-3 bg-white text-orange-600 font-semibold rounded-full shadow-md hover:bg-gray-100 transition text-lg"
          >
            Պատվիրել
          </button>
        </div>
      </div>

      <h1 className="text-center text-4xl font-bold my-10">Թեժ առաջարկներ</h1>

      <div className="grid grid-cols-1 p-5 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {houses.slice(0, visibleCount).map((item) => (
         <Link to={`/home/${item.search}`} key={item.id}>
          <Card key={item.id} item={item} />
          </Link>
        ))}
      </div>

      {visibleCount < houses.length && (
        <div className="flex mt-10 w-full items-center justify-center">
          <button
            onClick={showMore}
            className="px-10 py-3 bg-orange-600 text-white font-semibold rounded-full shadow-md transition text-lg"
          >
            Ցուցադրել ավելին
          </button>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-96 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 font-bold"
            >
              X
            </button>

            <h2 className="text-2xl font-bold mb-4">Ուղարկեք նվեր քարտի գնման հայտ</h2>
            <p className="mb-4">
              Ընտրած գումար: <span className="font-semibold">{prices[activePrice]}</span>
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Ձեր անունը"
                className="border border-gray-300 p-2 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                type="tel"
                placeholder="Հեռախոսահամար"
                className="border border-gray-300 p-2 rounded"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />

              <button
                type="submit"
                className="px-6 py-2 bg-orange-600 text-white font-semibold rounded-full shadow-md hover:bg-orange-700 transition"
              >
                Ուղարկել
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
