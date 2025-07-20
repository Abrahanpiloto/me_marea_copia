import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("categories").select("*");
      if (!error) setCategories(data);
      else console.error("Error al cargar categorias:", error);
      setLoading(false);
    };

    fetchCategories();
  }, []);

  return (
    <div className="p-4 py-8 max-w-7xl mx-auto bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Comprar por categoría
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.length > 0 ? (
          categories.map((cat) => (
            <Link>
              <div className=" aspect-square cover overflow-hidden rounded">
                <img
                  src={cat.image_url}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-center mt-2 font-bold text-gray-800 group-hover:text-emerald-600">
                {cat.name}
              </h3>
            </Link>
          ))
        ) : (
          <p>Aun no hay categorias...</p>
        )}
      </div>
    </div>
  );
};

export default Categories;
