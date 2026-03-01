import React, { useEffect, useState } from "react";

const MenuCard = React.memo(({ img, title, description, price = [] }) => {
  return (
    <div className="bg-[#f2f2f2] p-5 rounded-[2.5rem] flex flex-col h-full w-full transition-transform duration-300 hover:shadow-lg">
      <div className="w-full h-44 sm:h-48 overflow-hidden rounded-[2rem]">
        <img
          className="w-full h-full object-cover"
          src={img}
          alt={title}
          loading="lazy"
        />
      </div>

      <div className="mt-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 leading-tight flex items-center justify-center">
          {title}
        </h3>

        <p className="text-[14px] text-gray-500 font-medium line-clamp-2 min-h-[40px] flex items-center justify-center">
          {description}
        </p>

        <div className="flex justify-around items-center mt-auto">
          <div className="mt-auto">
            <button className="bg-black text-white px-5 py-1 mt-3 rounded-2xl text-lg font-black transition-all hover:bg-zinc-800 active:scale-95 shadow-lg tracking-wide">
              {price}
            </button>
          </div>
          <div className="">
            <h5>+ 14% TAXES</h5>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MenuCard;
