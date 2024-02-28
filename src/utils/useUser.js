import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const useUser = () => {
  const token = localStorage.getItem("authTokens");
  const [user, setUser] = useState(token ? jwtDecode(token) : {}); // Decode outside the hook

  useEffect(() => {
    // Handle token updates
    const handleTokenChange = () => {
      setUser(localStorage.getItem("authTokens") ? jwtDecode(localStorage.getItem("authTokens")) : {});
    };

    // Add event listener for token changes
    window.addEventListener("storage", handleTokenChange);

    // Cleanup function
    return () => window.removeEventListener("storage", handleTokenChange);
  }, [token]); // Include token in dependencies

  return user;
};

export default useUser;