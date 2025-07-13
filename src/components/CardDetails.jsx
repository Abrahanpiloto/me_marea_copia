import React, { useState } from "react";
import { addToCart } from "../services/cartServices";
import fetchCartCount from "../utils/fetchCartCount";

const CardDetail = ({ product }) => {
  const [mainImage, setMainImage] = useState(product.image_url);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = async () => {
    const item = {
      product_id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity,
      image_url: product.image_url,
    };

    try {
      await addToCart(item);
      // Obtener nuevo total del carrito:
      const count = await fetchCartCount();
      // Lanzar evento global para que navbar lo escuche:
      window.dispatchEvent(
        new CustomEvent("cartCountUpdated", { detail: count })
      );

      setAddedToCart(true);
      setTimeout(() => {
        setAddedToCart(false);
      }, 2000);

      console.log("Producto agregado al carrito:", item);
    } catch (error) {
      alert("Ocurrio un error al intentar agregar al carrito");
      console.error(error);
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto bg-white mt-22 flex flex-col lg:flex-row gap-2">
      <div className="lg:w-1/2">
        {/* Imagen principal */}
        <div className="w-full mb-4 flex justify-center">
          <img
            src={mainImage}
            alt={product.name}
            className="w-76 lg:w-90 h-full object-cover rounded"
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
      </div>
      {/* Info */}
      <div className="bg-[#ebeef5] rounded-md py-1 lg:w-1/2">
        <div className="flex flex-col items-starts mt-2 px-4">
          <h2 className="text-xl font-bold">{product.name}</h2>

          <p className="font-bold text-green-800 mb-2">S/. {product.price}</p>
        </div>

        {/* Tallas */}
        <div className="mb-2 px-4">
          <span className="text-sm">Tallas:</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.sizes.map((size) => {
              const trimmedSize = size.trim();
              const isSelected = selectedSize === trimmedSize;

              return (
                <button
                  key={trimmedSize}
                  onClick={() => setSelectedSize(trimmedSize)}
                  className={`px-2 py-0 border font-light text-sm rounded transition ${
                    isSelected
                      ? "bg-[#E2A555] text-black"
                      : "border-gray-300 hover:bg-white cursor-pointer"
                  }`}
                >
                  {trimmedSize}
                </button>
              );
            })}
          </div>
        </div>

        {/* ---- Colores ---- */}
        <div className="mb-4 px-4">
          <span className=" text-sm">Colores:</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.colors?.map((color) => {
              const isSelected = selectedColor === color;
              return (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-1 py-0 border text-sm font-light rounded transition ${
                    isSelected
                      ? "bg-[#E2A555] text-black"
                      : "border-gray-300 hover:bg-white cursor-pointer"
                  }`}
                >
                  {color}
                </button>
              );
            })}
          </div>
        </div>

        {/* ----- Selector de cantidad ----- */}
        <div className="flex items-center gap-4 mt-4 mb-4 px-4">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3.5 py-1 border rounded cursor-pointer hover:bg-white"
          >
            -
          </button>
          <span className="text-lg">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-1 border rounded cursor-pointer hover:bg-white"
          >
            +
          </button>

          {/* ---- Botón agregar al carrito ----- */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-[#E2A555] text-black py-2 rounded font-ligth text-lg hover:bg-emerald-400 transition cursor-pointer"
          >
            {addedToCart ? "Agregado ✅" : "Agregar al carrito"}
          </button>
        </div>

        {/* ---- Descripcion del producto ---- */}
        <div className="px-4">
          <p className="text-gray-600 mb-2">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
