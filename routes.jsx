import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

// import Prices from "@/pages/Prices";
// import Weather from "@/pages/Weather";
// import AppLayout from "@/layouts/AppLayout";
// import NotFound from "@/components/NotFound";
// import AuthLayout from "@/layouts/AuthLayout";
// import SignIn from "@/pages/(auth)/SignIn";
// import SignUp from "@/pages/(auth)/SignUp";

const Prices = lazy(() => import("@/pages/Prices"));
const Weather = lazy(() => import("@/pages/Weather"));
const AppLayout = lazy(() => import("@/layouts/AppLayout"));
const NotFound = lazy(() => import("@/components/NotFound"));
const AuthLayout = lazy(() => import("@/layouts/AuthLayout"));
const SignIn = lazy(() => import("@/pages/(auth)/SignIn"));
const SignUp = lazy(() => import("@/pages/(auth)/SignUp"));

import LoadingFallback from "@/components/LoadingFallback";
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AppLayout />
      </Suspense>
    ),
    children: [
      { index: true, element: <Navigate to="/weather" replace /> },
      {
        path: "weather",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Weather />
          </Suspense>
        ),
      },
      {
        path: "prices",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Prices />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AuthLayout />
      </Suspense>
    ),
    children: [
      {
        path: "signin",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SignIn />
          </Suspense>
        ),
      },
      {
        path: "signup",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SignUp />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <NotFound />
      </Suspense>
    ),
  },
]);
