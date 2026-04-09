import { createBrowserRouter } from "react-router";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Home } from "./components/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
]);
