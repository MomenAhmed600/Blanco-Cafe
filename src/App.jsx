import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { lazy, Suspense } from "react";
const Menu = lazy(() => import("./components/Menu"));
const Home = lazy(() => import("./components/Home"));
const Products = lazy(() => import("./components/Products"));
import { SyncLoader } from "react-spinners";
import { SearchProvider } from "./context/SearchContext";
const App = () => {
  return (
    <Router>
      <SearchProvider>
        <Navbar />
        <main>
          <Suspense
            fallback={
              <div className="flex justify-center items-center min-h-[60vh]">
                <SyncLoader color="#000000" size={15} margin={5} />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu/:type?" element={<Menu />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </SearchProvider>
    </Router>
  );
};

export default App;
