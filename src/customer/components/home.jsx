// Home.jsx
import React from "react";
import Slider from "react-slick";
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import Machine_1 from "../../assets/Machine 1.jpg";
import Machine_2 from "../../assets/Machine 2.jpg";
import Machine_3 from "../../assets/Machine 3.jpg";
import IntroVideo from "../../assets/Intro.mp4";
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
    <div className="w-full">
      {/* Hero Section with Video */}
      <Hero />

<<<<<<< HEAD
      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">FEATURES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((feature) => (
              <div key={feature} className="text-center">
                <div className="w-24 h-24 bg-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <div className="w-12 h-12 text-white">
                    {/* Icon placeholder */}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4">Lorem ipsum</h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Machinery Section with Carousel */}
      <div className="text-center p-6 bg-gray-50">
=======
       

      {/* Machinery Section */}
      <div className="text-center p-6">
>>>>>>> 15e25452afa4f14c923bb19f9ed43952fc62df64
        <h2 className="text-3xl font-bold mb-6">Our Machinery</h2>
        <div className="w-full max-w-4xl mx-auto">
          <Slider {...settings}>
            <div>
              <img
                src={Machine_1 || "/placeholder.svg"}
                alt="Machine 1"
                className="w-full h-[500px] object-cover rounded-lg shadow-lg"
              />
            </div>
            <div>
              <img
                src={Machine_2 || "/placeholder.svg"}
                alt="Machine 2"
                className="w-full h-[500px] object-cover rounded-lg shadow-lg"
              />
            </div>
            <div>
              <img
                src={Machine_3 || "/placeholder.svg"}
                alt="Machine 3"
                className="w-full h-[500px] object-cover rounded-lg shadow-lg"
              />
            </div>
          </Slider>
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-20 bg-blue-500 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">OUR SERVICES</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((service) => (
              <div key={service} className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                  {/* Service icon */}
                </div>
                <h3 className="text-xl font-semibold mb-4">Consectetur adipiscing</h3>
                <p className="opacity-80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">GALLERY</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="aspect-square">
                <img
                  src={`/placeholder.svg?height=300&width=300`}
                  alt={`Gallery item ${item}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-blue-500 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">GET IN TOUCH</h2>
          <div className="max-w-2xl mx-auto">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60"
                />
              </div>
              <textarea
                placeholder="Message"
                rows={6}
                className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60"
              ></textarea>
              <button className="w-full bg-white text-blue-500 px-8 py-3 rounded-md hover:bg-white/90 transition-colors">
                SEND MESSAGE
              </button>
            </form>
            <div className="flex justify-center space-x-6 mt-8">
              <FaFacebook className="w-6 h-6" />
              <FaTwitter className="w-6 h-6" />
              <FaInstagram className="w-6 h-6" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Bhuwan Enterprise. All rights reserved.</p>
      </footer>
    </div>
  );
};

<<<<<<< HEAD
export default Home;
=======
export default Home;
>>>>>>> 15e25452afa4f14c923bb19f9ed43952fc62df64
