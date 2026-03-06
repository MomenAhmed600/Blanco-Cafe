import { useEffect, useState, useRef, useMemo } from "react"; // زودنا useMemo
import MenuCard from "./layouts/MenuCard";
import { Link, useParams, useNavigate } from "react-router-dom"; // زودنا useNavigate
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useSearch } from "../context/SearchContext";
import Addons from "./layouts/Addons";
import AddonsCombo from "./layouts/AddonsCombo";

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
    const scrollAmount = 200;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // const listpro = products.filter((product) =>
  //   product.title.toLowerCase().includes(search.toLowerCase()),
  // );

  const listpro = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();

    if (!searchTerm) {
      if (!type) return allData["Special-Sale"] || [];
      return allData[type.toUpperCase()] || [];
    }

    let results = [];
    Object.keys(allData).forEach((key) => {
      const filtered = allData[key].filter((product) =>
        product.title.toLowerCase().includes(searchTerm),
      );
      results = [...results, ...filtered];
    });

    return Array.from(new Map(results.map((item) => [item.id, item])).values());
  }, [search, allData, type]);

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
      <div className="flex flex-wrap gap-6 justify-center px-4">
        <div className="w-full flex flex-col justify-center md:mb-8 sm:mb-5 px-4 relative max-w-6xl">
          {/* Category Tabs */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 scroll-smooth scrollbar-buttons"
          >
            <Link to="/menu" className="shrink-0">
              <button
                className={`px-6 py-2 rounded-full border transition-all font-serif ${!type ? "bg-gray-400 text-white shadow-md" : "bg-white text-red-600 hover:bg-gray-50"}`}
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

          {/* Arrows */}
          <div className="flex lg:hidden justify-center gap-4 sm:gap-10 mt-2">
            <button
              onClick={() => scroll("left")}
              className="p-3 bg-[#e9e6bb] shadow-md rounded-full"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 bg-[#e9e6bb] shadow-md rounded-full"
            >
              <ChevronRight />
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
