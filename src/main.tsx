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
import "./index.css"
import ErrorPage from "./pages/error-page"
import LoginPage from "./pages/login/page"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { customTheme } from "./utils/theme"
import { ToastContainer } from "react-toastify"
import AllTourRoutesPage from "./pages/tour-routes/all/page"
import OneTourRoutePage from "./pages/tour-routes/one/page"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <Navigate to="/routes/all" /> },
      {
        path: "auth",
        element: <Outlet />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
        ],
      },
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
])
const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={customTheme}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <ToastContainer hideProgressBar />
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
