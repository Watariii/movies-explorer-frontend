import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ Component, loggedIn, ...props }) {
  return loggedIn ? (
    <Component {...props} loggedIn={loggedIn} />
  ) : (
    <Navigate to="/" replace/>
  );
}
export default ProtectedRoute;
