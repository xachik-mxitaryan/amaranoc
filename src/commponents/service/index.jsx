import React, { useState } from "react";

const services = [
  { id: "maintenance", title: "Սպասարկում", icon: "https://api.amaranoc.am/service.svg" },
  { id: "shou", title: "Շոու", icon: "https://api.amaranoc.am/services1.svg" },
  { id: "party", title: "Միջոցառումներ", icon: "https://api.amaranoc.am/services2.svg" },
  { id: "texnik", title: "Տեխնիկա", icon: "https://api.amaranoc.am/services3.svg" },
  { id: "mebel", title: "Օրավարձով գույք", icon: "https://api.amaranoc.am/services4.svg" },
  { id: "photo", title: "Նկարահանում", icon: "https://api.amaranoc.am/services5.svg" },
  { id: "transport", title: "Ուղևորափոխադրում", icon: "https://api.amaranoc.am/services6.svg" },
];

const db = {
  maintenance: [
    {
      id: 1,
      img: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2F1724331775249--0.16594454212797016image.webp&w=1920&q=75",
      title: "Մատուցող",
      price: "20,000 ֏",
      body: "Յուրաքանյչուր մատուցող կարող է սպասարկել 15-20 անձի։ Ծառայության արժեքը կախված է միջոցառման անցկացման վայրից։"
    },
    {
      id: 2,
      img: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2F1724330468263--0.5829426973721912image.webp&w=1920&q=75",
      title: "Բարմեն",
      price: "25,000 ֏",
      body: "Մեր պրոֆեսիոնալ բարմենները տիրապետում են տարբեր տեսակի խմիչքների պատրաստման հմտություններին։"
    },
    {
      id: 3,
      img: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2F1724331582281--0.8016246618454268image.webp&w=1920&q=75",
      title: "Խոհարար",
      price: "35,000 ֏",
      body: "Արժեքը կախված է միջոցառման անձանց քանակից և ուտեստների մենյուից։ Ունենալով հարուստ փորձ և տաղանդ։"
    }
  ],
  shou: [
    {
      id: 4,
      img: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2F1724333364490--0.6874775885987816image.webp&w=1920&q=75",
      title: "Դի-Ջեյ",
      price: "50,000 ֏",
      body: "Դիջեյներն Մեր կազմակերպած միջոցառումների աստղերն են՝ ովքեր ստեղծում են յուրահատուկ մթնոլորտ։"
    },
    {
      id: 5,
      img: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2F1724334734516--0.3032056818160267image.webp&w=1920&q=75",
      title: "Երգիչ",
      price: "150,000 ֏",
      body: "Amaranoc.am ի երգիչները, իրենց զարմանալի ձայնով և տաղանդով, կստեղծեն յուրահատուկ մթնոլորտ։"
    },
    {
      id: 6,
      img: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2F1724336474729--0.7810543034069704image.webp&w=1920&q=75",
      title: "Կրակներով շոու",
      price: "50,000 ֏",
      body: "Կրակներով շոուն կստեղծի վառ և հիասքանչ ժամանց, որոնք կտպավորվեն մշտեպես Ձեր հիշողության մեջ։"
    }
  ],
  party: [
    {
      id: 7,
      img: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2F1724354544378--0.6598089632874184image.webp&w=1920&q=75",
      title: "Նշանադրության կազմակերպում",
      price: "500,000 ֏",
      body: "Նշանադրության արարողությունը առանձնահատուկ պահ է զույգի կյանքում: Մեր ընկերությունը կազմակերպում։"
    },
    {
      id: 8,
      img: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2F1724361248407--0.36711332876830927image.webp&w=1920&q=75",
      title: "Ծննդյան առիթների կազմակերպում",
      price: "150,000 ֏",
      body: "«Amaranoc.am»-ը ձեր վստահելի գործընկերն է ծննդյան տոների կազմակերպման գործում: Մենք մասնագիտացած ենք։"
    },
    {
      id: 9,
      img: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2F1724359541230--0.027714150656094505image.webp&w=1920&q=75",
      title: "Հարսանյաց սենյակի ձևավորում",
      price: "80,000 ֏",
      body: "Հարսանյաց սենյակի ձևավորման գործում Ձեզ կօգնի Մեր դիզայներների և ոճաբանների թիմը՝ ովքեր հաշվի առնելով։"
    }
  ],
  texnik: [
    {
      id: 10,
      img: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2F1725722472736--0.09950637526125772image.webp&w=1920&q=75",
      title: "Ծանր ծուխ",
      price: "30,000 ֏",
      body: "Լավագույն ծանր ծուխը, որը ձեր միջոցառումն կդարձնի էլ ավելի գողեցիկ և հիշարժան։ Մեր սարքավորումները կարողանում։"
    },
    {
      id: 11,
      img: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2F1725723065500--0.9235019901431423image.webp&w=1920&q=75",
      title: "Հրավառության ծառայություն",
      price: "30,000 ֏",
      body: "Հրավառության ծառայությունը առաջարկում է փայլուն և անպայման հիշարժան հրավառություն։"
    },
    {
      id: 12,
      img: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2F1725723989251--0.9080294603522698image.webp&w=1920&q=75",
      title: "Սառը հրավառություն",
      price: "30,000 ֏",
      body: "Սառը հրավառության ծառայությունը առաջարկում է հիանալի, անվտանգ և արտասովոր միջոցառման լուծում։"
    }
  ],
  mebel: [
    {
      id: 13,
      img: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2F1726042244507--0.7876617191172142image.webp&w=1920&q=75",
      title: "Սպասք",
      price: "100 ֏",
      body: "Ձեր միջոցառումները դարձնելու համար ավելի հարմարավետ և ոճային, առաջարկում ենք օրավարձով սպասքի ծառայություններ։"
    },
    {
      id: 14,
      img: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2F1726042865918--0.08492032329777777image.webp&w=1920&q=75",
      title: "Սեղան և աթոռներ",
      price: "5,000 ֏",
      body: "Մեր օրավարձով կահույքի ծառայությունը հնարավորություն է տալիս վարձակալել բարձր որակի սեղաններ և աթոռներ՝ համաձայն ։"
    },
    {
      id: 15,
      img: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2F1726045237838--0.5117936535743877image.webp&w=1920&q=75",
      title: "Տենտ",
      price: "20,000 ֏",
      body: "Մեր տենտերը համադրվում են ցանկացած միջոցառմանը և հիանալի լուծում են պաշտպանվելու համար ցանկացած։"
    }
  ],
  photo: [
    {
      id: 16,
      img: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2F1726045632835--0.6404655108118316image.webp&w=1920&q=75",
      title: "Ֆոտո նկարահանում",
      price: "20,000 ֏",
      body: "Մենք ուրախ ենք առաջարկել պրոֆեսիոնալ ֆոտո նկարահանման ծառայություն։ Մեր նպատակն է, որ ձեր միջոցառումը։"
    },
    {
      id: 17,
      img: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2F1726045956349--0.40971954076083006image.webp&w=1920&q=75",
      title: "Վիդեո նկարահանում",
      price: "35,000 ֏",
      body: "Ձեր տեսանյութերը կստանան բարձր որակ և պրոֆեսիոնալ շունչ մեր վիդեո նկարահանման ծառայության միջոցով։"
    },
    {
      id: 18,
      img: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2F1726046177472--0.6775833503340363image.webp&w=1920&q=75",
      title: "Դրոնով նկարահանում",
      price: "25,000 ֏",
      body: "Ապահովեք ձեր նախագծերին անկրկնելի տեսողական որակ մեր պրոֆեսիոնալ դրոններով։"
    }
  ],
  transport: [
    {
      id: 19,
      img: "https://amaranoc.am/_next/image?url=https%3A%2F%2Fapi.amaranoc.am%2F1726046665759--0.6176706265260881image.webp&w=1920&q=75",
      title: "Ուղևորափոխադրում",
      price: "20,000 ֏",
      body: "Մենք տրամադրում ենք բարձրակարգ փոխադրամիջոցներ՝ ապահովելով Ձեր ճանապարհորդության հարմարավետություն։"
    }
  ]
}

