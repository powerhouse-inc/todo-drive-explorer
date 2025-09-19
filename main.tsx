import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppLoader } from "@powerhousedao/connect";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppLoader />
  </StrictMode>,
);
