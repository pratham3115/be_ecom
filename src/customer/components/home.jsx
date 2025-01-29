// // Home.jsx
// import React from "react";
// import Slider from "react-slick";
// import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
// import Machine_1 from "../../assets/Machine 1.jpg";
// import Machine_2 from "../../assets/Machine 2.jpg";
// import Machine_3 from "../../assets/Machine 3.jpg";
// import IntroVideo from "../../assets/Intro.mp4";
// import Product_1 from "../../assets/White electric.jpg";
// import Product_2 from "../../assets/Fine_circle.jpg";
// import Product_3 from "../../assets/Circle spark.jpg";
// import Product_4 from "../../assets/cap.jpg";
// import Product_5 from "../../assets/circle plate.jpg";
// import Product_6 from "../../assets/Thin plate.jpg";
// import Product_7 from "../../assets/Types_fuse.jpg";
// import Product_8 from "../../assets/grip.jpg";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";



// // Hero Section Component
// const Hero = () => {
//   return (
//     <div className="relative bg-gray-900 text-white">
//       {/* Background Video */}
//       <div className="absolute inset-0">
//         <video
//           className="w-full h-full object-cover"
//           src={IntroVideo}
//           autoPlay
//           loop
//           muted
//           playsInline
//         />
//       </div>

//       {/* Overlay Content */}
//       <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-6">
//         <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
//           Welcome to Bhuwan Enterprise
//         </h1>
//         <p className="text-lg md:text-xl text-gray-300">
//           Your OneStop Solution for Knitting Problems.
//         </p>
//       </div>

//       {/* Overlay Background */}
//       <div className="absolute inset-0 bg-black opacity-40"></div>
//     </div>
//   );
// };

// const Home = () => {
//   // Slider settings
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//   };

//   return (
//     <div className="w-full">
//       {/* Hero Section with Video */}
//       <Hero />

       

//       {/* Machinery Section */}
//       <div className="text-center p-6">
//         <h2 className="text-3xl font-bold mb-6">Our Machinery</h2>
//         <div className="w-full max-w-4xl mx-auto">
//           <Slider {...settings}>
//             <div>
//               <img
//                 src={Machine_1 || "/placeholder.svg"}
//                 alt="Machine 1"
//                 className="w-full h-[500px] object-cover rounded-lg shadow-lg"
//               />
//             </div>
//             <div>
//               <img
//                 src={Machine_2 || "/placeholder.svg"}
//                 alt="Machine 2"
//                 className="w-full h-[500px] object-cover rounded-lg shadow-lg"
//               />
//             </div>
//             <div>
//               <img
//                 src={Machine_3 || "/placeholder.svg"}
//                 alt="Machine 3"
//                 className="w-full h-[500px] object-cover rounded-lg shadow-lg"
//               />
//             </div>
//           </Slider>
//         </div>
//       </div>

//       {/* Services Section */}
//       <section id="services" className="py-20 bg-blue-500 text-white">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-16">OUR SERVICES</h2>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[1, 2, 3, 4, 5, 6].map((service) => (
//               <div key={service} className="text-center">
//                 <div className="w-16 h-16 bg-white/10 rounded-full mx-auto mb-6 flex items-center justify-center">
//                   {/* Service icon */}
//                 </div>
//                 <h3 className="text-xl font-semibold mb-4">Consectetur adipiscing</h3>
//                 <p className="opacity-80">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//  {/* Products Section */}
// <section id="Products" className="py-20">
//   <div className="container mx-auto px-4">
//     <h2 className="text-3xl font-bold text-center mb-16">Products</h2>
//     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//       {[Product_1, Product_2, Product_3, Product_4, Product_5, Product_6, Product_7, Product_8].map((item, index) => (
//         <div key={index} className="aspect-square">
//           {/* First Image */}
//           <img
//             src={item}
//             alt={`Products item ${index + 1}`}
//             className="w-full h-full object-cover rounded-lg mb-4" // Added margin-bottom for spacing
//           />
//         </div>
//       ))}
//     </div>
//   </div>
// </section>

//       {/* Contact Section */}
//       <section id="contact" className="py-16 bg-blue-500 text-white">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-16">GET IN TOUCH</h2>
//           <div className="max-w-2xl mx-auto">
//             <form className="space-y-6">
//               <div className="grid md:grid-cols-2 gap-6">
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60"
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60"
//                 />
//               </div>
//               <textarea
//                 placeholder="Message"
//                 rows={6}
//                 className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60"
//               ></textarea>
//               <button className="w-full bg-white text-blue-500 px-8 py-3 rounded-md hover:bg-white/90 transition-colors">
//                 SEND MESSAGE
//               </button>
//             </form>
//             <div className="flex justify-center space-x-6 mt-8">
//               <FaFacebook className="w-6 h-6" />
//               <FaTwitter className="w-6 h-6" />
//               <FaInstagram className="w-6 h-6" />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="py-6 text-center text-gray-600 text-sm">
//         <p>&copy; {new Date().getFullYear()} Bhuwan Enterprise. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default Home;


import React, { useState, useEffect, useCallback } from "react"
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPinterest,
  FaArrowUp,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Machine_1 from "../../assets/Machine 1.jpg"
import Machine_2 from "../../assets/Machine 2.jpg"
import Machine_3 from "../../assets/Machine 3.jpg"
import IntroVideo from "../../assets/Intro.mp4"
import Product_1 from "../../assets/White electric.jpg"
import Product_2 from "../../assets/Fine_circle.jpg"
import Product_3 from "../../assets/Circle spark.jpg"
import Product_4 from "../../assets/cap.jpg"
import Product_5 from "../../assets/circle plate.jpg"
import Product_6 from "../../assets/Thin plate.jpg"
import Product_7 from "../../assets/Types_fuse.jpg"
import Product_8 from "../../assets/grip.jpg"

