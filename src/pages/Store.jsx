import React from "react";
import Layout from "../components/Layout";
import ProductList from "../components/ProductList";

const Store = () => {
  return (
    <div className="bg-white">
      <Layout>
        <ProductList />
      </Layout>
    </div>
  );
};

export default Store;
