import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { ProductDetailPage } from "../pages/ProductDetailPage";
import { SuggestProductPage } from "../pages/SuggestProductPage";
import { NotFoundPage } from "../pages/NotFoundPage";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/suggestproduct" element={<SuggestProductPage />} />
        <Route path="/notfound" element={<NotFoundPage /> } />
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
};
