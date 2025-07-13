import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import CardDetails from "../components/CardDetails";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setproducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.error("Error al obtener el producto:", error);
      } else {
        setproducts(data);
      }
    };
    fetchProducts();
  }, [id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1>Cargando, porfavor espere...</h1>
      </div>
    );
  }

  return (
    <div>
      <Layout>
        <CardDetails product={product} />
      </Layout>
    </div>
  );
};

export default ProductDetailsPage;
