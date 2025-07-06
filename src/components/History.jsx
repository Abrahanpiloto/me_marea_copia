import React from "react";

const History = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 max-w-6xl mx-auto gap-12 ">
        {/* Imagen */}
        <div className="w-full flex justify-center mb-6 lg:mb-0 lg:w-2/5">
          <img
            src="/img-history.jpg"
            className="w-full max-w-xs h-138 object-cover rounded-xl shadow-2xl"
            alt="Sobre nosotros"
          />
        </div>

        {/* Texto */}
        <div className="w-full px-4 lg:w-3/5">
          <h1 className="text-3xl font-bold text-center mb-4 mt-8 text-white">
            Hola <span>👋</span>
          </h1>
          <div className="space-y-4 [&>p]:indent-8 [&>p]:text-justify [&>p]:leading-relaxed [&>p]:text-base [&>p]:text-white ">
            <p className="text-base mb-4 text-justify leading-relaxed indent-6 lg:max-w-none  ">
              Valenciana es una tienda online con esencia peruana, fundada en
              Lima, Perú en el año 2020. Aunque operamos exclusivamente por
              internet, llevamos con orgullo nuestras raíces locales. Ofrecemos
              una amplia gama de productos, desde ropa, zapatos, hasta mochilas
              y accesorios. En Valenciana, combinamos calidad, buenos precios y
              atención cercana para brindarte una experiencia de compra 100%
              confiable y accesible desde cualquier lugar.
            </p>
            <p className="text-base mb-4 text-justify leading-relaxed indent-6 lg:max-w-none">
              Valenciana nace con la idea de facilitar el acceso a productos
              esenciales con solo un clic. Nuestro objetivo es ofrecer una
              experiencia cercana, confiable y completamente online, llevando lo
              mejor de Valenciana a cada rincón del país.
            </p>
            <p className="italic text-base mb-4 text-justify leading-relaxed indent-6 lg:max-w-none">
              “No vendemos solo productos, creamos confianza desde lo local
              hacia lo digital.”
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
