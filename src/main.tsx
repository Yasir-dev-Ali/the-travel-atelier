import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";

import "@/assets/styles.css";
import { router } from "@/routes";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("The app root element was not found.");
}

createRoot(rootElement).render(<RouterProvider router={router} />);
