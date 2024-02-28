import { Route, redirect } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children, path, ...rest }) => {
  let { user } = useContext(AuthContext);
  // Exclude the /login route from protection
  path !== "/login" && (
    <Route {...rest}>{!user ? redirect("/login") : children}</Route>
  );
};

export default PrivateRoute;
