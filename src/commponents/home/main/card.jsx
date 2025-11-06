import React from 'react'
import { FaMapMarkerAlt, FaUsers, FaStar, FaSwimmingPool } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

export default function card({h, idx}) {
    return (
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
    )
}
