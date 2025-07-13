import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#5683A0] pt-0 mt-8 lg:pt-0">
      <div className="max-w-6xl w-full flex flex-col-reverse lg:flex-row items-center gap-12">
        {/* Texto a la izquierda */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="mb-4 text-white">
            <span className="inline-block text-4xl font-bold align-middle">
              Bienvenido a{" "}
            </span>
            <span className="inline-block font-dancing text-5xl leading-tight align-middle">
              Valenciana
            </span>
          </h1>

          <p className="text-lg text-white mb-6">
            Ropa y accesorios para tus viajes y aventuras por el Perú y el 🌎
          </p>
          <Link
            to="/storepage"
            className="inline-block bg-white hover:bg-[#e2a555] text-black font-normal py-3 px-6 rounded-lg transition"
          >
            Compra ahora
          </Link>
        </div>

        {/* Imagen a la derecha */}
        <div className="w-full lg:w-3/4">
          <img
            src="/img-home.jpg"
            alt="Aventura en el Perú"
            className="w-full h-auto shadow-2xl object-cover rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
