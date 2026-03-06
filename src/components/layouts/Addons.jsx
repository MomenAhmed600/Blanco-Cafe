import React from "react";
import { useLocation } from "react-router-dom";

const Addons = React.memo(({ items = [] }) => {
  const location = useLocation();

  if (location.pathname !== "/menu/soft-drinks") {
    return null;
  }

  return (
    <div className="bg-[#f2f2f2] p-8 rounded-[2.5rem] flex flex-col items-center justify-between h-full w-full transition-all duration-300 hover:shadow-lg border border-transparent hover:border-gray-200">
      <div className="w-full">
        <h3 className="text-center font-bold font-serif text-xl mb-4 text-gray-800">
          ADD-ONS
        </h3>
        <div className="flex flex-col gap-3 w-full px-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b border-gray-300 border-dashed pb-1"
            >
              <span className="font-medium font-mono text-gray-700">
                {item.name}
              </span>
              <span className="font-bold  text-black">
                {item.price}{" "}
                <span className="text-gray-700 font-mono">EGP</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default Addons;
