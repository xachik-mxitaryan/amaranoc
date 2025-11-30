import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dbRealtime, ref, get } from "../firebase";
import Gallery from "../commponents/homeDetails/Gallery";
import Advantages from "../commponents/homeDetails/Advantages";
import PriceTable from "../commponents/homeDetails/PriceTable";

export default function HomeDetailsPage() {
    const { id } = useParams();
    const [home, setHome] = useState(null);

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
                    const found = items.find(h => h.id === id);
                    setHome(found);
                }
            } catch (err) {
                console.error("Firebase fetch error:", err);
            }
        };
        fetchData();
    }, [id]);

    if (!home) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="max-w-[1400px] flex flex-col gap-70 mx-auto p-4 mt-6">
            <Gallery images={home.images} />
            <div className="grid grid-cols-12 gap-4 mt-6">
                <div className="col-span-4">
                    <Advantages advantages={home.advantages} />
                </div>
                <div className="col-span-8">
                    <PriceTable price={home.price} sleepPrice={home.sleepPrice} />
                </div>
            </div>

        </div>
    );
}
