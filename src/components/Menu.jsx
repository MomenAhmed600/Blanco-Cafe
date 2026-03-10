import { useEffect, useState, useRef, useMemo } from "react";
import MenuCard from "./layouts/MenuCard";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useSearch } from "../context/SearchContext";
import Addons from "./layouts/Addons";
import AddonsCombo from "./layouts/AddonsCombo";
import confetti from "canvas-confetti";

const Menu = () => {
  const [allData, setAllData] = useState({});
  const [products, setProducts] = useState([]);
  const { type } = useParams();
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const { search } = useSearch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        setAllData(data);

        if (!type) {
          setProducts(data["Special-Sale"]);
        } else if (
          [
            "turkish-coffee",
            "espresso",
            "hot-drinks",
            "cocktails",
            "soft-drinks",
            "Poutine Fries",
            "Burgers",
          ].includes(type)
        ) {
          setProducts(data[`${type.toUpperCase()}`]);
        } else {
          setProducts([]);
        }
      })
      .catch((err) => console.error("Failed to fetch menu:", err));
  }, [type]);

  useEffect(() => {
    if (!search || Object.keys(allData).length === 0) return;

    for (const key in allData) {
      const found = allData[key].some((product) =>
        product.title.toLowerCase().includes(search.toLowerCase()),
      );

      if (found) {
        const targetType =
          key.toLowerCase() === "special-sale" ? "" : key.toLowerCase();

        if (type !== targetType && !(!type && targetType === "")) {
          navigate(targetType === "" ? "/menu" : `/menu/${targetType}`);
        }
        break;
      }
    }
  }, [search, allData, navigate, type]);

  const addonsItems = [
    { name: "Flavor", price: 25 },
    { name: "Nuts", price: 40 },
    { name: "Packet Tea / Herps", price: 20 },
    { name: "Ice", price: 10 },
    { name: "Milk", price: 15 },
    { name: "Espresso", price: 15 },
    { name: "Ice Cream", price: 35 },
  ];

  const addonsCombo = [{ name: "Fries + Can", price: 70 }];

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const listpro = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();

    if (!searchTerm) {
      if (!type) return allData["Special-Sale"] || [];
      return allData[type.toUpperCase()] || [];
    }

    let results = [];
    Object.keys(allData).forEach((key) => {
      if (key === "BEST-SELLER") return;

      const filtered = allData[key].filter((product) =>
        product.title.toLowerCase().includes(searchTerm),
      );
      results = [...results, ...filtered];
    });

    return Array.from(new Map(results.map((item) => [item.id, item])).values());
  }, [search, allData, type]);

  const handleOfferClick = () => {
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#ef4444", "#ffffff", "#ffd700"],
    });
  };

  return (
    <motion.div
      className="mt-10 mb-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <div className="flex flex-col gap-6 items-center px-4">
        {/* Category Container */}
        <div className="w-full relative max-w-6xl mx-auto md:mb-8 sm:mb-5">
          {/* Left Desktop Arrow */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute -left-12 top-[22px] z-30 p-2 bg-white shadow-lg rounded-full border border-gray-200 hover:scale-110 transition-all"
            style={{ transform: "translateY(-50%)" }}
          >
            <ChevronLeft size={20} />
          </button>

          <div className="overflow-hidden w-full">
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto scroll-smooth w-full no-scrollbar scrollbar-buttons"
              style={{
                paddingBottom: "20px",
                marginBottom: "-20px",
                msOverflowStyle: "none",
                scrollbarWidth: "none",
              }}
            >
              <Link to="/menu" className="shrink-0">
                <button
                  onClick={handleOfferClick}
                  className={`px-6 py-2 rounded-full border transition-all font-serif active:scale-90 ${
                    !type
                      ? "bg-gray-400 text-white shadow-md"
                      : "text-red-600 hover:bg-white hover:scale-110 hover:shadow-lg hover:border-red-500"
                  }`}
                >
                  OFFERS
                </button>
              </Link>
              {[
                "Poutine Fries",
                "Burgers",
                "turkish-coffee",
                "espresso",
                "hot-drinks",
                "cocktails",
                "soft-drinks",
              ].map((cat) => (
                <Link key={cat} to={`/menu/${cat}`} className="shrink-0">
                  <button
                    className={`px-6 py-2 rounded-full border transition-all ${type === cat ? "bg-gray-400 text-white shadow-md" : "bg-white text-black hover:bg-gray-50"}`}
                  >
                    {cat.replace("-", " ").toUpperCase()}
                  </button>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Desktop Arrow */}
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute -right-14 top-[22px] z-30 p-2 bg-white shadow-lg rounded-full border border-gray-200 hover:scale-110 transition-all"
            style={{ transform: "translateY(-50%)" }}
          >
            <ChevronRight size={20} />
          </button>

          {/* Mobile Arrows */}
          <div className="flex md:hidden justify-center gap-10 mt-2">
            <button
              onClick={() => scroll("left")}
              className="p-3 bg-white shadow-md rounded-full"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 bg-white shadow-md rounded-full"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-6xl mx-auto w-full">
          {listpro.map((product) => (
            <div key={product.id} className="flex justify-center h-full">
              <MenuCard
                img={product.image}
                title={product.title}
                description={product.description}
                price={product.price}
              />
            </div>
          ))}
          <Addons items={addonsItems} />
          <AddonsCombo items={addonsCombo} />
        </div>
      </div>
    </motion.div>
  );
};

export default Menu;
