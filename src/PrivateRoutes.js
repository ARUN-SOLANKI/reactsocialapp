import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoutes({ component }) {
  const isLogin = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const Component = component;
  if (isLogin) {
    return <Component />;
  } else {
    return (
      // <Navigate
      //   to="login"
      //   state={{ redirect: `${location.pathname}${location.search}` }}
      // />
      <Component />
    );
  }
}

export default PrivateRoutes;
