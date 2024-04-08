import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

export const AuthContext = createContext();
// The AuthProvider component is a wrapper component that provides the login and logout functionality to the entire application. It uses the createContext and useState hooks to create a context and a state variable to manage the user's authentication status. The useNavigate hook from react-router-dom is used to navigate to different routes in the application.
export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);

  console.log("test test test");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axiosClient
        .get("/users/profile")
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.log(error);
          setUser(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (data) => {
    try {
      const response = await axiosClient.post("/login", data);
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(user);
      navigate("/");
    } catch (error) {
      console.log(error);
      setUser(null);
      // Handle error
    } finally {
      setIsLoading(false);
    }
    return (
      <AuthContext.Provider
        value={{
          setUser,
          login,
          user,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
}
