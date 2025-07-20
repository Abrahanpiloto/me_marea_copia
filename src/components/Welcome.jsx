import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-18 bg-[#5683A0]">
      <div className="max-w-6xl w-full flex flex-col-reverse lg:flex-row items-center gap-12 mt-10">
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
            className="bg-[#e2a555] hover:bg-white text-black font-bold py-3 px-4 rounded-md transition shadow-2xl"
          >
            Comprar ahora
          </Link>
        </div>

        {/* Imagen a la derecha */}
        <div className="w-full lg:w-3/4">
          <img
            src="/img-home.jpg"
            alt="Aventura en el Perú"
            className="w-full h-auto shadow-2xl object-cover rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
