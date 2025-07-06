import React, { useState } from "react";

const CardDetail = ({ product }) => {
  const [mainImage, setMainImage] = useState(product.image_url);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);

  return (
    <div className="p-4 max-w-md mx-auto bg-white mt-22">
      {/* Imagen principal */}
      <div className="w-full aspect-[4/5] mb-4 flex justify-center">
        <img
          src={mainImage}
          alt={product.name}
          className="w-76 h-full object-cover rounded"
        />
      </div>

      {/* Miniaturas */}
      <div className="flex gap-2 mb-4 justify-center">
        {[product.image_url, ...(product.image_urls || [])].map(
          (url, index) => (
            <img
              key={index}
              src={url}
              alt={`Miniatura ${index + 1}`}
              className={`w-18 h-20 object-cover rounded  cursor-pointer ${
                mainImage === url ? "ring-2 ring-emerald-500" : ""
              }`}
              onClick={() => setMainImage(url)}
            />
          )
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col items-starts mt-8 px-4">
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <p className="font-bold text-orange-700 mb-2">S/. {product.price}</p>
      </div>
      {/* Tallas */}
      <div className="mb-2 px-4">
        <span className="font-semibold text-sm">Tallas:</span>
        <div className="mt-1">
          {product.sizes.split(",").map((size) => (
            <button
              key={size}
              className="border border-gray-300 px-3 py-1 mr-2 text-sm rounded hover:bg-gray-100"
            >
              {size.trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Selector de cantidad */}
      <div className="flex items-center gap-4 mt-4 mb-4 px-4">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="px-3 py-1 border rounded"
        >
          -
        </button>
        <span className="text-lg">{quantity}</span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="px-3 py-1 border rounded"
        >
          +
        </button>
        {/* Botón agregar al carrito */}
        <button className="w-full bg-[#E2A555] text-black py-3 rounded font-ligth text-lg hover:bg-emerald-200 transition">
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default CardDetail;
