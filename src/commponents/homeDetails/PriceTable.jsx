import React, { useState, useMemo } from "react";

export default function PriceTable({ price, sleepPrice }) {
    const daysOfWeek = ["երկ", "երք", "չրք", "հնգ", "ուրբ", "շբթ", "կիր"];
    const months = [
        "Հունվար", "Փետրվար", "Մարտ", "Ապրիլ",
        "Մայիս", "Հունիս", "Հուլիս", "Օգոստոս",
        "Սեպտեմբեր", "Հոկտեմբեր", "Նոյեմբեր", "Դեկտեմբեր"
    ];

    const [open, setOpen] = useState(false);

    const [currentDate, setCurrentDate] = useState(new Date());

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysArray = useMemo(() => {
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        const arr = [];
        const offset = (firstDay + 6) % 7;

        for (let i = 0; i < offset; i++) arr.push(null);
        for (let i = 1; i <= lastDate; i++) arr.push(i);

        return arr;
    }, [year, month]);

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    return (
        <div className="bg-white p-5 rounded-xl w-full shadow">
            <h3 className="text-xl font-bold mb-3">Գնացուցակ</h3>

            <div className="text-lg">
                <p className="mb-2">Օրական՝ <b>{price.toLocaleString()} ֏</b></p>
                <p>Գիշերվա գին՝ <b>{sleepPrice.toLocaleString()} ֏</b></p>
            </div>
            <div className="bg-white w-full rounded-2xl shadow-xl">

                <div className="flex items-center justify-between px-5 py-4 border-b">
                    <h2 className="text-[18px] font-semibold">Նշեք Ձեր ցանկալի օրերը</h2>
                </div>

                <div className="bg-orange-500 text-white flex items-center justify-between px-6 py-3 text-[18px] font-semibold">
                    <button onClick={prevMonth} className="text-[22px]">←</button>
                    {months[month]} {year}
                    <button onClick={nextMonth} className="text-[22px]">→</button>
                </div>

                <div className="grid grid-cols-7 text-center py-3 text-gray-600 text-[15px] font-medium">
                    {daysOfWeek.map((d, i) => (
                        <div key={i}>{d}</div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-3 px-5 pb-5 text-[14px] text-gray-500">
                    {daysArray.map((day, i) => (
                        <div
                            key={i}
                            className={`flex items-center justify-center h-10 rounded-full
                                        ${day ? "cursor-pointer hover:bg-orange-200 hover:text-black" : ""}
                                    `}
                        >
                            {day || ""}
                        </div>
                    ))}
                </div>

                <div className="flex justify-between px-6 pb-4 mt-2">
                    <button className="bg-gray-200 text-gray-700 py-2 px-5 rounded-xl hover:bg-gray-300">
                        Հաստատել
                    </button>
                </div>
            </div>
        </div>
    );
}
