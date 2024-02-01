
import { createBrowserRouter, } from "react-router-dom";

import Login from "@/pages/Login";
import Register from "@/pages/register";
import Home from "@/pages/Home";


export const router = createBrowserRouter([

  {
    path: "/",

    element: <Home />,
    // errorElement: <Page404 />,
   
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }
 
]);
