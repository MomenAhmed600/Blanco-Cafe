import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenuUnfold } from "react-icons/ai";
import { BsSearch } from "react-icons/bs"; // ضفنا دي
import Button from "./layouts/Button";
import { useSearch } from "../context/SearchContext";
const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { setSearch } = useSearch();

  const handleChangeMe = () => setMenu(!menu);
  const closeMenu = () => setMenu(false);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(inputValue);
    handleSearchClose();
  };

  const handleSearchClose = () => setShowSearch(false);
  const handleSearchShow = () => setShowSearch(true);

  return (
    <>
      {" "}
      {/* بداية الـ Fragment عشان نجمع الـ Navbar والـ Modal */}
      <div className="w-full z-50 relative">
        {/* Navbar container */}
        <div className="flex justify-between items-center p-5 lg:px-32 bg-gradient-to-r from-[#FFF] to-[#d2cc76] shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          {/* Logo */}
          <RouterLink to="/">
            <div className="flex items-center gap-2">
              <img src="/logo-2.png" alt="logo" className="w-8 h-8" />
              <h1 className="text-xl font-semibold">Blanco </h1>
            </div>
          </RouterLink>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex gap-8 font-medium">
            <RouterLink to="/" className="hover:text-white text-black">
              Home
            </RouterLink>
            <RouterLink to="/menu" className="hover:text-white text-black">
              Menu
            </RouterLink>
            <RouterLink to="/products" className="hover:text-white text-black">
              Products
            </RouterLink>
            <RouterLink to="/about" className="hover:text-white text-black">
              About Us
            </RouterLink>
          </nav>

          {/* Desktop Contact */}
          <div className="hidden lg:flex gap-5">
            <button
              onClick={handleSearchShow}
              className="hover:text-white cursor-pointer"
            >
              <BsSearch size={20} />
            </button>
            <Button title="Contact Us" />
          </div>

          {/* Mobile toggle */}
          <div className="lg:hidden gap-5 flex items-center">
            <button
              onClick={handleSearchShow}
              className="hover:text-white cursor-pointer"
            >
              <BsSearch size={20} />
            </button>
            <button onClick={handleChangeMe}>
              {menu ? (
                <AiOutlineClose size={25} />
              ) : (
                <AiOutlineMenuUnfold size={25} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menu && (
          <div className="lg:hidden flex flex-col absolute top-full left-0 w-full bg-black text-white gap-8 py-8 text-2xl text-center z-50">
            <RouterLink to="/" onClick={closeMenu}>
              Home
            </RouterLink>
            <RouterLink to="/menu" onClick={closeMenu}>
              Menu
            </RouterLink>
            <RouterLink to="/products" onClick={closeMenu}>
              Products
            </RouterLink>
            <RouterLink to="/about" onClick={closeMenu}>
              About Us
            </RouterLink>

            {/* تصليح زرار البحث في الموبايل */}
            <div
              className="self-center cursor-pointer"
              onClick={() => {
                handleSearchShow();
                closeMenu();
              }}
            >
              <BsSearch size={25} />
            </div>
          </div>
        )}
      </div>
      {/* Modal - Tailwind Version */}
      {showSearch && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleSearchClose}
          ></div>
          <div className="relative w-full max-w-md mx-auto z-[70] p-4">
            <div className="bg-white rounded-lg shadow-lg">
              <div className="flex justify-between items-center p-5 border-b">
                <h3 className="text-xl font-semibold">Search Item</h3>
                <button onClick={handleSearchClose} className="text-2xl">
                  &times;
                </button>
              </div>
              <div className="p-6 bg-gray-100">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Search Item"
                    value={inputValue}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-black"
                  />
                  <div className="flex justify-end gap-2 mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setInputValue("");
                        setSearch("");
                      }}
                      className="px-4 py-2 bg-[#d2cc76] rounded-md text-black"
                    >
                      Clear
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-black text-white rounded-md"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
