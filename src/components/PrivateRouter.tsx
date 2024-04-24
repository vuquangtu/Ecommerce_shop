import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";
import CartPage from "../pages/shop/CartPage";
import { useLocation } from "react-router-dom";

function PrivateRouter() {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  console.log(currentUser);

  return (
    <>
      {!currentUser ? (
        <Navigate to={"/login"} state={{ from: location }} replace>
          <CartPage />
        </Navigate>
      ) : (
        <CartPage />
      )}
    </>
  );
}

export default PrivateRouter;
