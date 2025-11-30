import React from "react";

export default function Gallery({ images }) {
    return (
        <div className="grid grid-cols-4 gap-2">

            <div className="col-span-2 h-full">
                <img src={images[0]} className="w-full h-full object-cover rounded-xl" />
            </div>

            <div className="col-span-2 grid grid-cols-2 grid-rows-2 gap-2">
                {images.slice(1, 5).map((img, i) => (
                    <img key={i} src={img} className="object-cover rounded-xl" />
                ))}
            </div>
        </div>
    );
}
