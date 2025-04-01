import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useToast } from "../utils/useToast";
import {
  setUserData,
  deleteToken,
  deleteData,
  setToken,
  getToken,
  getUserData,
} from "../utils/vault";
import dayjs from "dayjs";

const baseURL = import.meta.env.VITE_API_URL;

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toastSuccess, toastError } = useToast();
  const navigate = useNavigate();

  const loginUser = async (username, password) => {
    try {
      const response = await fetch(`${baseURL}/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok) {
        const userData = jwtDecode(data.access);
        await setUserData(userData);
        await setToken(data);
        setUser(userData);
        navigate("/");
        toastSuccess("Login successful.");
      } else {
        toastError(data.detail || "Invalid credentials.");
        throw new Error(data.detail || "Login failed.");
      }
    } catch (error) {}
  };

  const registerUser = async (email, username, password, password2) => {
    try {
      const response = await fetch(`${baseURL}/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password, password2 }),
      });
      const data = await response.json();

      if (response.ok) {
        navigate("/login");
        toastSuccess("Registration successful.");
      } else {
        toastError(data.detail || "Registration failed.");
        throw new Error(data.detail || "Registration error.");
      }
    } catch (error) {}
  };

  const logoutUser = async () => {
    await deleteToken();
    await deleteData();
    setUser(null);
    navigate("/login");
    toastSuccess("Logged out.");
  };

  const checkUser = async () => {
    try {
      const storedUser = await getUserData();
      const tokens = await getToken();

      if (storedUser) {
        setUser(storedUser);
      } else if (tokens?.access) {
        const decoded = jwtDecode(tokens.access);
        const isExpired = dayjs.unix(decoded.exp).diff(dayjs()) < 1;

        if (!isExpired) {
          setUser(decoded);
        } else {
          setUser(null);
          await deleteToken();
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => await checkUser())();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, registerUser, loginUser, logoutUser }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
