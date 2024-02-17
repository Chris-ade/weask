import { Route, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children, path, ...rest }) => {
  let { user } = useContext(AuthContext);
  const navigate = useNavigate();
  // Exclude the /login route from protection
  path !== "/login" && (
    <Route {...rest}>{!user ? navigate("/login") : children}</Route>
  );
};

export default PrivateRoute;
