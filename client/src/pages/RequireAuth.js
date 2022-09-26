import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const [authed] = useState(true);
  const location = useLocation();

  return (
    <>
      {authed ? children : <Navigate to="/login" replace state={{ path: location.pathname }} />}
    </>
  );
};

export { RequireAuth };