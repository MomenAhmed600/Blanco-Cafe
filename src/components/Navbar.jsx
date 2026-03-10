import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { AiOutlineClose, AiOutlineMenuUnfold } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import Button from "./layouts/Button";
import { useSearch } from "../context/SearchContext";
import confetti from "canvas-confetti";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { setSearch } = useSearch();
  const navigateToSearch = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleChangeMe = () => setMenu(!menu);
  const closeMenu = () => setMenu(false);

  // فانكشن البحث مع الـ Debouncing
  const handleChange = (e) => {
    const val = e.target.value;
    setInputValue(val);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (val === "") {
        setSearch("");
        if (location.pathname.startsWith("/menu")) {
          navigateToSearch("/menu");
        }
      } else {
        setSearch(val);
        if (!location.pathname.startsWith("/menu")) {
          navigateToSearch("/menu");
        }
      }
    }, 300);
  };

  // فانكشن مسح البحث (Clear Search)
  const clearSearch = () => {
    setInputValue("");
    setSearch("");
    if (location.pathname.startsWith("/menu")) {
      navigateToSearch("/menu");
    }
    inputRef.current?.focus(); // يرجع الـ Focus للـ Input بعد المسح
  };

  const toggleSearch = () => {
    if (!showSearch) {
      setShowSearch(true);
      if (!location.pathname.startsWith("/menu")) {
        navigateToSearch("/menu");
      }
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setShowSearch(false);
      setInputValue("");
      setSearch("");
      if (location.pathname.startsWith("/menu")) {
        navigateToSearch("/menu");
      }
    }
  };

  useEffect(() => {
    if (!location.pathname.startsWith("/menu")) {
      setSearch("");
      setInputValue("");
      setShowSearch(false);
    }
  }, [location.pathname, setSearch]);

  const handleOfferClick = () => {
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#ef4444", "#ffffff", "#ffd700"],
    });
  };

  return (
    <div className="w-full sticky top-0 z-[100] bg-white">
      <div className="flex justify-between items-center p-5 lg:px-32 bg-gradient-to-r from-[#FFF] to-[#d2cc76] shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        {/* 1. Logo */}
        <div className="flex items-center min-w-[150px]">
          <RouterLink to="/" className="flex items-center gap-2">
            <img src="/logo-2.png" alt="logo" className="w-8 h-8" />
            <h1 className="text-xl font-semibold">Blanco</h1>
          </RouterLink>
        </div>

        {/* 2. Desktop Menu */}
        <nav className="hidden lg:flex gap-8 font-medium absolute left-1/2 -translate-x-1/2">
          <RouterLink
            to="/"
            className="hover:text-white text-black transition-colors"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/menu"
            className="hover:text-white text-black transition-colors"
            onClick={handleOfferClick}
          >
            Menu
          </RouterLink>
          <RouterLink
            to="/about"
            className="hover:text-white text-black transition-colors"
          >
            About Us
          </RouterLink>
        </nav>

        {/* 3. Search & Contact Container */}
        <div className="flex items-center gap-4 justify-end min-w-[150px]">
          <div className="relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              value={inputValue}
              onChange={handleChange}
              className={`transition-all duration-300 ease-in-out bg-white/90 border border-gray-300 rounded-full outline-none text-sm
                ${showSearch ? "w-[130px] md:w-[200px] px-4 py-1.5 opacity-100" : "w-0 opacity-0 p-0 border-none"}
              `}
            />

            {showSearch && inputValue !== "" && (
              <button
                onClick={clearSearch}
                className="absolute right-12 text-gray-500 hover:text-red-500 transition-colors"
                title="Clear search"
              >
                <AiOutlineClose size={16} />
              </button>
            )}

            <button
              onClick={toggleSearch}
              className="ml-2 hover:text-white transition-colors p-1"
            >
              {showSearch && inputValue === "" ? (
                <AiOutlineClose size={20} />
              ) : (
                <BsSearch size={20} />
              )}
            </button>
          </div>

          <div className="hidden lg:block">
            <a href="tel:+2015 51589296">
              <Button title="Contact Us" />
            </a>
          </div>

          <div className="lg:hidden flex items-center">
            <button onClick={handleChangeMe}>
              {menu ? (
                <AiOutlineClose size={25} />
              ) : (
                <AiOutlineMenuUnfold size={25} />
              )}
            </button>
          </div>
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
          <RouterLink to="/about" onClick={closeMenu}>
            About Us
          </RouterLink>
          <a
            href="tel:+2015 51589296"
            className="w-full flex items-center justify-center"
            onClick={closeMenu}
          >
            <Button title="Contact Us" />
          </a>
        </div>
      )}
    </div>
  );
};

export default Navbar;
