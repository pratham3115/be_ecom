import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Machine_1 from '../../assets/Machine 1.jpg';
import Machine_2 from '../../assets/Machine 2.jpg';
import Machine_3 from '../../assets/Machine 3.jpg';

// Slick carousel settings
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};

const Home = () => {
  return (
    <div className="text-center p-6">
      {/* Title */}
      <h1 className="text-5xl font-bold mb-4">Welcome to the Home Page</h1>

      {/* Content */}
      <p className="text-lg text-gray-600 mb-6">
        Your OneStop Solution For Knitting Problems.
      </p>

      {/* Carousel */}
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
  );
};

export default Home;
