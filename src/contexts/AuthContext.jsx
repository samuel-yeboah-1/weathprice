import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("auth");
    if (storedUser) {
      setAuth(JSON.parse(storedUser));
    }
  }, []);

  const login = (user) => {
    localStorage.setItem("auth", JSON.stringify(user));
    setAuth(user);
  };
  const logout = () => {
    localStorage.removeItem("auth");
    setAuth(null);
  };
  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


const useAuthContext = () => useContext(AuthContext);

export { AuthProvider, useAuthContext };