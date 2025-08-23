
import { createContext, useContext, useState, useEffect } from "react";
import axios from "./AxiosContext";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null = not logged in

  // Check user on mount (one time)
  useEffect(() => {
    axios.get("/auth/user")
      .then((res) => {
        console.log(res.data.user.username)
        setUser(res.data.user || null);
      })
      .catch(() => setUser(null));
  }, []);

  const login = async (credentials) => {
    const res = await axios.post("/auth/login", credentials);
    setUser(res.data.user);
    
    return res;
  };

  const register = async (credentials) => {
    const res = await axios.post("/auth/register", credentials);
    setUser(res.data.user);
    return res;
  };

  const logout = async () => {
    await axios.get("/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook for easy access
export function useAuth() {
  return useContext(AuthContext);
}
