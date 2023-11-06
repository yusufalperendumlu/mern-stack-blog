import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import HomePage from "./pages/home/HomePage";
import ArticleDetailPage from "./pages/articleDetail/ArticleDetailPage";

function App() {
  return (
    <div className="App font-opensans select-none">
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/blog/:id" element={<ArticleDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
