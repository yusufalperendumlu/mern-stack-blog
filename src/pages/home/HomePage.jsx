import React from "react";

import MainLayout from "../../components/MainLayout";

import Hero from "./container/Hero";
import Articles from "./container/Articles";

const HomePage = () => {
  return (
    <div>
      <MainLayout>
        <Hero />
        <Articles />
      </MainLayout>
    </div>
  );
};

export default HomePage;
