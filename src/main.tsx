import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom"
import "react-toastify/ReactToastify.css"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import { store } from "./app/store"
import "typeface-nunito"
import "./index.css"
import ErrorPage from "./pages/error-page"
import LoginPage from "./pages/login/page"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { customTheme } from "./utils/theme"
import { ToastContainer } from "react-toastify"
import AllTourRoutesPage from "./pages/tour-routes/all/page"
import OneTourRoutePage from "./pages/tour-routes/one/page"
import MainLayout from "./components/layout/main/main-layout"
import AuthLayout from "./components/layout/auth/auth-layout"
import RegisterPage from "./pages/register/page"
import ProfilePage from "./pages/profile/page"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "auth",
        element: (
          <AuthLayout>
            <Outlet />
          </AuthLayout>
        ),
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
        ],
      },
      {
        path: "",
        element: (
          <MainLayout>
            <Outlet />{" "}
          </MainLayout>
        ),
        children: [
          { path: "", element: <Navigate to="/routes/all" /> },
          { path: "profile", element: <ProfilePage /> },
          {
            path: "routes",
            element: <Outlet />,
            children: [
              {
                path: "all",
                element: <AllTourRoutesPage />,
              },
              {
                path: "find/:id",
                element: <OneTourRoutePage />,
              },
            ],
          },
        ],
      },
    ],
  },
])
const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={customTheme}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <ToastContainer hideProgressBar autoClose={3000} closeOnClick />
            <CssBaseline />
            <RouterProvider router={router} />
          </LocalizationProvider>
        </ThemeProvider>
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
