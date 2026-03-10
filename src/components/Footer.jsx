import { motion } from "framer-motion";
import { CgMail } from "react-icons/cg";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa6";
import { HashLink } from "react-router-hash-link";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#FFF] to-[#d2cc76] text-white shadow-[0_-3px_10px_rgb(0,0,0,0.2)]">
      <motion.div
        className=""
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        {/* Main Footer Content */}

        <div className="max-w-7xl mx-auto px-5 pt-4 pb-16 grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Section 1: Brand */}
          <div className="ft-1">
            <div className="flex items-center gap-2">
              <img src="/logo-2.png" alt="logo" className="w-8 h-8" />
              <h1 className="text-xl font-semibold text-black">Blanco</h1>
            </div>
            <p className="text-black md:ml-3 md:mt-3">
              Taste the finest coffee, freshly roasted for you.
            </p>
          </div>

          {/* Section 2: Links */}
          <div className="ft-2">
            <h5 className="text-xl font-semibold mb-4 text-black">
              Quick Links
            </h5>
            <ul className="space-y-2">
              <li>
                <a
                  href="/menu"
                  className="hover:text-[#fff] transition text-black"
                >
                  Menu
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-[#fff] transition text-black"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Section 3: Social */}
          <div className="ft-3">
            <h5 className="text-xl font-semibold mb-4 text-black">Follow Us</h5>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.facebook.com/Blanco.cafe.playstation#"
                  target="blank"
                  className="flex items-center gap-2 hover:text-blue-500 transition text-black"
                >
                  <FaFacebook /> Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/blancocafeandplaystion/"
                  target="blank"
                  className="flex items-center gap-2 hover:text-pink-500 transition text-black"
                >
                  <FaInstagram /> Instagram
                </a>
              </li>
              <li>
                <a
                  href="mailto:cafeblanco968@gmail.com"
                  target="blank"
                  className="flex items-center gap-2 hover:text-gray-400 transition text-black"
                >
                  <CgMail /> Email
                </a>
              </li>
            </ul>
          </div>

          {/* Section 4: Location */}
          <div className="ft-4">
            <h5 className="text-xl font-semibold mb-4 text-black">
              ALEXANDRIA
            </h5>
            <ul className="space-y-2">
              <li>
                <HashLink
                  smooth
                  to="/about#smouha-location"
                  className="hover:text-[#fff] transition text-black cursor-pointer"
                >
                  SMOUHA
                </HashLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-black text-center py-4 text-white text-sm">
          <p className="flex items-center justify-center gap-2">
            <FaRegCopyright /> Copy Right 2026 - All Reserved By Mo'men Ahmed
          </p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
