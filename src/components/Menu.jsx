import { useEffect, useState, useRef } from "react";
import MenuCard from "./layouts/MenuCard";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useSearch } from "../context/SearchContext";
const Menu = () => {
  const [products, setProducts] = useState([]);
  const { type } = useParams();
  const scrollRef = useRef(null);
  const { search } = useSearch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        if (!type) {
          setProducts(data["Special-Sale"]);
        } else if (
          ["turkish-coffee", "espresso", "hot-drinks"].includes(type)
        ) {
          setProducts(data[`${type.toUpperCase()}`]);
        } else {
          setProducts([]);
        }
      })
      .catch((err) => console.error("Failed to fetch menu:", err));
  }, [type]);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 200;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const listpro = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <motion.div
      className="mt-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <div className="flex flex-wrap gap-6 justify-center px-4">
        {/* Scroll container */}
        <div className="w-full flex flex-col justify-center md:mb-8 sm:mb-5 px-4 relative max-w-6xl">
          {/* Scrollable container */}
          {/* <div
            ref={scrollRef}
            className="
                flex gap-2 sm:gap-4
                flex-nowrap
                overflow-x-auto
                scroll-smooth
                bg-gradient-to-r from-[#FFF] to-[#d2cc76]
                backdrop-blur-md
                p-2 sm:p-4
                rounded-2xl
                shadow-lg
                        "
          >
            <Link to="/menu" className="shrink-0">
              <button className="px-5 py-2 sm:px-6 rounded-full bg-stone-800 text-[#d2cc76] hover:text-white text-sm sm:text-base font-medium hover:bg-gray-800 transition whitespace-nowrap">
                New-<span className="text-red-600">SALE</span>
              </button>
            </Link>
            <Link to="/menu/turkish-coffee" className="shrink-0">
              <button className="px-5 py-2 sm:px-6 rounded-full bg-stone-800 text-white text-sm sm:text-base font-medium hover:bg-gray-800 transition whitespace-nowrap">
                TURKISH-COFFEE
              </button>
            </Link>
            <Link to="/menu/espresso" className="shrink-0">
              <button className="px-5 py-2 sm:px-6 rounded-full bg-black text-white text-sm sm:text-base font-medium hover:bg-gray-800 transition whitespace-nowrap">
                ESPRESSO
              </button>
            </Link>
            <Link to="/menu/hot-drinks" className="shrink-0">
              <button className="px-5 py-2 sm:px-6 rounded-full bg-black text-white text-sm sm:text-base font-medium hover:bg-gray-800 transition whitespace-nowrap">
                HOT-DRINKS
              </button>
            </Link>
            <Link to="/menu/macchiato" className="shrink-0">
              <button className="px-5 py-2 sm:px-6 rounded-full bg-black text-white text-sm sm:text-base font-medium hover:bg-gray-800 transition whitespace-nowrap">
                MACCHIATO
              </button>
            </Link>
            <Link to="/menu/café-latte" className="shrink-0">
              <button className="px-5 py-2 sm:px-6 rounded-full bg-black text-white text-sm sm:text-base font-medium hover:bg-gray-800 transition whitespace-nowrap">
                CAFÉ-LATTE
              </button>
            </Link>
            <Link to="/menu/cappuccino" className="shrink-0">
              <button className="px-5 py-2 sm:px-6 rounded-full bg-black text-white text-sm sm:text-base font-medium hover:bg-gray-800 transition whitespace-nowrap">
                CAPPUCCINO
              </button>
            </Link>
            <Link to="/menu/flat-white" className="shrink-0">
              <button className="px-5 py-2 sm:px-6 rounded-full bg-black text-white text-sm sm:text-base font-medium hover:bg-gray-800 transition whitespace-nowrap">
                FLAT-WHITE
              </button>
            </Link>
            <Link to="/menu/cortado" className="shrink-0">
              <button className="px-5 py-2 sm:px-6 rounded-full bg-black text-white text-sm sm:text-base font-medium hover:bg-gray-800 transition whitespace-nowrap">
                CORTADO
              </button>
            </Link>
            <Link to="/menu/soft-drinks" className="shrink-0">
              <button className="px-5 py-2 sm:px-6 rounded-full bg-black text-white text-sm sm:text-base font-medium hover:bg-gray-800 transition whitespace-nowrap">
                SOFT-DRINKS
              </button>
            </Link>
            {Array.from({ length: 8 }).map((_, i) => (
              <Link key={i} to="/menu/café-latte" className="shrink-0">
                <button className="px-5 py-2 sm:px-6 rounded-full bg-black text-white text-sm sm:text-base font-medium hover:bg-gray-800 transition whitespace-nowrap">
                  CAFÉ-LATTE
                </button>
              </Link>
            ))}
          </div> */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 scroll-smooth no-scrollbar"
          >
            <Link to="/menu" className="shrink-0">
              <button
                className={`px-6 py-2 rounded-full border ${!type ? "bg-black text-white" : "bg-white text-black"}`}
              >
                NEW <span className="text-red-600">SALE</span>
              </button>
            </Link>
            {["turkish-coffee", "espresso", "hot-drinks", "soft-drinks"].map(
              (cat) => (
                <Link key={cat} to={`/menu/${cat}`} className="shrink-0">
                  <button
                    className={`px-6 py-2 rounded-full border ${type === cat ? "bg-black text-white" : "bg-white text-black"}`}
                  >
                    {cat.replace("-", " ").toUpperCase()}
                  </button>
                </Link>
              ),
            )}
          </div>

          {/*Mobile & Tablet Arrows */}
          <div className="flex lg:hidden justify-center gap-4 sm:gap-10 mt-2">
            <button
              onClick={() => scroll("left")}
              className="p-3 sm:p-5 bg-[#d2cc76] shadow-md rounded-full hover:bg-gray-100"
            >
              <ChevronLeft />
            </button>
            <span className="text-sm font-medium text-gray-600 self-center">
              -
            </span>
            <button
              onClick={() => scroll("right")}
              className="p-3 sm:p-5 bg-[#d2cc76] shadow-md rounded-full hover:bg-gray-100"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        <div
          className="
    grid
    grid-cols-1      
    sm:grid-cols-2    
    lg:grid-cols-3    
    gap-8            
    px-4
    max-w-6xl 
    mx-auto 
    w-full
  "
        >
          {listpro.map((product) => {
            return (
              <div key={product.id} className="flex justify-center h-full">
                <MenuCard
                  img={product.image}
                  title={product.title}
                  description={product.description}
                  price={product.price}
                />
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Menu;
