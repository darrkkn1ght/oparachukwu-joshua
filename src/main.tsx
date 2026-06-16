import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { Tribute } from "./Tribute";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Tribute />
  </StrictMode>,
);
