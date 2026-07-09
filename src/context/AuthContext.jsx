import { createContext, useContext, useState } from "react";
import { currentUser as dummyUser } from "../data/dummyData.js";

const AuthContext = createContext(null);

/**
 * AuthProvider — DUMMY authentication only.
 * There is no backend here. `login()` simulates a network delay and then
 * stores a fake user + token in memory/localStorage.
 *
 * 🔌 BACKEND HOOK: Replace `login()`/`logout()` internals with real calls to
 * your auth API (e.g. POST /api/auth/login) and store the returned JWT.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("chatwave-auth");
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = async ({ email }) => {
    setIsLoading(true);
    // 🔌 BACKEND HOOK: await fetch('/api/auth/login', { method: 'POST', body: ... })
    await new Promise((resolve) => setTimeout(resolve, 900));
    const loggedInUser = { ...dummyUser, email: email || dummyUser.email };
    localStorage.setItem("chatwave-auth", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    setIsLoading(false);
    return loggedInUser;
  };

  const logout = () => {
    // 🔌 BACKEND HOOK: invalidate session/token server-side if needed
    localStorage.removeItem("chatwave-auth");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
