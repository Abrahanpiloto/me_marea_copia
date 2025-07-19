import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import { useNavigate } from "react-router-dom";

const PRODUCTS_PER_PAGE = 16;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("recent");
  const [totalProducts, setTotalProducts] = useState(0);

  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
  const navigate = useNavigate();

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  const fetchProducts = async () => {
    const from = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const to = from + PRODUCTS_PER_PAGE - 1;

    let query = supabase.from("products").select("*", { count: "exact" });

    // aplicar ordenamiento segun el select:
    switch (sortOption) {
      case "recent":
        query = query.order("created_at", { ascending: false });
        break;

      case "az":
        query = query.order("name", { ascending: true });
        break;
      case "za":
        query = query.order("name", { ascending: false });
        break;
      case "priceHigh":
        query = query.order("price", { ascending: false });
        break;
      case "priceLow":
        query = query.order("price", { ascending: true });
        break;
      default:
        break;
    }

    query = query.range(from, to);
    const { data, error, count } = await query;

    if (error) {
      console.error("Error al traer productos, error");
    } else {
      setProducts(data);
      setTotalProducts(count);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, sortOption]);

  return (
    <div className="p-4 max-w-7xl mx-auto mt-18 bg-white">
      {/* --------- Titulos y Select -------------- */}
      <div className="bg-[#F5F6FA] px-4 py-4 rounded-lg mb-4 flex flex-col lg:flex-row lg:justify-between">
        <div>
          {" "}
          <h2 className="text-2xl">Todos los productos</h2>
          <p className="text-gray-600 text-sm mb-4">
            Mostrando {currentPage} - {totalPages} de un total de{" "}
            {totalProducts} resultados
          </p>
        </div>
        <div className="flex items-center gap-2 ">
          <label htmlFor="sort" className="text-sm font-medium text-gray-600">
            Ordenar por:
          </label>
          <select
            id="sort"
            name="sort"
            onChange={handleSortChange}
            className="border border-gray-300 rounded px-3 py-1 text-sm text-gray-700 bg-white"
          >
            <option className="text-sm text-gray-700" value="recent">
              Más recientes primero
            </option>
            <option className="text-sm text-gray-500" value="az">
              Orden A - Z
            </option>
            <option className="text-sm text-gray-500" value="za">
              Orden Z - A
            </option>
            <option className="text-sm text-gray-500" value="priceHigh">
              Precio de mayor a menor
            </option>
            <option className="text-sm text-gray-500" value="priceLow">
              Precio menor a mayor
            </option>
          </select>
        </div>
      </div>
      {/* --------------------- Card -------------- */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 ">
        {products.map((product) => (
          <div
            key={product.id}
            className=" p-2 shadow hover:shadow-lg transition mx-auto max-w-[300px] bg-white border border-gray-200 rounded-lg flex flex-col h-full"
          >
            <div className="aspect-[4/5] w-full mb-2 rounded overflow-hidden">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover rounded"
              />
            </div>
            <h3 className="text-lg font-semibold">{product.name}</h3>
            {/* <p className="text-sm text-gray-600">{product.description}</p> */}
            <p className="mt-2 mb-2 font-bold text-emerald-600">
              S/. {product.price}
            </p>

            <button
              onClick={() => navigate(`/productdetailspage/${product.id}`)}
              className="mt-auto bg-[#E2A555] text-black py-2 px-4 w-full rounded flex items-center justify-center gap-2 hover:bg-emerald-200 transition cursor-pointer"
            >
              Mas detalles
            </button>
          </div>
        ))}
      </div>
      {/* Paginación */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-2 py-2 bg-gray-200 rounded hover:bg-emerald-400 disabled:opacity-50 cursor-pointer"
        >
          Anterior
        </button>
        <span className="px-4 py-2">{currentPage}</span>
        {currentPage < totalPages && (
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage >= totalPages}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductList;
