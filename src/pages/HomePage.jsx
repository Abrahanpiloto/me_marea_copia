import React from "react";
import Welcome from "../components/Welcome";
import Layout from "../components/Layout";
import Categories from "../components/Categories";
import History from "../components/History";
import Contact from "../components/Contact";

const HomePage = () => {
  return (
    <div className="">
      <Layout>
        <Welcome />
        <Categories />
        <History />
        <Contact />
      </Layout>
    </div>
  );
};

export default HomePage;
