import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./fonts.css";
import "./global.css";
import ProductDetail from "./product-detail";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProductDetail />
  </StrictMode>
);
