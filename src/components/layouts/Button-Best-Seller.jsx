const ButtonBestSeller = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-12 py-5 border-1 border-black bg-orange-600 hover:bg-orange-700 hover:text-[#FFF] transition-all rounded-full cursor-pointer w-fit"
    >
      {title}
    </button>
  );
};

export default ButtonBestSeller;
