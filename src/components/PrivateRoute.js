import { Navigate, Route } from "react-router-dom";

const PrivateRoute = ({ redirectPath, condition, ...props }) => {
  if (!condition) {
    return <Navigate to={redirectPath} />;
  }
  return <Route {...props} />;
};

export default PrivateRoute;
