import { Navigate, Outlet } from "react-router-dom";

//private route for authenticated users
const PrivateTokenRoute = () => {
  return document.cookie.indexOf("token=") !== -1 ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

//private route for otp route only
const PrivateOtpRoute = () => {
  return localStorage.getItem("email") !== null ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export { PrivateOtpRoute, PrivateTokenRoute };
