import { createBrowserRouter, Navigate } from "react-router-dom";
import Prices from "@/pages/Prices";
import Weather from "@/pages/Weather";
import AppLayout from "@/layouts/AppLayout";
import NotFound from "@/components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/weather" replace /> },
      { path: "weather", element: <Weather /> },
      { path: "prices", element: <Prices /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
