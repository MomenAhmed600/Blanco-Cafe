const BestSellerProducts = ({ img, title, description }) => {
  return (
    <div className="bg-stone-100 p-3 rounded-lg shadow-md h-full">
      {/* Image */}
      <img
        className="rounded-xl w-full h-[220px] object-cover"
        src={img}
        alt={title}
        loading="lazy"
      />

      {/* Content */}
      <div className="p-3 flex flex-col flex-grow">
        <h4 className="text-xl font-semibold mt-3 min-h-[56px]">{title}</h4>

        <p className="text-sm text-gray-500 mt-2 line-clamp-4">{description}</p>
      </div>
    </div>
  );
};

export default BestSellerProducts;
