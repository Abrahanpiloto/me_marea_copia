import React, { useState, useRef } from "react";
import { supabase } from "../../../supabase/supabaseClient";

const AddProduct = () => {
  const mainImageRef = useRef(null);
  const miniImagesRef = useRef(null);

  // estado local para guardar los datos del formulario:
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    sizes: [],
    colors: [],
    mainImage: null,
    miniImages: [],
  });

  const AVAILABLE_COLORS = [
    "Negro",
    "Blanco",
    "Rojo",
    "Azul",
    "Azul marino",
    "Verde",
    "Amarillo",
    "Gris",
    "Rosa",
    "Fucsia",
    "Melón",
    "Celeste",
    "Beige",
    "Café",
    "Morado",
    "Lila",
    "Naranja",
    "Turquesa",
    "Oro",
    "Plata",
  ];

  // función que se dispara cuando se cambia un input (texto o archivo):
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "mainImage") {
      setFormData({ ...formData, mainImage: files[0] });
    } else if (name === "miniImages") {
      // Acumula las imagenes anteriores con las nuevas:
      const newMiniImages = Array.from(files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setFormData((prev) => ({
        ...prev,
        miniImages: [...prev.miniImages, ...newMiniImages],
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Funcion para eliminar una miniatura:
  const handleRemoveMiniImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      miniImages: prev.miniImages.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // preparacion del archivo para subirlo a Supabase(IMAGEN PRICIPAL):
    const mainFile = formData.mainImage;
    const mainExt = mainFile.name.split(".").pop(); //obtiene la extensión del archivo(ej:.jpg,.png)
    const mainFileName = `main_${Date.now()}.${mainExt}`; //crea un nombre único con la fecha actual(Date.now())
    const mainPath = `products/${mainFileName}`; //define en qué carpeta del bucket Supabase se guardará(ej: products/17200d.jpg).

    // 1. Subir la imagen al bucket:
    // esto se le conoce como desestructuracion con renombramiento(const { error: uploadError })
    const { error: uploadMainError } = await supabase.storage
      .from("product-images")
      .upload(mainPath, mainFile);

    if (uploadMainError) {
      alert("Error al intentar subir la imagen Principal");
      console.error(uploadMainError);
      return;
    }
    // 2.obtener la url publica:
    const { data: mainUrlData } = supabase.storage
      .from("product-images")
      .getPublicUrl(mainPath);

    const mainImageUrl = mainUrlData.publicUrl;

    // 3.Subir mini imagenes:
    const miniImageUrls = [];
    for (const imageObj of formData.miniImages) {
      const image = imageObj.file;
      const ext = image.name.split(".").pop();
      const filename = `mini_${Date.now()}_${Math.random()
        .toString(36)
        .slice(2)}.${ext}`;
      const filepath = `products/${filename}`;

      // Subir imagen al bucket
      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filepath, image);
      console.log("Mini imágenes:", miniImageUrls);

      if (uploadError) {
        alert("Error al subir mini imagen");
        console.error(uploadError);
        return;
      }

      // Obtener la URL pública
      const { data: miniUrlData, error: urlError } = supabase.storage
        .from("product-images")
        .getPublicUrl(filepath);

      if (urlError || !miniUrlData?.publicUrl) {
        console.error("Error al obtener URL pública:", urlError);
        alert("Error al obtener la URL de una miniatura");
        return;
      }
      miniImageUrls.push(miniUrlData.publicUrl);
    }

    //4.Insertar datos del producto en la tabla:
    const { error: insertError } = await supabase.from("products").insert([
      {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        sizes: formData.sizes,
        colors: formData.colors,
        image_url: mainImageUrl,
        image_urls: miniImageUrls,
      },
    ]);

    if (insertError) {
      alert("Error al guardar el producto");
      console.error(insertError);
    } else {
      alert("Producto agregado exitosamente");
    }

    // Reiniciar el formulario
    setFormData({
      name: "",
      description: "",
      price: "",
      sizes: "",
      colors: [],
      mainImage: null,
      miniImages: [],
    });
    if (mainImageRef.current) {
      mainImageRef.current.value = "";
    }
    if (miniImagesRef.current) miniImagesRef.current.value = "";
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-100 shadow-lg rounded mt-2 overflow-hidden">
      <div>
        <h2 className="text-2xl font-bold">Productos</h2>
        <h3 className="text-xl text-gray-700 mb-4">Agregar nuevo producto</h3>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <input
            name="name"
            type="text"
            placeholder="Nombre del producto"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <textarea
            name="description"
            placeholder="Descripción"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="price"
            type="number"
            step="0.01"
            placeholder="Precio"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          {/* ----- TALLAS (tipo checkbox) ------ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seleccionar tallas disponibles
            </label>
            <div className="flex flex-wrap gap-2">
              {["S", "M", "L", "XL", "XXL", "Única"].map((size) => {
                const isSelected = formData.sizes.includes(size);
                return (
                  <button
                    type="button"
                    key={size}
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        sizes: isSelected
                          ? prev.sizes.filter((s) => s !== size) // quitar
                          : [...prev.sizes, size], // agregar
                      }));
                    }}
                    className={`px-4 py-2 rounded-full border text-sm ${
                      isSelected
                        ? "bg-orange-500 text-white border-orange-500"
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
          {/* ----- COLORES (tipo botón) ------ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seleccionar colores disponibles (opcional)
            </label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_COLORS.map((color) => {
                const isSelected = formData.colors.includes(color);
                return (
                  <button
                    type="button"
                    key={color}
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        colors: isSelected
                          ? prev.colors.filter((c) => c !== color) // quitar color
                          : [...prev.colors, color], // agregar color
                      }));
                    }}
                    className={`px-3 py-1 text-sm rounded-full border transition ${
                      isSelected
                        ? "bg-orange-500 text-white border-orange-500"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {color}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ---- Imagen PRINCIPAL ---- */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Elegir imagen principal
            </label>
            <input
              name="mainImage"
              type="file"
              ref={mainImageRef}
              accept="image/*"
              onChange={handleChange}
              required
              className="w-full p-2 border rounded text-gray-500"
            />
          </div>

          {/* ----- MINIATURAS ------ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Elegir imágenes miniaturas
            </label>
            <input
              name="miniImages"
              type="file"
              ref={miniImagesRef}
              accept="image/*"
              multiple
              onChange={handleChange}
              className="w-full p-2 border rounded text-gray-500"
            />
          </div>
          <div>
            {/* PREVIEW miniaturas seleccionadas */}
            {formData.miniImages.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.miniImages.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img.preview}
                      alt={`Miniatura ${index}`}
                      className="w-20 h-20 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveMiniImage(index)}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-400 text-black w-full py-2 rounded hover:bg-emerald-400 transition cursor-pointer font-bold"
          >
            Subir producto
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
