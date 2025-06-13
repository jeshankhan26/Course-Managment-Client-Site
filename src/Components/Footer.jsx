import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-accent-content text-white px-6 py-10 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: Logo & Slogan */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img
              src="https://i.ibb.co/nMW3VmXx/2606584-5920-removebg-preview.png"
              alt="Logo"
              className="w-10 h-10"
            />
            <motion.h1
                        className="text-xl font-bold"
                        animate={{ color: ["#FF5733", "#33FF57", "#3357FF", "#FF33A6", "#FF5733"] }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          repeatType: "loop",
                          ease: "linear",
                        }}
                      >
                        CourseNest
                      </motion.h1>
          </div>
          <p className="text-sm">Empowering your learning journey with the best online courses.</p>

          {/* Social Icons */}
          <div className="flex gap-3 mt-4">
            <a href="#" className="text-white hover:text-primary"><FaFacebookF /></a>
            <a href="#" className="text-white hover:text-primary"><FaTwitter /></a>
            <a href="#" className="text-white hover:text-primary"><FaInstagram /></a>
            <a href="#" className="text-white hover:text-primary"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Column 2: Links */}
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#" className="link link-hover">Home</a></li>
            <li><a href="#" className="link link-hover">Courses</a></li>
            <li><a href="#" className="link link-hover">About Us</a></li>
          </ul>
        </div>

        {/* Column 3: Support */}
        <div>
          <h4 className="font-semibold mb-3">Support</h4>
          <ul className="space-y-2">
            <li><a href="#" className="link link-hover">Contact</a></li>
            <li><a href="#" className="link link-hover">Help Center</a></li>
            <li><a href="#" className="link link-hover">Terms & Conditions</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="mt-10 text-center text-sm border-t border-white/20 pt-4">
        &copy; {new Date().getFullYear()} CourseNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
