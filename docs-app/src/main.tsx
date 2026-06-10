import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DocumentationApp } from "./DocumentationApp";
import "../../src/styles/index.css";
import "./styles.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found.");
}

createRoot(root).render(
  <StrictMode>
    <DocumentationApp />
  </StrictMode>,
);