export default function ServicesBlock() {
  const [active, setActive] = useState("maintenance");

  const scrollLeft = () => {
    document.getElementById("serviceScroll").scrollBy({
      left: -200,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    document.getElementById("serviceScroll").scrollBy({
      left: 200,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full py-10">
      <div className="w-full py-8 flex justify-center gap-20  items-center">
        <button
          onClick={scrollLeft}
          className="hover:scale-110 transition border rounded-full p-1 "
        >
          <img
            src="https://amaranoc.am/images/arrow-left.svg"
            alt="Left Arrow"
            className="w-6"
          />
        </button>




        <div
          id="serviceScroll"
          className="flex gap-24 w-[60%]  overflow-x-auto scrollbar-hide py-2"
        >
          {services.map((item) => (
            <div
              key={item.id}
              onClick={() => setActive(item.id)}
              className="flex cursor-pointer flex-col items-center text-center"
            >
              <span
                className={`${active === item.id ? "text-orange-500" : "text-gray-600"
                  }`}
              >
                <img className="w-[50px] h-[50px]" src={item.icon} alt="" />
              </span>

              <p
                className={`mt-2 text-sm ${active === item.id ? "text-orange-500 font-semibold" : ""
                  }`}
              >
                {item.title}
              </p>

              {active === item.id && (
                <div className="mt-1 w-10 h-[2px] bg-orange-500 rounded-full"></div>
              )}
            </div>
          ))}

        </div>
        <button
          onClick={scrollRight}
          className="hover:scale-110 transition border rounded-full p-1"
        >
          <img
            src="https://amaranoc.am/images/arrow-left.svg"
            alt="Right Arrow"
            className="w-6 rotate-180"
          />
        </button>
      </div>

      <div className="max-w-[1300px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-5">
        {db[active]?.map((item) => (
          <div
            key={item.id}
            className="rounded-xl bg-white shadow-xl overflow-hidden"
          >
            <img className="w-full h-56 object-cover" src={item.img} alt="" />
            <div className="p-6">
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{item.body}</p>

              <div className="flex items-center justify-between">
                <span className="font-bold text-lg">{item.price}</span>
                <button className="px-6 py-2 bg-orange-500 text-white text-sm rounded-full hover:bg-orange-600 transition">
                  Ամրագրել
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
