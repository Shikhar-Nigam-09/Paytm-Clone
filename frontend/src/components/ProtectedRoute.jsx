import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext);

  /*
    If user is NOT authenticated
    redirect to signin
  */
  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  /*
    If authenticated
    render the requested page
  */
  return children;
}

export default ProtectedRoute;
