import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ROUTER from "../api/server";
import toastOption from "../config/toast";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [Auth, setAuth] = useState(() =>
    localStorage.getItem("tokens")
      ? jwt_decode(JSON.parse(localStorage.getItem("tokens")).access)
      : null
  );
  const [tokens, setTokens] = useState(() =>
    localStorage.getItem("tokens")
      ? JSON.parse(localStorage.getItem("tokens"))
      : null
  );
  const [Error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const loginUser = async (e, username, password) => {
    e.preventDefault();
    try {
      const body = {
        username: username,
        password: password,
      };
      const response = await axios.post(`${ROUTER}/api/token`, body);
      const data = await response.data;

      setAuth(jwt_decode(data.access));
      setTokens(data);
      localStorage.setItem("tokens", JSON.stringify(data));
      navigate("/home");
    } catch (error) {
      console.log(error.message);
      if (error.response.status === 401)
        toast.error("Incorrect email or password!", toastOption);
    }
  };

  const logoutUser = async () => {
    setAuth(null);
    setTokens(null);
    localStorage.removeItem("tokens");
    navigate("/login");
  };

  const updateToken = async (refreshToken) => {
    console.log("Update tokens");
    if (!refreshToken) return logoutUser();
    try {
      const body = {
        refresh: refreshToken,
      };
      const response = await axios.post(`${ROUTER}/api/token/refresh`, body);
      const data = await response.data;

      setAuth(jwt_decode(data.access));
      setTokens(tokens => ({ ...tokens, access: data.access }));
      const newTokens = JSON.parse(localStorage.getItem("tokens"));
      newTokens.access = data.access;
      localStorage.setItem("tokens", JSON.stringify(newTokens));
    } catch (error) {
      console.log(error.message);
      // if (error.response.status === 401) 
      logoutUser();
    }
  };

  useEffect(() => {
    let interval = setInterval(() => {
      if (tokens) {
        updateToken(tokens.refresh);
      }
    }, 1000 * 60 * 4);
    return () => clearInterval(interval);
  }, [tokens, isLoading]);

  const contextData = {
    Auth,
    setAuth,
    loginUser,
    Error,
    tokens,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
