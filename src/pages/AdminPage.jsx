import React from "react";
import AddProduct from "../components/admin/AddProduct";
import AddCategories from "../components/admin/AddCategories";

const Admin = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 bg-[#dde2f5] p-4">
      <AddProduct />
      <AddCategories />
    </div>
  );
};

export default Admin;
