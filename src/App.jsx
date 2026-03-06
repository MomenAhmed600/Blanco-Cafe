import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { lazy, Suspense } from "react";
const Menu = lazy(() => import("./components/Menu"));
const Home = lazy(() => import("./components/Home"));
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
                <img
                  src="/logo-2.png"
                  alt="logo"
                  className="w-20 h-20 mr-3 animate-spin"
                />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu/:type?" element={<Menu />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </SearchProvider>
    </Router>
  );
};

export default App;
