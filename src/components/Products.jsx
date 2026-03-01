import { Suspense, useEffect, useState } from "react";
import MenuProducts from "./layouts/MenuProducts";
import { motion } from "framer-motion";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data["PRODUCTS-SELLER"]);
      })
      .catch((err) => console.error("Failed to fetch menu:", err));
  }, []);

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
        <div
          className=" 
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-6
        px-4
        "
        >
          <Suspense fallback={<div>Loading products...</div>}>
            {products.map((product) => {
              return (
                <MenuProducts
                  key={product.id}
                  img={product.image}
                  title={product.title}
                  description={product.description}
                  price={product.price}
                />
              );
            })}
          </Suspense>
        </div>
      </div>
    </motion.div>
  );
};

export default Products;
