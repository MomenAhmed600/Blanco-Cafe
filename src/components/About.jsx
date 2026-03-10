import emailjs from "emailjs-com";
import { motion } from "framer-motion";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const About = () => {
  const videoRef = useRef(null);
  const [listvideo, setListvideo] = useState([]); // لتخزين الفيديو من الـ JSON
  const [isLoading, setIsLoading] = useState(true); // لضمان عدم ظهور الفيديو مشوه في الأيفون

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // 1. Fetch data from db.json
  useEffect(() => {
    window.scrollTo(0, 0);

    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        setListvideo(data["video-about"] || []);
      })
      .catch((error) => {
        console.error("Error fetching db.json:", error);
      });
  }, []);

  // 2. محاولة التشغيل يدوياً بعد ما الـ loading يخلص (مهم جداً للأيفون)
  useEffect(() => {
    const videoEl = videoRef.current;
    if (videoEl && !isLoading) {
      videoEl.muted = true;
      videoEl.play().catch((err) => {
        console.log("Autoplay is disabled", err);
      });
    }
  }, [isLoading]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    emailjs
      .send(
        "service", // Service ID
        "template", // Template ID
        formData,
        "", // Public Key
      )
      .then(() => {
        setSuccess("Message sent successfully ");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => {
        setError("Something went wrong ");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  const alexPos = [31.210863895166653, 29.93937014135554];

  return (
    <>
      <section className="bg-gray-100 text-black py-16 px-6 md:px-12 lg:px-24">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <h2 className="text-center text-4xl font-bold mb-12 uppercase tracking-widest">
            About <span className="text-orange-600">Us</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* section-video container */}
            <div className="w-full h-[400px] overflow-hidden rounded-lg shadow-2xl relative bg-black">
              {/* عرض الـ Loading لحد ما الفيديو يجهز (نفس فكرة مشروعك القديم) */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center text-white bg-gray-300 z-10 font-bold">
                  LOADING VIDEO ...
                </div>
              )}

              {listvideo.map((item) => (
                <video
                  key={item.id}
                  ref={videoRef}
                  loop
                  muted
                  autoPlay
                  playsInline
                  webkit-playsinline="true"
                  className="w-full h-full object-cover"
                  src={item.video}
                  onLoadedData={() => setIsLoading(false)} // بيغير الـ state لما الداتا تحمل
                  style={{ display: isLoading ? "none" : "block" }} // بيمنع الـ glitch في الأيفون
                />
              ))}
            </div>

            {/* section-text */}
            <div className="space-y-6">
              <h3 className="text-3xl font-semibold leading-tight">
                What Makes Our Coffee Special?
              </h3>

              <p className="text-gray-400 leading-relaxed text-lg">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Doloribus repellendus dolores ratione facere corrupti tempora
                repellat totam aspernatur dignissimos, deleniti laudantium.
              </p>

              <p className="text-gray-500 leading-relaxed">
                Crafting Your quality, fresh roasted and perfect blended coffee
                is our true commitment since 2006.
              </p>

              <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-md transition duration-300 font-medium uppercase text-sm">
                Read More
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Section Location & Form */}
      <section
        id="smouha-location"
        className="bg-gray-900 text-black pt-12 pb-0 px-6 md:px-12 lg:px-24 w-full"
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <div className="h-[450px] w-full rounded-2xl shadow-lg border-2 border-blue-100 overflow-hidden relative z-0">
            <MapContainer center={alexPos} zoom={12} className="h-full w-full">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={alexPos}>
                <Popup>
                  <div className="text-center font-sans">
                    <h3 className="font-bold text-blue-700">فرع الإسكندرية</h3>
                    <p className="text-xs">سموحة، الإسكندرية</p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>

          <div className="space-y-6">
            <h2 className="text-center text-4xl font-bold mb-12 uppercase tracking-widest text-white">
              Reviews
            </h2>
            <form onSubmit={sendEmail} className="max-w-md mx-auto space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded h-32"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
              {success && <p className="text-green-600">{success}</p>}
              {error && <p className="text-red-600">{error}</p>}
            </form>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default About;
