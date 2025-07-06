import React from "react";
import { FaInstagram, FaTiktok, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0b0d1d] h-auto py-4 w-full flex flex-col lg:flex-row lg:justify-between items-center px-6 text-white font-raleway text-sm">
      {/* Texto centrado */}
      <div className="w-full text-center order-2 md:order-1 mb-2 md:mb-0">
        © 2025 <span className="font-dancing text-lg">Valenciana</span> todos
        los derechos reservados.
      </div>

      {/* Íconos alineados a la derecha */}
      <div className="order-1 md:order-2 flex gap-5 mb-2">
        <a href="#" className="hover:text-blue-400 transition">
          <FaInstagram size={18} />
        </a>
        <a href="#" className="hover:text-blue-400 transition">
          <FaTiktok size={18} />
        </a>
        <a href="#" className="hover:text-blue-400 transition">
          <FaFacebookF size={18} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
