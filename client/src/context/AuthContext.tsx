import { createContext, useContext, useEffect, useState } from "react";
import type { User, AuthContextProps, AuthContextType } from "../types";
import { toast } from "react-toastify";
import axios from "axios";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error("The app must be wrapped inside AuthProvider");
  }
  return context;
}

const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {

  const [user, setUser] = useState<User>({
    userId: "",
    username: "",
    email: "",
    dob: "",
    profileImageUrl: "",
    role: ""
  })

  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthchecked, setIsAuthChecked] = useState(false);

  // to authenticate by checking if token is already present
  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        let response = await api.get("/user/check");
        if (response.data.user) {
          setIsAuthenticated(true);
          let { _id, username, email, role, profileImageUrl, dob } = response.data.user;
          setUser({
            userId: _id,
            username,
            email,
            profileImageUrl,
            role,
            dob
          })
        }
        else {
          setIsAuthChecked(false);
        }
      }
      catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsAuthChecked(true);
        setLoading(false);
        setIsAuthChecked(true); // to make the UI stop from navigating until the authentication is checked for already logged in user
      }
    }

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {

    try {
      let response = await api.post("/user/login", {
        email, password
      });


      let { id, username, profileImageUrl, dob, role } = response.data.user;
      setUser({ userId: id, username, email, dob, profileImageUrl, role });
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      navigate("/blogs", { replace: true });

      setTimeout(() => {
        toast.success("Login successful");
      }, 500);
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        let errorMsg = error.response?.data.message;
        toast.error(errorMsg);
      }
    }
  }

  const signup = async (username: string, email: string, password: string) => {

    try {
      let response = await api.post("/user/register", {
        username, email, password
      });

      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      setUser({
        userId: response.data.userId,
        username,
        email
      })
      navigate("/blogs", { replace: true });

      setTimeout(() => {
        toast.success(response.data.message);
      }, 1000)
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        let errorMsg = error.response?.data.message;
        toast.error(errorMsg);
      }
    }
  }

  const logout = async () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login", { replace: true });
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, isAuthenticated, login, signup, logout, isAuthchecked }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;