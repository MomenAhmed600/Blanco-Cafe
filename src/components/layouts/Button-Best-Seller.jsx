const ButtonBestSeller = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-12 py-5 border-1 border-black bg-[#e3e0ac] hover:bg-[#d2cc76] hover:text-[#FFF] transition-all rounded-full cursor-pointer w-fit"
    >
      {title}
    </button>
  );
};

export default ButtonBestSeller;
