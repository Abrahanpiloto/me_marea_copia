import { useState, useRef } from "react";
import { supabase } from "../../../supabase/supabaseClient";
// https://supabase.com/dashboard/project/pxzofoylbjgvpvsqjznb/storage/buckets/categories

const AddCategories = () => {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [previewImageUrl, setPreviewImageUrl] = useState(null);

  const inputImageRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    if (!name || !imageFile) {
      alert("Por favor ingresa un nombre y una imagen.");
      setLoading(false);
      return;
    }

    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `categories/${fileName}`;

    // 1. Subir imagen a Storage Supabase:
    const { error: uploadError } = await supabase.storage
      .from("categories")
      .upload(filePath, imageFile);

    if (uploadError) {
      console.error("Error al subir imagen:", uploadError);
      alert("Error al subir imagen.");
      setLoading(false);
      return;
    }

    // 2. Obtener la URL publica de la imagen:
    const { data: publicUrlData } = supabase.storage
      .from("categories")
      .getPublicUrl(filePath);

    const image_url = publicUrlData?.publicUrl;

    // 3. Guardar categoria en la base de datos Supabase:
    const { error: insertError } = await supabase.from("categories").insert([
      {
        name,
        image_url,
      },
    ]);

    if (insertError) {
      console.error("Error al guardar la categoria:", insertError);
      alert("Error al guardar la categoria");
    } else {
      setSuccess("Categoría guardada con exito!");
      setTimeout(() => {
        setSuccess("");
      }, 2000);

      setName("");
      setImageFile(null);
      if (inputImageRef.current) inputImageRef.current.value = null;
      setPreviewImageUrl(null);
    }
    setLoading(false);
  };

  const handlePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const preview = URL.createObjectURL(file); //crea una url temporal
      setPreviewImageUrl(preview);
    }
  };

  return (
    <div className="p-4 bg-gray-100 shadow-lg rounded mt-2">
      <div>
        <h3 className="font-bold text-2xl">Categorias</h3>
        <h2 className="text-xl mb-2">Agregar nueva categoría</h2>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Nombre"
            />
          </div>

          <div>
            <input
              ref={inputImageRef}
              type="file"
              accept="image/*"
              onChange={handlePreview}
              required
              className="w-full p-2 border rounded text-gray-500"
            />
          </div>
          {previewImageUrl && (
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-1">Vista previa:</p>
              <img
                src={previewImageUrl}
                alt="Vista previa"
                className="w-32 h-32 object-cover rounded border"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-400 text-black w-full py-2 rounded hover:bg-emerald-400 transition cursor-pointer font-bold"
          >
            {loading ? "Guardando..." : "Agregar Categoría"}
          </button>

          {success && <p className="text-green-600 mt-2">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddCategories;
