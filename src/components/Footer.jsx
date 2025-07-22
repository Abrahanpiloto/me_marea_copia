import React from "react";
import { FaInstagram, FaTiktok, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0b0d1d] py-4 w-full text-white font-raleway text-sm">
      <div className="flex flex-col lg:grid lg:grid-cols-3 items-center px-6 gap-4 lg:gap-0">
        {/* Izquierda: Tu firma */}
        <div className="order-3 lg:order-none lg:justify-self-start">
          <p className="text-sm text-white">
            Hecho con ❤️ por{" "}
            <a
              href="https://abrahanpiloto.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className=""
            >
              <span className="font-dancing text-xl text-red-400 hover:text-blue-500">
                Abrahan Piloto
              </span>
            </a>
          </p>
        </div>

        {/* Centro: Derechos reservados */}
        <div className="order-2 lg:order-none text-center">
          © 2025 <span className="font-dancing text-lg">Valenciana</span> todos
          los derechos reservados.
        </div>

        {/* Derecha: Redes sociales */}
        <div className="order-1 lg:order-none flex gap-5 lg:justify-end">
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
      </div>
    </footer>
  );
};

export default Footer;
