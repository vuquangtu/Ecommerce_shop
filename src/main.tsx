import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App.tsx";
import "./index.css";
import "swiper/css";

// bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

// fonts and icons
import "././assets/css/icofont.min.css";
import "././assets/css/animate.css";
import "././assets/css/style.min.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home.tsx";
import Blog from "./pages/blog/Blog.tsx";
import { store } from "./store/Store.tsx";
import Shop from "./pages/shop/Shop.tsx";
import SingleProducts from "./pages/shop/SingleProducts.tsx";
import CartPage from "./pages/shop/CartPage.tsx";
import SingleBlog from "./pages/blog/SingleBlog.tsx";
import About from "./pages/about/About.tsx";

import Contact from "./pages/contactPage/Contact.tsx";
import Login from "./components/Login.tsx";
import SignUp from "./components/SignUp.tsx";
import AuthProvider from "./context/AuthProvider.tsx";
import { Provider } from "react-redux";
import PrivateRouter from "./components/PrivateRouter.tsx";
import { Navigate } from "react-router-dom";
import ResetPass from "./components/ResetPass.tsx";
import Profile from "./components/Profile.tsx";

import InputProducts from "./components/InputProducts.tsx";
import Dashboard from "./admin/MainLayout.tsx";
import MainLayout from "./admin/MainLayout.tsx";
import Addproduct from "./admin/AddProduct.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog/update/:id",
        element: <Blog />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/shop/:id",
        element: <SingleProducts />,
      },
      {
        path: "/cart-page",
        element: <PrivateRouter />,
      },
      {
        path: "/blog/:id",
        element: <SingleBlog />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/reset-pass",
    element: <ResetPass />,
  },
  {
    path: "/user-profile/:uid",
    element: <Profile />,
  },
  // {
  //   path: "/add-product",
  //   element: <AddProduct />,
  // },
  {
    path: "/input-product",
    element: <InputProducts />,
  },
  {
    path: "/admin",
    element: <MainLayout />,
    // children: [{ path: "/addproduct", element: <Addproduct /> }],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </Provider>
  // </React.StrictMode>
);
