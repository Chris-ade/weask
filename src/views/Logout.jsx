import React, { useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Logout() {
  const { logoutUser } = useContext(AuthContext);
  logoutUser();
}

export default Logout;
