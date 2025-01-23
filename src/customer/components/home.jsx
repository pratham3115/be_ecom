import React from "react";
import Slider from "react-slick";
import Machine_1 from "../../assets/Machine 1.jpg";
import Machine_2 from "../../assets/Machine 2.jpg";
import Machine_3 from "../../assets/Machine 3.jpg";
import IntroVideo from "../../assets/Intro.mp4"; // Ensure this path is correct
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



// Hero Section Component
const Hero = () => {
  return (
    <div className="relative bg-gray-900 text-white">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover"
          src={IntroVideo}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          Welcome to Bhuwan Enterprise
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          Your OneStop Solution for Knitting Problems.
        </p>
      </div>

      {/* Overlay Background */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
    </div>
  );
};

const Home = () => {
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      {/* Hero Section */}
      <Hero />

       

      {/* Machinery Section */}
      <div className="text-center p-6">
        <h2 className="text-3xl font-bold mb-6">Our Machinery</h2>
        <div className="w-full max-w-4xl mx-auto">
          <Slider {...settings}>
            <div>
              <img
                src={Machine_1}
                alt="Machine 1"
                className="w-full h-[500px] object-cover rounded-lg shadow-lg"
              />
            </div>
            <div>
              <img
                src={Machine_2}
                alt="Machine 2"
                className="w-full h-[500px] object-cover rounded-lg shadow-lg"
              />
            </div>
            <div>
              <img
                src={Machine_3}
                alt="Machine 3"
                className="w-full h-[500px] object-cover rounded-lg shadow-lg"
              />
            </div>
          </Slider>
        </div>
      </div>
    </>
  );
};

export default Home;
