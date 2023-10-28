import React from "react";

import MainLayout from "../../components/MainLayout";

import Hero from "./container/Hero";

const HomePage = () => {
  return (
    <div>
      <MainLayout>
        <Hero />
      </MainLayout>
    </div>
  );
};

export default HomePage;
