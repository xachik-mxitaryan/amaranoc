import React from 'react'
import { FaPhone, FaEnvelope, FaFacebook, FaGlobe, FaMapMarkerAlt } from "react-icons/fa"

export default function index() {
  return (
    <>
      <footer>
        <div className="mt-50 flex items-center justify-center w-full h-auto py-8 bg-[url(https://amaranoc.am/images/footer/home-add-application.png)] bg-cover bg-center">
          <div className="w-[65%] lg:w-[80%] md:w-[90%] h-auto opacity-80 bg-[#283333] rounded-3xl flex flex-col items-center justify-center shadow-lg px-4 py-10">

            <div className="flex items-center justify-center w-full mb-4">
              <div className="hidden md:block w-1/4 h-[1px] bg-white"></div>
              <h2 className="mx-6 text-3xl md:text-2xl sm:text-xl font-bold text-white tracking-widest text-center">
                ՏԵՂԱԴՐԵԼ ՀԱՅՏԱՐԱՐՈՒԹՅՈՒՆ
              </h2>
              <div className="hidden md:block w-1/4 h-[1px] bg-white"></div>
            </div>

            <p className="text-gray-200 text-sm md:text-xs mb-8 text-center">
              Մուտքագրեք ձեր տվյալները որպեսզի կապվենք Ձեզ հետ
            </p>

            <div className="grid grid-cols-4 items-center lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 w-full justify-center">

              <input type="text" placeholder="Անուն Ազգանուն"
                className="px-4 py-3 rounded-md bg-transparent border border-gray-400 text-white outline-none w-full" />

              <input type="text" placeholder="Հեռախոսահամար"
                className="px-4 py-3 rounded-md bg-transparent border border-gray-400 text-white outline-none w-full" />

              <input type="text" placeholder="Ք․ քաղաք"
                className="px-4 py-3 rounded-md bg-transparent border border-gray-400 text-white outline-none w-full" />

              <button className="px-8 py-3 bg-[#ff8a00] text-white font-semibold rounded-full shadow-md hover:bg-[#e67a00] transition text-lg w-full sm:w-auto">
                Ուղարկել
              </button>

            </div>

          </div>
        </div>
        <div className="bg-[#101623] w-full pt-10 pb-0 flex flex-col items-center">

          <h2 className="text-white text-3xl font-bold tracking-widest mb-10 text-center">
            ԿՈՆՏԱԿՏՆԵՐ
          </h2>

          <div className="flex flex-wrap justify-center gap-8 text-white text-sm mb-10">

            <a href="tel:+37441611611" className="flex items-center gap-2 transition">
              <FaPhone />
              <span>041-611-611 / 044-611-611</span>
            </a>

            <a href="mailto:amaranoc.info@gmail.com" className="flex items-center gap-2 transition">
              <FaEnvelope />
              <span>AMARANOC.INFO@GMAIL.COM</span>
            </a>

            <a href="https://amaranoc.am" target="_blank" className="flex items-center gap-2 transition">
              <FaGlobe />
              <span>AMARANOC.AM</span>
            </a>

            <a href="https://facebook.com/amaranoc" target="_blank" className="flex items-center gap-2 transition">
              <FaFacebook />
              <span>AMARANOC.AM</span>
            </a>

            <a className="flex items-center gap-2">
              <FaMapMarkerAlt />
              <span>Եր. հյուսիսային 5</span>
            </a>

          </div>

          <div className="flex gap-6 text-gray-400 text-xs mb-10 flex-wrap justify-center">
            <span>Ամարանոց ՍՊԸ</span>
            <span>Amaranoc LLC</span>
            <span>Ամարանոց ООО</span>
          </div>

          <img
            className="w-full mt-4 pointer-events-none select-none"
            src="https://amaranoc.am/_next/image?url=%2Fimages%2Ffooter%2Ffooter-background.png&w=1920&q=75"
            alt=""
          />
        </div>

      </footer>
    </>
  )
}
