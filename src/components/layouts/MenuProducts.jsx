import React from "react";

const MenuProducts = React.memo(({ img, title, description, price = [] }) => {
  return (
    <div className="bg-stone-100 p-3 rounded-lg shadow-md h-full">
      <img
        className="rounded-xl w-full h-48 object-cover"
        src={img}
        alt={title}
        loading="lazy"
      />

      <div className="p-2 mt-5 flex flex-col h-full">
        <h3 className="text-xl font-semibold">{title}</h3>

        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}

        <div className="text-lg font-bold text-brown-800 mt-2">{price}</div>
      </div>
    </div>
  );
});

export default MenuProducts;
