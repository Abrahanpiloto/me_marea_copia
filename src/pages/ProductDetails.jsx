import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import CardDetails from "../components/CardDetails";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";

const ProductDetails = () => {
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
      <div>
        <h3>Cargando, porfavor espere...</h3>
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

export default ProductDetails;
