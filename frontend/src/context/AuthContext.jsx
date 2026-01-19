import { createContext, useState } from "react";

/*
  Create AuthContext
*/
export const AuthContext = createContext();

/*
  AuthProvider wraps the entire app
*/
export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  /*
    Called after successful signin/signup
  */
  const login = (jwt) => {
    localStorage.setItem("token", jwt);
    setToken(jwt);
  };

  /*
    Called on logout
  */
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
