import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

const CarouselCom = () => {
  const slides = [
    {
      img: "/img/room-1.jpg",
      title: "Exclusive Gaming",
      desc: "Level up your gaming experience in our fully equipped private rooms.",
    },
    {
      img: "/img/room-2.jpg",
      title: "Exclusive Gaming",
      desc: "Level up your gaming experience in our fully equipped private rooms.",
    },
    {
      img: "/img/room-birth.png",
      title: "Celebrate Your Special Day",
      desc: "Level up your birthday in our exclusive private lounge.",
    },
    {
      img: "/img/room-val.png",
      title: "Valentine’s Private Room",
      desc: "Private, romantic, and perfectly curated.",
    },
  ];

  return (
    <div className="w-full h-[500px] relative rounded-2xl overflow-hidden shadow-2xl">
      <Swiper
        spaceBetween={0}
        effect={"fade"}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        className="mySwiper h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              {/* Image */}
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-full object-fill"
              />

              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[80%] md:w-[60%] bg-black/40 backdrop-blur-sm text-white p-6 rounded-xl text-center z-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  {slide.title}
                </h3>
                <p className="text-sm md:text-lg opacity-90">{slide.desc}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx="true" global="true">{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #fff !important;
        }
        .swiper-pagination-bullet-active {
          background: #d2cc76 !important;
        }
      `}</style>
    </div>
  );
};

export default CarouselCom;
