import React, { useState } from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest, FaWhatsapp, FaLinkedin } from "react-icons/fa"

const Contact = () => {
  const [selectedFile, setSelectedFile] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted')
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.size <= 25 * 1024 * 1024) { // 25MB limit
      setSelectedFile(file)
    } else {
      alert('File size should not exceed 25MB')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm">
            <a href="/" className="text-blue-600 hover:text-blue-800">Home</a>
            <span className="mx-2">›</span>
            <span className="text-gray-600">Contact Us</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Contact Our Sales Team</h1>
        <p className="text-gray-600 mb-12">
          If you have any queries about our machines, Please be free to let us know. We will be getting back to you within 12 hours.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Country"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="tel"
                  placeholder="Tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <input
                type="text"
                placeholder="Company Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue=""
              >
                <option value="" disabled>Interested Product</option>
                <option value="product1">Product 1</option>
                <option value="product2">Product 2</option>
                <option value="product3">Product 3</option>
              </select>
              <textarea
                placeholder="Message"
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="fileInput"
                  accept=".jpg,.png,.pdf,.dxf,.dwg"
                />
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer inline-block px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  Choose File
                </label>
                <span className="ml-3 text-sm text-gray-500">
                  {selectedFile ? selectedFile.name : 'No file chosen'}
                </span>
                <p className="mt-1 text-xs text-gray-500">
                  *Please upload only jpg, png, pdf, dxf, dwg files. Size limit is 25MB.
                </p>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">E-mail</h2>
              <a href="mailto:contact@example.com" className="text-blue-600 hover:text-blue-800">
                contact@example.com
              </a>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Tel</h2>
              <a href="tel:86-13915087629" className="text-blue-600 hover:text-blue-800">
                86-13915087629
              </a>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Address</h2>
              <p className="text-gray-600">
                E2 Jiangsu Wujin Branch Park,wujin district Changzhou, Jiangsu,China
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Get Social</h2>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <FaFacebook size={24} />
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-400">
                  <FaTwitter size={24} />
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <FaLinkedin size={24} />
                </a>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Instant Message</h2>
              <p className="text-gray-600 mb-4">
                You can also scan below instant messenger link to reach us for quick communication.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="bg-white p-4 rounded-lg shadow-md mb-2">
                    <img src="/placeholder.svg?height=150&width=150" alt="WhatsApp QR" className="w-full" />
                  </div>
                  <p className="text-gray-600">Whatsapp</p>
                </div>
                <div className="text-center">
                  <div className="bg-white p-4 rounded-lg shadow-md mb-2">
                    <img src="/placeholder.svg?height=150&width=150" alt="WeChat QR" className="w-full" />
                  </div>
                  <p className="text-gray-600">Wechat</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Bhuwan Enterprise</h3>
              <p>
                Striving to exceed customer expectations by offering impeccable quality products and services.
              </p>
              <p>
                <strong>Timings:</strong> 9 AM - 7 PM<br />
                <strong>Working Days:</strong> Monday to Saturday
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">PAGES</h3>
              <ul className="space-y-1">
                <li>
                  <a href="/" className="hover:underline">Home</a>
                </li>
                <li>
                  <a href="/about" className="hover:underline">About Us</a>
                </li>
                <li>
                  <a href="/products" className="hover:underline">Products</a>
                </li>
                <li>
                  <a href="/contact" className="hover:underline">Contact Us</a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">ABOUT US</h3>
              <p>
                Bhuwan Enterprise is a technology-driven organization equipped with the best manufacturing facilities,
                catering to the unprecedented efforts of many industries.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">ADDRESS</h3>
              <p>Bhuwan Enterprise™ 5, Samrat Industrial Area, Gondal Road, Rajkot</p>
            </div>
          </div>

          <div className="mt-6 flex flex-col md:flex-row justify-between items-center text-sm">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Bhuwan Enterprise. All rights reserved - Developed by PH Devs
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" aria-label="Facebook" className="hover:text-white">
                <FaFacebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-white">
                <FaTwitter size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-white">
                <FaInstagram size={20} />
              </a>
              <a href="#" aria-label="Pinterest" className="hover:text-white">
                <FaPinterest size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Contact