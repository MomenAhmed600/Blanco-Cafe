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
  const [listvideo, setListvideo] = useState([]);

  // 1. جلب البيانات من db.json (نفس منطق مشروع الـ Products)
  useEffect(() => {
    window.scrollTo(0, 0);
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        setListvideo(data["video-about"] || []);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // 2. محاولة التشغيل التلقائي (Autoplay) برمجياً للأمان
  useEffect(() => {
    const videoEl = videoRef.current;
    if (videoEl) {
      videoEl.muted = true;
      videoEl.play().catch((err) => console.log("Autoplay blocked:", err));
    }
  }, [listvideo]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    emailjs
      .send("service", "template", formData, "")
      .then(() => {
        setSuccess("Message sent successfully ");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => setError("Something went wrong "))
      .finally(() => setLoading(false));
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
            {/* 1. قسم الفيديو المعدل ليعمل على الأيفون */}
            <div className="w-full h-[300px] md:h-[400px] overflow-hidden rounded-lg shadow-2xl bg-black relative">
              {listvideo.map((item) => (
                <video
                  ref={videoRef}
                  loop
                  playsInline
                  controls
                  className="w-full h-full object-cover"
                >
                  <source src={item.video} type="video/mp4" />
                </video>
              ))}
            </div>

            {/* 2. قسم النصوص */}
            <div className="space-y-6">
              <h3 className="text-3xl font-semibold leading-tight">
                What Makes Our Coffee Special?
              </h3>
              <p className="text-gray-400 leading-relaxed text-lg">
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

      {/* قسم الخريطة والـ Reviews */}
      <section
        id="smouha-location"
        className="bg-gray-900 text-black pt-12 pb-12 px-6 md:px-12 lg:px-24 w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pb-12">
          {/* الخريطة */}
          <div className="h-[450px] w-full rounded-2xl shadow-lg border-2 border-blue-100 overflow-hidden relative z-0">
            <MapContainer center={alexPos} zoom={12} className="h-full w-full">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={alexPos}>
                <Popup>فرع سموحة، الإسكندرية</Popup>
              </Marker>
            </MapContainer>
          </div>

          {/* الفورم */}
          <div className="space-y-6">
            <h2 className="text-center text-4xl font-bold mb-8 uppercase tracking-widest text-white">
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
                className="w-full border p-2 rounded outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded outline-none"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded h-32 outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded transition font-bold"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
              {success && (
                <p className="text-green-500 font-bold text-center mt-2">
                  {success}
                </p>
              )}
              {error && (
                <p className="text-red-500 font-bold text-center mt-2">
                  {error}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
