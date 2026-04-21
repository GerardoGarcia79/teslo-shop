import { lazy } from "react";
import { createHashRouter, Navigate } from "react-router";

import { ShopLayout } from "./shop/layouts/ShopLayout";
import { HomePage } from "./shop/pages/home/HomePage";
import { ProductPage } from "./shop/pages/product/ProductPage";
import { GenderPage } from "./shop/pages/gender/GenderPage";
import { LoginPage } from "./auth/pages/login/LoginPage";
import { RegisterPage } from "./auth/pages/register/RegisterPage";
import { DashboardPage } from "./admin/pages/dashboard/DashboardPage";
import { AdminProductPage } from "./admin/pages/product/AdminProductPage";
import { AdminProductsPage } from "./admin/pages/products/AdminProductsPage";
import {
  AdminRoute,
  NotAuthenticatedRoute,
} from "./components/routes/ProtectedRoutes";

const LazyAdminLayout = lazy(() => import("./admin/layouts/AdminLayout"));
const LazyAuthLayout = lazy(() => import("./auth/layouts/AuthLayout"));

// export const appRouter = createBrowserRouter([
export const appRouter = createHashRouter([
  // Main Routes
  {
    path: "/",
    element: <ShopLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { path: "product/:idSlug", element: <ProductPage /> },
      { path: "gender/:gender", element: <GenderPage /> },
    ],
  },
  // Auth Routes
  {
    path: "/auth",
    element: (
      <NotAuthenticatedRoute>
        <LazyAuthLayout />
      </NotAuthenticatedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/auth/login" /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
  // Admin Routes
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <LazyAdminLayout />
      </AdminRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "products", element: <AdminProductsPage /> },
      { path: "products/:id", element: <AdminProductPage /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
