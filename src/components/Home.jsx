import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "../assets/img/home.png";
import BestSellerCard from "./layouts/BestSellerCard";
import BestSellerProducts from "./layouts/BestSellerProducts";
import ButtonBestSeller from "./layouts/Button-Best-Seller";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  const navigate = useNavigate();

  const navigateMenu = () => {
    navigate("/menu");
  };

  const navigateProducts = () => {
    navigate("/products");
  };

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data["BEST-SELLER"]);

        console.log(data["BEST-SELLER"]);
        setBestProducts(data["BEST-Products"]);
        console.log(data["BEST-Products"]);
      })
      .catch((err) => {
        console.error("Failed to fetch menu:", err);
      });
  }, []);
  return (
    <>
      <div className=" min-h-screen flex flex-col justify-center lg:flex-row lg:justify-center items-center lg:px-32 px-5 gap-10 bg-gradient-to-r from-[#FFF] to-[#d2cc76]">
        <motion.div
          className=" w-full lg:w-2/4 space-y-4  lg:mt-0 "
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <h1 className="font-semibold text-3xl md:text-5xl text-center lg:text-start leading-tight">
            start your day with a steaming cup of coffee
          </h1>
          <p className=" text-center lg:text-start md:text-2xl leading-tight">
            Boost your productivity and build your mood with a glass of coffee
            in the morning
          </p>
        </motion.div>

        <div className="relative animate-slowspin hover:animate-none transition-all">
          <img src={img} alt="img" />
        </div>
      </div>
      {/* Best Sellers */}
      <motion.div
        className=" py-16  justify-center lg:flex-row lg:justify-center items-center lg:px-32 px-5 gap-10 bg-white mt-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, x: 50 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <h1 className="flex content-center justify-center font-semibold text-5xl">
          NEW-<span className="text-red-600">SALE</span>
        </h1>

        <p className="flex content-center justify-center mt-5 font-semibold text-lg">
          Your Favorite Pairings, Now at Exclusive Prices for a Limited Time.
        </p>

        <motion.div
          className="mt-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <div
            className="grid
            grid-cols-1
            sm:grid-cols-3
            gap-6
            px-4"
          >
            {products.map((product) => {
              return (
                <BestSellerCard
                  key={product.id}
                  img={product.image}
                  title={product.title}
                  description={product.description}
                />
              );
            })}
          </div>
          <div className="flex flex-row gap-6 items-center justify-center mt-10 mb-10">
            <ButtonBestSeller title="MORE MENU" onClick={navigateMenu} />
          </div>
        </motion.div>
      </motion.div>
      {/* front image */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <img
          src="/img/front-photos.png"
          alt="front-img"
          loading="lazy"
          className="w-full md:h-96  object-cover"
        />
      </motion.div>

      {/* Our Products */}
      <motion.div
        className="py-5 lg:py-16 justify-center lg:flex-row lg:justify-center items-center lg:px-32 px-5 gap-10 bg-white mt-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, x: 50 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <h1 className="flex content-center justify-center font-semibold text-5xl">
          Our Products
        </h1>

        <p className="flex content-center justify-center mt-5 font-semibold text-lg">
          Discover Our Premium Coffee Baskets, Carefully Curated for True Coffee
          Lovers.
        </p>

        <motion.div
          className="mt-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <div
            className="grid
            grid-cols-1
            sm:grid-cols-3
            gap-6
            px-4"
          >
            {bestProducts.map((productsel) => {
              return (
                <BestSellerProducts
                  key={productsel.id}
                  img={productsel.image}
                  title={productsel.title}
                  description={productsel.description}
                />
              );
            })}
          </div>
          <div className="flex flex-row gap-6 items-center justify-center mt-10">
            <ButtonBestSeller title="MORE MENU" onClick={navigateProducts} />
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Home;
