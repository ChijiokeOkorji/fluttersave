import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = ({ children }) => {
  const storeData = useSelector(state => state.user);
  const location = useLocation();

  return (
    <>
      {storeData.Email ? children : <Navigate to="/login" replace state={{ path: location.pathname }} />}
    </>
  );
};

export { RequireAuth };