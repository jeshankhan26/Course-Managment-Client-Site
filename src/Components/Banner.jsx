import React, { useState } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    id: 1,
    title: "Grow with Confidence",
    subtitle: "We provide the best digital solutions for your business.",
    image: "https://i.ibb.co/vxCcD6kv/Pink-and-Yellow-Gradient-Grow-Your-Business-With-Us-Banner-1.png",
  },
  {
    id: 2,
    title: "Innovate the Future",
    subtitle: "Explore cutting-edge tools and strategies.",
    image: "https://i.ibb.co/RkTh7KGM/Purple-Modern-Artificial-Intelligence-Banner-1.png",
  },
  {
    id: 3,
    title: "Your Success, Our Mission",
    subtitle: "Let’s build something amazing together.",
    image: "https://i.ibb.co/7xGHnwHZ/Blue-White-Illustration-Your-Health-Is-Our-Priority-Banner.png",
  },
];

const Banner = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 500, 
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    beforeChange: (oldIndex, newIndex) => setActiveSlide(newIndex),
  };

  return (
    <div className="bg-accent-content text-white">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={slide.id} className="relative h-[80vh] w-full">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className=""></div>
            </div>

            {/* Motion Content */}
            <div className="relative z-10 flex flex-col text-right justify-center h-full text px-4 lg:px-40">
              {activeSlide === index && (
                <>
                  <motion.h2
                    key={`title-${slide.id}-${activeSlide}`} // key includes activeSlide to re-trigger motion
                    className="text-xl md:text-5xl font-bold mb-4"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    {slide.title}
                  </motion.h2>
                  <motion.p
                    key={`subtitle-${slide.id}-${activeSlide}`} 
                    className="text-sm md:text-xl"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 1 }}
                  >
                    {slide.subtitle}
                  </motion.p>
                </>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
