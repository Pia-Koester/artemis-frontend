import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { badCredentials } from "../utils/badCredentials";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get("/users/profile")
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
        setUser(null);
        // navigate("/");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const login = async (data) => {
    axiosClient
      .post("/login", data)
      .then((response) => {
        console.log(response);
        setUser(response.data);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        badCredentials();
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logout = async () => {
    axiosClient
      .get("/logout")
      .then((response) => {
        setUser(null);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          setUser,
          isLoading,
          login,
          logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}