const products = [
  { name: "MANDREL", image: Product_1 },
  { name: "HELICAL GEAR", image: Product_2 },
  { name: "CNC TURNED COMPONENTS", image: Product_3 },
  { name: "SPINDLE", image: Product_4 },
  { name: "RECEIVING GAUGES", image: Product_5 },
  { name: "DRILL JIG", image: Product_6 },
  { name: "COLLETS", image: Product_7 },
  { name: "HYDRAULIC FIXTURES", image: Product_8 },
]

const machines = [Machine_1, Machine_2, Machine_3]

const FadeInWhenVisible = ({ children }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.3 }}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0.9 },
      }}
    >
      {children}
    </motion.div>
  )
}

const Home = () => {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [currentMachine, setCurrentMachine] = useState(0)

  const nextMachine = useCallback(() => {
    setCurrentMachine((prev) => (prev + 1) % machines.length)
  }, [])

  const prevMachine = useCallback(() => {
    setCurrentMachine((prev) => (prev - 1 + machines.length) % machines.length)
  }, [])

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div className="w-full">
      <main>
        {/* Hero Section */}
        <div className="relative bg-gray-900 text-white">
          <div className="absolute inset-0">
            <video className="w-full h-full object-cover" src={IntroVideo} autoPlay loop muted playsInline />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-6">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-extrabold mb-4"
            >
              Welcome to Bhuwan Enterprise
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base md:text-lg text-gray-300"
            >
              Your OneStop Solution for Precision Engineering.
            </motion.p>
          </div>
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>

        {/* Machinery Section */}
        <FadeInWhenVisible>
          <div className="text-center p-6 bg-gray-50">
            <h2 className="text-2xl font-bold mb-6">Our Machinery</h2>
            <div className="w-full max-w-5xl mx-auto relative h-[500px]">
              <img
                src={machines[currentMachine] || "/placeholder.svg"}
                alt={`Machine ${currentMachine + 1}`}
                className="w-full h-full object-contain rounded-lg shadow-lg"
              />
              <button
                onClick={prevMachine}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-3 rounded-full shadow-md hover:bg-opacity-75 transition duration-300"
                aria-label="Previous machine"
              >
                <FaChevronLeft className="text-gray-800 text-xl" />
              </button>
              <button
                onClick={nextMachine}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-3 rounded-full shadow-md hover:bg-opacity-75 transition duration-300"
                aria-label="Next machine"
              >
                <FaChevronRight className="text-gray-800 text-xl" />
              </button>
            </div>
          </div>
        </FadeInWhenVisible>

        {/* Products Section */}
        <FadeInWhenVisible>
          <section className="py-10 bg-white">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Our Products</h2>
              <p className="text-center text-gray-600 mb-6 text-xs">
                Bhuwan Enterprise provides you wide range of products.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {products.map((product, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-center bg-white rounded-lg shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md"
                  >
                    <div className="h-40 overflow-hidden">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="p-2">
                      <h3 className="text-sm font-medium text-gray-800">{product.name}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </FadeInWhenVisible>

        {/* Contact Section */}
        <FadeInWhenVisible>
          <section className="py-12 bg-blue-50">
            <div className="max-w-xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Get in touch</h2>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </section>
        </FadeInWhenVisible>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-8">
          <div className="container mx-auto px-4">
            {/* Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Section 1 */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-white">Bhuwan Enterprise</h3>
                <p className="text-sm">
                  Striving to exceed customer expectations by offering impeccable quality products and services.
                </p>
                <p className="text-sm">
                  <strong>Timings:</strong> 9 AM - 7 PM
                  <br />
                  <strong>Working Days:</strong> Monday to Saturday
                </p>
              </div>

              {/* Section 2 */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-white">PAGES</h3>
                <ul className="space-y-1 text-sm">
                  <li>
                    <a href="/" className="hover:underline transition duration-300">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="hover:underline transition duration-300">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="/products" className="hover:underline transition duration-300">
                      Products
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="hover:underline transition duration-300">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>

              {/* Section 3 */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-white">ABOUT US</h3>
                <p className="text-sm">
                  Bhuwan Enterprise is a technology-driven organization equipped with the best manufacturing facilities,
                  catering to the unprecedented efforts of many industries.
                </p>
              </div>

              {/* Section 4 */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-white">ADDRESS</h3>
                <p className="text-sm"> Shed No.5, Plot No. 272, Parth Ind. Estate, Damanganga Industrial Park, Karvad Vapi- 396193, GUJARAT</p>
              </div>
            </div>

            {/* Footer Bottom */}
            <div className="mt-6 flex flex-col md:flex-row justify-between items-center text-xs">
              <p className="text-gray-400">
                © {new Date().getFullYear()} Bhuwan Enterprise. All rights reserved - Developed by PH Devs
              </p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="#" aria-label="Facebook" className="hover:text-white transition duration-300">
                  <FaFacebook size={16} />
                </a>
                <a href="#" aria-label="Twitter" className="hover:text-white transition duration-300">
                  <FaTwitter size={16} />
                </a>
                <a href="#" aria-label="Instagram" className="hover:text-white transition duration-300">
                  <FaInstagram size={16} />
                </a>
                <a href="#" aria-label="Pinterest" className="hover:text-white transition duration-300">
                  <FaPinterest size={16} />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
        >
          <FaArrowUp size={16} />
        </motion.button>
      )}
    </div>
  )
}

export default Home


