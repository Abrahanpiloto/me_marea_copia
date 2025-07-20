import React from "react";
import Welcome from "../components/Welcome";
import Layout from "../components/Layout";
import Categories from "../components/Categories";

const HomePage = () => {
  return (
    <div className="">
      <Layout>
        <Welcome />
        <Categories />
      </Layout>
    </div>
  );
};

export default HomePage;
