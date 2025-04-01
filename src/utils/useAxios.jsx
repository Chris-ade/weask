import axios from "axios";
import dayjs from "dayjs";
import { useContext, useEffect, useMemo } from "react";
import AuthContext from "../context/AuthContext";
import { getToken, updateToken, updateUserData } from "./vault";
import { jwtDecode } from "jwt-decode";

const baseURL = import.meta.env.VITE_API_URL;

const useAxios = () => {
  const { setUser } = useContext(AuthContext);

  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL,
    });

    instance.interceptors.request.use(async (req) => {
      const authTokens = await getToken();
      if (!authTokens) {
        window.location.href = "/login";
        return Promise.reject(new Error("No token available"));
      }

      const user = jwtDecode(authTokens.access);
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

      if (!isExpired) {
        req.headers.Authorization = `Bearer ${authTokens.access}`;
        return req;
      }

      try {
        const response = await axios.post(`${baseURL}/token/refresh/`, {
          refresh: authTokens.refresh,
        });

        if (response.data.code === "token_not_valid") {
          window.location.href = "/login";
          return Promise.reject(new Error("Token not valid"));
        }

        await updateToken(response.data);
        const newUserData = jwtDecode(response.data.access);
        await updateUserData(newUserData);
        setUser(newUserData);

        req.headers.Authorization = `Bearer ${response.data.access}`;
        return req;
      } catch (error) {
        window.location.href = "/login";
        return Promise.reject(error);
      }
    });

    return instance;
  }, [setUser]);

  return axiosInstance;
};

export default useAxios;
