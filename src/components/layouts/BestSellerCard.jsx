const BestSellerCard = ({ img, title, description }) => {
  return (
    <div className="bg-stone-100 p-3 rounded-lg shadow-md h-full">
      <img
        className="rounded-xl
    w-full
    h-56
    sm:h-48
    md:h-[220px]
    object-fill"
        src={img}
        alt={title}
        loading="lazy"
      />
      <div className="p-3 flex flex-col flex-grow justify-between">
        <h3 className="text-xl font-semibold mt-3">{title}</h3>
        {description && (
          <p className="text-sm text-gray-500 mt-2">{description}</p>
        )}
      </div>
      {/* 
        <Button title="MORE MENU" />
      <div className="flex flex-row gap-6 items-center justify-center">
      </div> */}
    </div>
  );
};

export default BestSellerCard;
